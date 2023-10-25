import React from 'react'
import Lottie from 'lottie-react'
import anime from '../anime.json'
import { Link } from 'react-router-dom'
import './landingpage.css'

export const LandingPage = () => {
    return (
        <div>
        <div className='LandingPage'>
            <div className='insidebox'>
                <Lottie className='animetion' animationData={anime} loop={true} style={{
                    height: "70vh",
                    width: "60vw",
                    justifyContent: "center",
                    alignItems: "center",
                }} />

                <h2 >..Save your notes and access
                    <br />it anywhere on any device...</h2>

                <div className='buttonspace'>
                    <Link className="btn btn-light btn-lg" to="/login">Login</Link>
                    <Link className="btn btn-dark btn-lg" to="/signup">Sign-up</Link>
                </div>
                <br/>
                <br/>
                <footer>Version 1.0</footer>

            </div>
        </div>
        </div>
    )
}
    