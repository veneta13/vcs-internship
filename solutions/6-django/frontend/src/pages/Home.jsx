import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import axios from 'axios';


const BACKEND_URL = 'http://localhost:8000/api/lists/'

const Home = () => {
    let params = useLocation();

    let [state, setState] = useState({
        listName: 'Link List',
        listDescription: 'Add description here',
        isPublic: true,
        listURL: '',
        currentLink: 'https://www.example.com',
        links: [],
    });

    useEffect(() => {
        if (params.state !== null) {
            axios({
                method: 'get',
                url: params.state.listURL,
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem('token')
                }})
                .then(res => {
                    setState({
                        listName: res.data.name,
                        listDescription: res.data.description,
                        isPublic: res.data.public,
                        listURL: params.state.listURL,
                        currentLink: 'https://www.example.com',
                        links: res.data.links,
                    });
                });
        }
    }, [])

    const handleNameChange = event => {
        setState({
            listName: event.target.value,
            listDescription: state.listDescription,
            isPublic: state.isPublic,
            listURL: state.listURL,
            currentLink: state.currentLink,
            links: state.links,
        });
    }

    const handleDescriptionChange = event => {
        setState({
            listName: state.listName,
            listDescription: event.target.value,
            isPublic: state.isPublic,
            listURL: state.listURL,
            currentLink: state.currentLink,
            links: state.links,
        });
    }

    const handleCurrentLinkChange = event => {
        setState({
            listName: state.listName,
            listDescription: state.listDescription,
            isPublic: state.isPublic,
            listURL: state.listURL,
            currentLink: event.target.value,
            links: state.links,
        });
    }

    const handleAdd = event => {
        event.preventDefault();

        const linkToAdd = {
            description: "",
            image: "",
            link: state.currentLink,
            title: "",
            url: ""
        }

        setState({
            listName: state.listName,
            listDescription: state.listDescription,
            isPublic: state.isPublic,
            listURL: state.listURL,
            currentLink: '',
            links: state.links.concat([linkToAdd]),
        });
    }

    const handleCheckboxChange = event => {
        event.preventDefault();

        setState({
            listName: state.listName,
            listDescription: state.listDescription,
            isPublic: !state.isPublic,
            listURL: state.listURL,
            currentLink: state.currentLink,
            links: state.links,
        });
    }

    const handleDelete = event => {
        event.preventDefault();

        axios({
            method: 'delete',
            url: state.listURL,
            headers: { 
                'Authorization': 'Token ' + localStorage.getItem('token')
            }})
    }

    const handleSave = event => {        
        if (state.listURL === '') {
            axios({
                method: 'post',
                url: BACKEND_URL, 
                headers: { 
                    'Authorization': 'Token ' + localStorage.getItem('token')
                },
                data: {
                    links: [],
                    name: state.listName,
                    description: state.listDescription,
                    public: state.isPublic
                }})
                .then(res => {
                    setState({
                        listName: state.listName,
                        listDescription: state.listDescription,
                        isPublic: state.isPublic,
                        listURL: res.data.url,
                        currentLink: state.currentLink,
                        links: state.links,
                    })
    
                    state.links.forEach(currentLink => {
                        axios({
                            method: 'patch',
                            url: res.data.url ,
                            headers: { 
                                'Authorization': 'Token ' + localStorage.getItem('token')
                            },
                            data: {
                                link: currentLink.link,
                            }
                        })
                    });
                });
        }
        else {
            axios({
                method: 'put',
                url: state.listURL, 
                headers: { 
                    'Authorization': 'Token ' + localStorage.getItem('token')
                },
                data: {
                    links: state.links.map(l => l.link),
                    name: state.listName,
                    description: state.listDescription,
                    public: state.isPublic
                }})
                .then(res => {
                    setState({
                        listName: res.data.name,
                        listDescription: state.listDescription,
                        isPublic: state.isPublic,
                        listURL: state.listURL,
                        currentLink: state.currentLink,
                        links: res.data.links,
                    })
                });
        }
    }

    const removeLink = (event, link) => {
        event.preventDefault();

        axios({
            method: 'delete',
            url: state.listURL + link.id + "/",
            headers: { 
                'Authorization': 'Token ' + localStorage.getItem('token')
            }})
    }

    return (
        <div className="home">
            <div className="list-info">
                <input type="text" value={state.listName} onChange={handleNameChange} />
                <br/>
                <input type="text" value={state.listDescription} onChange={handleDescriptionChange} />
            </div>

            <input type="text" value={state.currentLink} onChange={handleCurrentLinkChange} />
            <br/>

            <div className="public-cb">
            <input id="publicCheckbox" type="checkbox" defaultChecked={state.isPublic} onChange={handleCheckboxChange} />
            <label htmlFor="publicCheckbox">Public</label>
            </div>

            <br/>

            <div>
                {
                    state.links.map(link => {
                        return (
                            <div className="link-preview-box">
                                <img src={link.image}/>
                                <br/>

                                <h2> {link.title} </h2> 

                                <a href={link.link}> 
                                    {link.link}
                                </a>

                                <p> {link.description} </p>
                                
                                <button type="submit" onClick={(event) => removeLink(event, link)}> Remove link </button>
                            </div>
                        )}
                    )
                }
            </div>

            <div>
                <button type="submit" onClick={handleAdd}> Add Link To List </button>
                <button type="submit" onClick={() => {navigator.clipboard.writeText(state.listURL)}}> Share List </button>
                <button type="submit" onClick={handleDelete}> Delete List </button>
                <button type="submit" onClick={handleSave}> Save List </button>
            </div>
        </div>
    );
}

export default Home;
