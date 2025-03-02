import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the CSS file for styling
import {useNavigate} from "react-router-dom";
import logo from '../assets/images/cropped_image.png';
import icon from '../assets/images/icon.png';



const NavBar = () => {
    const navigate = useNavigate();
    const [newMessage, setNewMessage] = useState(null);

    const handleLogout = () => {
        sessionStorage.removeItem('token');

        window.location.reload(false);
    };

    const handleNewMessage = () => {
        setNewMessage(null);
        navigate('/messages');
    }

    return (
        <header className="header-panel">
            <div className="logo-container-header">
                <img src={logo} alt="Avshi's Bank Logo" className="logo-img-header"/>
                <h2 className="logo-text-header">Avshalom's Products inc.</h2>
            </div>
            <div className="logo-container-header">
            {/*<img src={logo} alt="Avshi's Bank Logo" className="logo-header"/>*/}
            </div>
            <nav>
                <ul className="nav-list">
                    <li>
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    {/*<li>*/}
                    {/*    <Link to="/about" className="nav-link">About</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <Link to="/contact" className="nav-link">Contact</Link>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    {sessionStorage.getItem('token') && <Link to="/profile" className="nav-link">Profile</Link>}*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    {sessionStorage.getItem('token') &&*/}
                    {/*        <Link to="/transactions" className="nav-link">Transactions</Link>}*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    {sessionStorage.getItem('token') && <Link to="/messages" className="nav-link">Messages</Link>}*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    {sessionStorage.getItem('token') && newMessage &&*/}
                    {/*        <div className="icon-container-header">*/}
                    {/*            <img src={icon} alt="Avshi's Bank Logo" to="/messages" className="icon-img-header"*/}
                    {/*                  onClick={() => {*/}
                    {/*                      handleNewMessage()*/}
                    {/*                  }}/>*/}
                    {/*    </div>}*/}

                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    {sessionStorage.getItem('token') && <Link to="/products" className="nav-link">Products</Link>}*/}
                    {/*</li>*/}
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
