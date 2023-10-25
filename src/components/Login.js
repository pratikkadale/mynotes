import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = (props) => {

    

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    
    const handelSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://127.0.0.1:5000/api/auth/userlogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });


        const json = await response.json()
        console.log(json);

        if(json.success){
            //redirect > first save the auth token>>>using useHistory Hook of routerDOM
            localStorage.setItem('token',json.authtoken)
            navigate("/home");
            props.showAlert("Login Succesfull","success");
        }
        else
        {
            props.showAlert("Invalid Credentials","danger");
            
        }

    }

    const onChange = (e) => {
        //using spread operator (...,threedots) to update the note value with the e.target.name
        //jo bhi change ho raha hai uska name uski value ki barabar ho
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" name="email" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password"/>
                </div>
                <button type="submit" className="btn btn-dark">Login</button>
            </form>
        </div>
    )
}
