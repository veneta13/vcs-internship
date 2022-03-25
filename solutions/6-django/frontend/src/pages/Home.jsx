import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';


const BACKEND_URL = 'http://localhost:8000/api/lists/'

const Home = () => {
    let params = useLocation();
    let navigate = useNavigate();

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
            ...state,
            listName: event.target.value,
        });
    }

    const handleDescriptionChange = event => {
        setState({
            ...state,
            listDescription: event.target.value,
        });
    }

    const handleCurrentLinkChange = event => {
        setState({
            ...state,
            currentLink: event.target.value,
        });
    }

    const handleAdd = event => {
        event.preventDefault();

        const linkToAdd = {
            description: '',
            image: '',
            link: state.currentLink,
            title: '',
            url: ''
        }

        setState({
            ...state,
            currentLink: '',
            links: state.links.concat([linkToAdd]),
        });
    }

    const handleCheckboxChange = event => {
        event.preventDefault();

        setState({
            ...state,
            isPublic: !state.isPublic,
        });
    }

    const handleDelete = event => {
        axios({
            method: 'delete',
            url: state.listURL,
            headers: { 
                'Authorization': 'Token ' + localStorage.getItem('token')
            }})
            .then(res => {
                navigate('/profile');
            }); 
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
                        ...state,
                        listURL: res.data.url,
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
                        ...state,
                        listName: res.data.name,
                        links: res.data.links,
                    })
                });
        }
    }

    const removeLink = (event, link) => {
        axios({
            method: 'delete',
            url: state.listURL + link.id + '/',
            headers: { 
                'Authorization': 'Token ' + localStorage.getItem('token')
            }})
            .then(res => {
                window.location.reload(false);
            }); 
    }

    return (
        <div className='home'>
            <div className='list-info'>
                <input type='text' value={state.listName} onChange={handleNameChange} />
                <br/>
                <input type='text' value={state.listDescription} onChange={handleDescriptionChange} />
            </div>

            <input type='text' value={state.currentLink} onChange={handleCurrentLinkChange} />
            <br/>

            <div className='public-cb'>
            <input id='publicCheckbox' type='checkbox' defaultChecked={state.isPublic} onChange={handleCheckboxChange} />
            <label htmlFor='publicCheckbox'>Public</label>
            </div>

            <br/>

            <div>
                {
                    state.links.map(link => {
                        return (
                            <div className='link-preview-box'>
                                <img src={link.image}/>
                                <br/>

                                <h2> {link.title} </h2> 

                                <a href={link.link}> 
                                    {link.link}
                                </a>

                                <p> {link.description} </p>
                                
                                <button type='submit' onClick={(event) => removeLink(event, link)}> Remove link </button>
                            </div>
                        )}
                    )
                }
            </div>

            <div>
                <button type='submit' onClick={handleAdd}> Add Link To List </button>
                <button type='submit' onClick={() => {navigator.clipboard.writeText(state.listURL)}}> Share List </button>
                <button type='submit' onClick={handleDelete}> Delete List </button>
                <button type='submit' onClick={handleSave}> Save List </button>
            </div>
        </div>
    );
}

export default Home;
