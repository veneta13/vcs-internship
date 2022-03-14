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
        links: []
    });

    if (params.state !== null) {
        setState({
            listName: state.listName,
            listDescription: state.listDescription,
            isPublic: state.isPublic,
            listURL: params.state.linkURL,
            currentLink: state.currentLink,
            links: [],
            fullLinks: [],
        });
    }

    useEffect(() => {
        if (state.listURL !== '') {
            return axios({
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
                        links: state.links,
                        fullLinks: res.data.links,
                    });
                    res.data.links.forEach(e => state.links.push(e.link));
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
            fullLinks: state.fullLinks,
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
            fullLinks: state.fullLinks,
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
            fullLinks: state.fullLinks,
        });
    }

    const handleAdd = event => {
        event.preventDefault();

        const linkToAdd = state.currentLink;

        setState({
            listName: state.listName,
            listDescription: state.listDescription,
            isPublic: state.isPublic,
            listURL: state.listURL,
            currentLink: '',
            links: state.links.concat([linkToAdd]),
            fullLinks: state.fullLinks,
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
            fullLinks: state.fullLinks,
        });
    }

    const handleDelete = event => {
        event.preventDefault();

        return axios({
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

        return axios({
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
                    fullLinks: res.data.links,
                })

                state.links.forEach(currentLink => {
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

    return (
        <div class="home">
            <div class="list-info">
                <input type="text" value={state.listName} onChange={handleNameChange} />
                <br/>
                <input type="text" value={state.listDescription} onChange={handleDescriptionChange} />
            </div>
            <form>
                <input type="text" value={state.currentLink} onChange={handleCurrentLinkChange} />
                <br/>

                <label htmlFor="publicCheckbox">Is Public?</label>
                <input id="publicCheckbox" type="checkbox" defaultChecked={state.isPublic} onChange={handleCheckboxChange} />
                <br/>

                <div>
                    {console.log(state.fullLinks)}
                    {
                        state.fullLinks.forEach(link => {
                            return (
                                <div class="link-preview-box">
                                    <img src={link.image}/>
                                    <a href={link.link}> {link.title} </a>
                                    <p> {link.description} </p>
                                    <button type="submit"> Remove link </button>
                                </div>
                            )}
                        )
                    }
                </div>

                <button type="submit" onClick={() => handleAdd}> Add </button>
                <button type="submit" onClick={() => handleShare}> Share </button>
                <button type="submit" onClick={() => handleDelete}> Delete </button>
                <button type="submit" onClick={() => handleSave}> Save </button>
            </form>
        </div>
    );
}

export default Home;
