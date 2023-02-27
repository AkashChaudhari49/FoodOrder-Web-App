import React, { useState } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");

    const handleSubmit = async(e)=>{
      
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/loginUser', {
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({ email, password})
        })
        const data = await response.json();
        console.log(data);

        if(!data.success) {
            alert("enter your data clean")
            navigate('/');
        }
        if(data.success) {
            localStorage.setItem("userEmail", email )
            localStorage.setItem("authToken", data.authToken)
            console.log(localStorage.getItem("authToken"));
            navigate('/');
        }

    }
    return (
        <>
        <div className='container'>
            <form onSubmit={handleSubmit}>
  
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your email" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
                </div>
          
                <button type="submit" className="btn btn-success">Login</button>
                <Link to="/login" className="m-3 btn btn-danger">Not user! signUp</Link>
  
            </form>
        </div>
        </>
    )
}

export default Login;