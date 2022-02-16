import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listName: 'Link List',
            listDescription: 'Add description here',
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

        console.log(this.state);
    }

    handleShare = event => {
        event.preventDefault();
        alert('Link to this list copied to clipboard');
        navigator.clipboard.writeText(this.state.listURL);
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
                links: this.state.links,
                name: this.state.listName
            }})
            .then(res => {
                console.log(res);
            });
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" value={this.state.listName} onChange={this.handleNameChange} />
                    <input type="text" value={this.state.listDescription} onChange={this.handleDescriptionChange} />
                </div>
                <nav>
                    <Link to="login">LogIn</Link>
                </nav>
                <form>
                    <div>
                        {this.state.links.map((link, i) => <a href={link} key={i}>{link}</a>)}
                    </div>
                    <input type="text" value={this.state.currentLink} onChange={this.handleCurrentLinkChange} />
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
