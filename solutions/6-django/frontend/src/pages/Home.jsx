import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: 'Link List',
            listDescription: 'Add description here',
            isPublic: true,
            listURL: '',
            currentLink: 'https://www.example.com',
            links: []
        };
    }
  
    handleNameChange = event => {
        this.setState({
            listName: event.target.value
        });
    }

    handleDescriptionChange = event => {
        this.setState({
            listDescription: event.target.value
        });
    }

    handleCurrentLinkChange = event => {
        this.setState({
            currentLink: event.target.value
        });
    }

    handleAdd = event => {
        event.preventDefault();

        const linkToAdd = this.state.currentLink;

        this.setState({
            currentLink: '',
            links: this.state.links.concat([linkToAdd])
        });
    }

    handleShare = event => {
        event.preventDefault();

        alert('Link to this list copied to clipboard');
        navigator.clipboard.writeText(this.state.listURL);
    }

    handleCheckboxChange = event => {
        event.preventDefault();

        this.setState({
            isPublic: !this.state.isPublic
        });
    }

    handleDelete = event => {
        event.preventDefault();

        return axios({
            method: 'delete',
            url: 'http://localhost:8000/api/lists/',
            headers: { 
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
            data: {
                links: this.state.links,
                name: this.state.listName
            }})
            .then(res => {
                console.log(res);
            });
    }

    handleSave = event => {
        event.preventDefault();

        return axios({
            method: 'post',
            url: 'http://localhost:8000/api/lists/',
            headers: { 
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
            data: {
                links: [],
                name: this.state.listName,
                description: this.state.listDescription,
                public: this.state.isPublic
            }})
            .then(res => {
                this.setState({
                    listURL: res.data.url
                })

                this.state.links.forEach(currentLink => {
                    axios({
                        method: 'patch',
                        url: res.data.url ,
                        headers: { 
                            'Authorization': 'Token ' + localStorage.getItem('token')
                        },
                        data: {
                            link: currentLink,
                        }
                    })
                });
            });
    }

    render() {
        return (
            <div>
                <nav>
                    <Link to="login">Log In</Link>
                    <Link to="registration">Register</Link>
                </nav>
                <div>
                    <input type="text" value={this.state.listName} onChange={this.handleNameChange} />
                    <input type="text" value={this.state.listDescription} onChange={this.handleDescriptionChange} />
                </div>
                <form>
                    <div>
                        {this.state.links.map((link, i) => <a href={link} key={i}>{link}</a>)}
                    </div>
                    <input type="text" value={this.state.currentLink} onChange={this.handleCurrentLinkChange} />
                    <label htmlFor="publicCheckbox">Public</label>
                    <input id="publicCheckbox" type="checkbox" defaultChecked={this.state.isPublic} onChange={this.handleCheckboxChange} />
                    <br/>
                    <button type="submit" onClick={this.handleAdd}> Add </button>
                    <button type="submit" onClick={this.handleShare}> Share </button>
                    <button type="submit" onClick={this.handleDelete}> Delete </button>
                    <button type="submit" onClick={this.handleSave}> Save </button>
                </form>
            </div>
        );
    }
}

export default Home;
