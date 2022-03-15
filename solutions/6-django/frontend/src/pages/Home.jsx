import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import axios from 'axios';


const Home = () => {
    let params = useLocation();

    let [state, setState] = useState({
        listName: 'Link List',
        listDescription: 'Add description here',
        isPublic: true,
        listURL: 'http://localhost:8000/api/lists/1/',
        currentLink: 'https://www.example.com',
        links: [],
        isLoading: true // TODO too many re-renders
    });

    if (params.state !== null) {
        setState({
            listName: state.listName,
            listDescription: state.listDescription,
            isPublic: state.isPublic,
            listURL: params.state.linkURL,
            currentLink: state.currentLink,
            links: [],
            isLoading: true
        });
    }

    useEffect(() => {
        if (state.listURL !== '' && state.isLoading) {
            axios({
                method: 'get',
                url: state.listURL,
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem('token')
                }})
                .then(res => {
                    setState({
                        listName: res.data.name,
                        listDescription: res.data.description,
                        isPublic: res.data.public,
                        listURL: state.listURL,
                        currentLink: state.currentLink,
                        links: res.data.links,
                        isLoading: false
                    });
                    console.log(res.data.links)
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
            link: state.linkToAdd,
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

    const handleShare = event => {
        event.preventDefault();
        alert('Link to this list copied to clipboard');
        navigator.clipboard.writeText(state.listURL);
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
            .then(res => {
                console.log(res);
            });
    }

    const handleSave = event => {
        event.preventDefault();

        axios({
            method: 'post',
            url: state.listURL,
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

    const removeLink = event => {
        axios({
            method: 'delete',
            url: state.listURL, //TODO how to address /api/lists/<pk_list>/<pk>/
            headers: { 
                'Authorization': 'Token ' + localStorage.getItem('token')
            }})
            .then(res => {
                console.log(res);
            });
    }

    return (
        <div className="home">
            <div className="list-info">
                <input type="text" value={state.listName} onChange={handleNameChange} />
                <br/>
                <input type="text" value={state.listDescription} onChange={handleDescriptionChange} />
            </div>

            <form>
                <input type="text" value={state.currentLink} onChange={handleCurrentLinkChange} />
                <br/>

                <input id="publicCheckbox" type="checkbox" defaultChecked={state.isPublic} onChange={handleCheckboxChange} />
                <label htmlFor="publicCheckbox">Is Public?</label>
                <br/>

                <div>
                    {
                        state.links.map(link => {
                            return (
                                <div className="link-preview-box">
                                    <img src={link.image}/>
                                    <a href={link.link}> {link.title} </a>
                                    <p> {link.description} </p>
                                    <button type="submit" onClick={() => removeLink}> Remove link </button>
                                </div>
                            )}
                        )
                    }
                </div>

                <button type="submit" onClick={() => handleAdd}> Add Link To List </button>
                <button type="submit" onClick={() => handleShare}> Share List Link </button>
                <button type="submit" onClick={() => handleDelete}> Delete List </button>
                <button type="submit" onClick={() => handleSave}> Save List </button>
            </form>
        </div>
    );
}

export default Home;
