import React, { useEffect } from 'react'
import { Link , useNavigate, useLocation } from 'react-router-dom'

export const Navbar = () => {

    let navigate = useNavigate();
    const handelLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }

    const location = useLocation();
    useEffect(() => {
        console.log(location);
      
    }, [location])
    

    return (
        // #b3c1f5db
        <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor":"white"}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">myNotes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/home"?"active":""}`} aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex" >
                        <Link className="btn btn-dark mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-dark mx-1" to="/signup" role="button">Signup</Link>
                    </form>:<button className="btn btn-light mx-1" onClick={handelLogout} >Logout</button>}
                </div>
            </div>
        </nav>

    )
}
