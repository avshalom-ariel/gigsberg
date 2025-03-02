import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the CSS file for styling
import {useNavigate} from "react-router-dom";
import logo from '../assets/images/cropped_image.png';

const NavBar = () => {
    const navigate = useNavigate();
    const [newMessage, setNewMessage] = useState(null);

    const handleLogout = () => {
        sessionStorage.removeItem('token');

        window.location.reload(false);
    };

    return (
        <header className="header-panel">
            <div className="logo-container-header">
                <img src={logo} alt="Avshi's Bank Logo" className="logo-img-header"/>
                <h2 className="logo-text-header">Avshalom's Products inc.</h2>
            </div>
            <div className="logo-container-header">
            </div>
            <nav>
                <ul className="nav-list">
                    <li>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li>
                        {sessionStorage.getItem('token') && <Link to="/" className="nav-link" onClick={() => {
                            handleLogout()
                        }}>Logout</Link>}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
