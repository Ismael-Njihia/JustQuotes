import React, {useState} from 'react'
import { signup } from '../api';
import {useNavigate} from 'react-router-dom';


const SignupForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    

    const handleSignup = async (event)=>{
        event.preventDefault();

        try{
            const userData = {firstName, lastName, email, password};
            const response = await signup(userData);
            console.log(response)
            //check for the response

            if(response.status === 200){
                //navigate to login page
                navigate('/login');
            }
            else{
                console.log(response.statusText);
            }



        }catch(error){
            console.log(error)
        }
    }

  return (
    <form onSubmit={handleSignup}>
        <label htmlFor="firstName">First Name: </label>
        <input type="text" name="firstName" value={firstName} onChange={(event)=>setFirstName(event.target.value)} />
        <br />

        <label htmlFor="lastName">Last Name: </label>
        <input type="text" name="lastName" value={lastName} onChange={(event)=>setLastName(event.target.value)} />
        <br />

        <label htmlFor="email">Email: </label>
        <input type="email" name="email" value={email} onChange={(event)=>setEmail(event.target.value)} />
        <br />

        <label htmlFor="password">Password: </label>
        <input type="password" name="password" value={password} onChange={(event)=>setPassword(event.target.value)} />
        <br />

        <button type="submit">Signup</button>
    
        </form>
  );
};

export default SignupForm