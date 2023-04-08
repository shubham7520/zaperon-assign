import * as React from 'react';
import "./Auth.css"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Card from '@mui/material/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import api from '../api/Index';



export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleClick = async (e) => {
        e.preventDefault()

        await axios.post(`http://localhost:8000/api/v1/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {

            navigate("/")
        }).catch(error => console.log(error.response.data))
    }
    return (
        <Box
            component="form" className='signup-Container'
            sx={{ '& .MuiTextField-root': { m: 1, width: '45ch', marginTop: 2, }, }} autoComplete="off" >
            <Card style={{ padding: 16, textAlign: 'center', boxShadow: 'none' }} >

                <PersonOutlinedIcon style={{ fontSize: '100px', backgroundColor: "RGB(239, 239, 239)", borderRadius: "50% ", color: "RGB(0, 63, 185)", padding: "20px" }} />
                <div style={{ lineHeight: .4, color: "RGB(11, 53, 88)" }}>
                    <h1 style={{ margin: "30px" }}>Welcome!</h1>
                    <p>Let's connect to your workspace.</p>
                    <p>Please enter your email to continue.</p>
                </div>
                <div>
                    <TextField required id="outlined-required" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <TextField id="outlined-password-input" label="Password" type="password" inputProps={{ minLength: 6 }} required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div style={{ lineHeight: 0 }}>
                    <p style={{ textAlign: 'right', paddingRight: "10px", fontWeight: 650, color: "RGB(0, 63, 185)", cursor: 'pointer' }}>Forgot Password?</p>
                </div>
                <div className='sign-btn'>
                    <Button variant="contained" type='submit' onClick={handleClick} >Log-in</Button>
                </div>
                <p className='already-btn'>Don't have an account?<b><Link to="/register" className='link'> Register</Link></b></p>
            </Card>
        </Box>
    );
}