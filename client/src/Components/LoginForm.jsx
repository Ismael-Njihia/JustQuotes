import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8080/login',{email, password});
            console.log(response);
            if(response.status === 200){
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                
               navigate('/Home');
                

                setUsername(response.data.username);
            } else {
                console.log(response.statusText);
            }

        }catch(err){
            console.log(err);
            console.error(err.response.data);
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br/>

        <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br/>

        <button type="submit">Login</button>

        {username && <h2>Welcome {username}</h2>}
    </form>
  )
}

export default LoginForm