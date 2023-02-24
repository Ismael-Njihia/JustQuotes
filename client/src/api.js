//This file will contain the code to make HTTPS requests to the Node Js Server
 import axios from 'axios';

 export const signup = async (userData) =>{
    try{
        const response = await axios.post('http://localhost:8080/signup', userData);
        return response.data;

    }catch(error){
        throw error;
    }
 }