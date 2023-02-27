import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");
    const [geolocation, setGeolocation ] = useState("");

    const handleSubmit = async(e)=>{
        console.log(name);
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/createUser', {
            method:'POST',
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({name, email, password, location:geolocation})
        })
        const data = await response.json();
        if(data.success){
            alert("you have registed successfully " + name)
            navigate('/login');
        }
        console.log(data);

        if(!data.success) {
            alert("enter your data clean")
        }

    }
    return (
        <>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} placeholder="your name" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your email" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
                    <input type="text" className="form-control" value={geolocation} onChange={(e)=>setGeolocation(e.target.value)} placeholder="your location" />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/login" className="m-3 btn btn-danger">Already have user</Link>
            </form>
        </div>
        </>
    )
}

export default SignUp;