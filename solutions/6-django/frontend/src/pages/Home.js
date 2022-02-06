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
      listName: event.target.value,
      listDescription: this.state.listDescription,
      currentLink: this.state.currentLink,
      links: this.state.links});
  }

  handleDescriptionChange = event => {
    this.setState({
      listName: this.state.listName,
      listDescription: event.target.value,
      currentLink: this.state.currentLink,
      links: this.state.links});
  }

  handleCurrentLinkChange = event => {
      this.setState({
        listName: this.state.listName,
        listDescription: this.state.listDescription,
        currentLink: event.target.value,
        links: this.state.links});
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
            <form onSubmit={this.handleAdd}>
                <div>
                    {this.state.links.map((link, i) => <a href={link} key={i}>{link}</a>)}
                </div>
                <input type="text" value={this.state.currentLink} onChange={this.handleCurrentLinkChange} />
                <button type="submit"> Add </button>
            </form>
        </div>
    );
  }
}

export default Home;
