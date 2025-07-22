import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

export const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: '', 
        aadhar: ''
    });

    const [message, setMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setFormData({ ...formData, role });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const password = formData.password;
        const confirmPassword = formData.confirmPassword;
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return; 
        }
        axios.post('http://localhost:3001/register', formData)
            .then(res => {
                console.log(res.data); 
                setMessage('User registered successfully');
                navigate('/Login');
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    console.error('Error registering user:', error.response.data.error);
                    setMessage(error.response.data.error); 
                } else {
                    console.error('Error registering user:', error);
                    setMessage('User Already Exist'); 
                }
            });
    };

    return (
        <div className="signup-container1">
            <div className='full-signup'>
                <div className="signup-overlay"></div>
                <div className="signup-title"></div>
                <div className="text-part-show">
                    <h2>Empowering Farmers</h2>
                    <p className='p1-login'>Join us in revolutionizing agriculture and empowering farmers worldwide.</p>
                    <p className='p2-login'>Farmers are the backbone of our society, working tirelessly to feed and nourish.</p>
                </div>
                <div className="signup2-container2">
                    <div className='signupform'>
                        <form onSubmit={handleFormSubmit}>
                            <h1>SignUp</h1>
                            <div className="signup-input-box1">
                                <input type="text" name="fullname" placeholder="Enter Your Name" className='input-signup-1' value={formData.fullname} onChange={handleChange} required />
                                <input type="text" name="username" placeholder="Username" className='input-signup-2' value={formData.username} onChange={handleChange} required />
                                <input type="email" name="email" placeholder="Email-Address" className='input-signup-2' value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="signup-input-box2">
                                <input type="text" name="phone" placeholder="Phone Number" className='input-signup-4'value={formData.phone} onChange={handleChange} required />
                                <div className="password-input">
    <input 
        type={showPassword ? "text" : "password"} 
        name="password" 
        placeholder="Password" 
        className='input-signup-5' 
        value={formData.password} 
        onChange={handleChange} 
        required 
    />
    <span className="password-icon" onClick={togglePasswordVisibility}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
</div>
<div className="password-input">
    <input 
        type={showConfirmPassword ? "text" : "password"} 
        name="confirmPassword" 
        placeholder="Confirm Your Password" 
        className='input-signup-6' 
        value={formData.confirmPassword} 
        onChange={handleChange} 
        required 
    />
    <span className="password-icon" onClick={toggleConfirmPasswordVisibility}>
        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
</div>
                            </div>
                            <div className="signup-input-box">
                                <input type="text" name="aadhar" placeholder="Enter Your Aadhar Number" className='input-signup-7' value={formData.aadhar} onChange={handleChange} required />
                            </div>
                            <div className="mode-selection">
                        <h2>Choose Mode:</h2>
                        <div className="radio-group">
                            <label>
                                <input type="radio" name="role" value="farmer" checked={formData.role === 'farmer'} onChange={handleRoleChange} />
                                Farmer
                            </label>
                            <label>
                                <input type="radio" name="role" value="customer" checked={formData.role === 'customer'} onChange={handleRoleChange} />
                                Customer
                            </label>
                        </div>
                    </div>
                            <button type="submit" className="btn">Register</button>
                            {message && <p className="error-message">{message}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
