import React from 'react'
import "./Auth.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const getUser = async () => {
        await axios.get(`http://localhost:8000/api/v1/home`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {

            setUser(response.data.user)
        }).catch(error => {
            navigate("/login")
            console.log(error.response.data)
        })
    }

    useEffect(() => {
        getUser()

    }, [])
    return (
        <div className='home-Container'>
            <p>WELCOME, <span>{user ? user.name.split(" ")[0] : ""}</span> </p>
        </div>
    )
}

export default Home