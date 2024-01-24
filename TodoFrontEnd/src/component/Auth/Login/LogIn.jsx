import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.scss';
import Signup from '../Signup/Signup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const LogIn = () => {
    const [logState, setLogState] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const postLogin = async (loginData) => {
        try {
            let response = await axios.post('https://todo-api-mocha.vercel.app/auth/login', loginData);

            const { token, username } = response.data;
            localStorage.setItem(`${username}Token`, token);
            //console.log("token stored in localStorage:", localStorage.getItem(`${username}Token`));
            console.log('POST request successful:', response);
            navigate(`/user/${username}`);
        } catch (error) {
            if (error.response.status === 401) {
                alert("Enter correct password");
            }
            else {
                console.error('POST request failed:', error);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const filteredFields = ['email', 'password'];
        const formJson = Object.fromEntries(
            Array.from(formData.entries())
                .filter(([key]) => filteredFields.includes(key))
        );
        //console.log("form: ",formJson);
        if (formJson.email === "" || formJson.password === "") {
            alert("Please fill in all the fields");
        } else {
            postLogin(formJson);
        }
    }
    return (
        <>
            {/* <Signup /> */}
            <div className="login-container">
                <div className="login">
                    <h2 className="logintext">Enter your LogIn Details</h2>
                    <div className="login-form">
                        <form method='post' className="form" onSubmit={handleSubmit}>
                            <input type="email" name="email" placeholder="Enter email" />
                            <div className="password">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter password"
                                />
                                <div className="eye-icon" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </div>
                            </div>
                            <div className="btn-container">
                                <button type="submit" className="btn">LogIn</button>
                                <p>
                                    New User?<Link to="/auth/signup">Click here</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogIn;
