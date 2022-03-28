import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const BACKEND_URL = 'http://localhost:8000/api/lists/'

const MyLists = () =>{
    let navigate = useNavigate();

    let [state, setState] = useState({
        links: [],
    });

    useEffect(() => {
        axios({
            method: 'get',
            url: BACKEND_URL,
            headers: { 
                'Authorization': 'Token ' + localStorage.getItem('token')
            }})
            .then(res => {
                setState({
                    links: res.data.results
                })
            });
    }, [])

    const clickOnLink = link => {
        navigate('/', {state:{listURL: link}});
    }

    return (
        <div className='my-lists'>
            <h1> My Lists </h1>
            <div className='lists'>
                {
                    state.links.map(link => {
                        return (
                            <div className='list'> 
                                <h2 onClick={() => clickOnLink(link.url)}> {link.name} </h2> 
                                <p> {link.description} </p> 
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default MyLists;
