import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals!</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit} className="form-group">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={email} 
                        placeholder="Email address" 
                        onChange={onChange} />
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={password} 
                        placeholder="Password" 
                        onChange={onChange} />
                    <button className="btn btn-block" type="submit">Submit</button>
                </form>
            </section>
        </>
    );
}

export default Login;