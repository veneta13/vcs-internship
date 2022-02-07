import React from 'react';
import {Link} from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          listName: 'Link List',
          listDescription: 'Add description here',
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
          listName: this.state.listName,
          listDescription: this.state.listDescription,
          currentLink: '',
          links: this.state.links.concat([linkToAdd])
        });

        console.log(this.state);
    }

    handleShare = event => {
        event.preventDefault();

        console.log('Share');
    }

    handleDelete = event => {
        event.preventDefault();

        console.log('Delete');
    }

    handleSave = event => {
        event.preventDefault();

        console.log('Save');
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
