import "./signup.scss";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
    // const [formData, setFormData] = useState({
    //     username : "",
    //     email: "",
    //     password: "",
    // });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const postSignUp = async (signUpData) => {
        try {
            let response = await axios.post('https://todo-api-mocha.vercel.app/auth/signup', signUpData);
            const { token, username } = response.data;

            localStorage.setItem(`${username}Token`, token);
            //console.log("token stored in localStorage:", localStorage.getItem(`${username}Token`));
            //console.log('POST request successful:', response);
            navigate(`/user/${username}`);
        } catch (error) {
            console.error('POST request failed:', error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const filterFields = ["username", "email", "password"];
        const formJson = Object.fromEntries(Array.from(formData.entries()).filter(([key]) =>
            filterFields.includes(key))
        );
        //console.log(formJson);
        if (formJson.username === "" || formJson.email === "" || formJson.password === "") {
            alert("Please fill in all the fields");
        } else {
            postSignUp(formJson);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup">
                <h2>Create your Account</h2>
                <div className="signup-form">
                    <form method='post' className='form' onSubmit={handleSubmit}>
                        <input type="text" name="username" placeholder="Username" />
                        <input type="email" name="email" placeholder="Email" />
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
                            <button type="submit" className="btn">SignUp</button>
                            <p>Already Registered? <Link to="/auth/login">Click here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup