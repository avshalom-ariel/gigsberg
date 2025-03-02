import React, { useState, useEffect } from 'react';
import '../styles/styles.css'; // Import the CSS file
import NavBar from '../components/NavBar'; // Import the Header component
import axios from 'axios';
import ProductsPage from './ProductsPage'; // Import the ProductsPage component

const LoginForm = ({ onSubmit, setShowForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="cta-button primary">Login</button>
            </form>

            {/* Button to toggle to Register form */}
            <div className="toggle-form">
                <p>Don't have an account? <button onClick={() => setShowForm('register')} className="toggle-button">Register</button></p>
            </div>
        </div>
    );
};

const RegisterForm = ({ onSubmit, setShowForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        onSubmit(email, password, name);
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <button type="submit" className="cta-button primary">Register</button>
            </form>

            {/* Button to toggle to Login form */}
            <div className="toggle-form">
                <p>Already have an account? <button onClick={() => setShowForm('login')} className="toggle-button">Login</button></p>
            </div>
        </div>
    );
};

const BasePage = () => {
    const [showForm, setShowForm] = useState(null); // null, "login", or "register"
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if the user is authenticated (token is available)
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSubmit = async (email, password) => {
        console.log('Logging in with:', email, password);
        try {
            const response = await axios.post('http://localhost:3003/api/users/login', {
                email: email,
                password: password
            });

            if (response.status >= 300 || response.status < 200) {
                setError("Login failed, try again.");
            } else {
                sessionStorage.setItem('token', response.data.token);
                setMessage("Logged in successfully.");
                setIsAuthenticated(true); // Set the authenticated state to true
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        }
    };

    const handleRegisterSubmit = async (email, password, name) => {
        console.log('Registering with:', email, password);
        try {
            const response = await axios.post('http://localhost:3003/api/users/register', {
                name: name,
                email: email,
                password: password
            });

            if (response.status >= 300 || response.status < 200) {
                setError("Register failed, try again.");
            } else {
                sessionStorage.setItem('token', response.data.token);
                setMessage("Registered successfully.");
                setIsAuthenticated(true); // Set the authenticated state to true
            }
        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="container">
                {/* Show the ProductsPage if authenticated */}
                {isAuthenticated ? (
                    <ProductsPage />
                ) : (
                    <>
                        <div className="hero-section">
                            <h1 className="hero-heading">Welcome to My Products Manager Project</h1>
                        </div>

                        {/* Call-to-Action Buttons */}
                        {showForm === null && (
                            <div className="cta-buttons">
                                <button
                                    className="cta-button primary"
                                    onClick={() => setShowForm('login')}
                                >
                                    Login
                                </button>
                                <button
                                    className="cta-button secondary"
                                    onClick={() => setShowForm('register')}
                                >
                                    Register
                                </button>
                            </div>
                        )}

                        {/* Dynamically show the form based on the state */}
                        {showForm === 'login' && <LoginForm onSubmit={handleLoginSubmit} setShowForm={setShowForm} />}
                        {showForm === 'register' && <RegisterForm onSubmit={handleRegisterSubmit} setShowForm={setShowForm} />}
                        {message && <h2>{message}</h2>}
                        {error && <h2>{error}</h2>}
                    </>
                )}
            </div>
        </div>
    );
};

export default BasePage;
