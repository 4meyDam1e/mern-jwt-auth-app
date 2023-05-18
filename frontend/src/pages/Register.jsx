import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { name, email, password, confirmPassword } = formData;

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
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className="form">
                <form onSubmit={onSubmit} className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={name} 
                        placeholder="Full name" 
                        onChange={onChange} />
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
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={confirmPassword} 
                        placeholder="Confirm Password" 
                        onChange={onChange} />
                    <button className="btn btn-block" type="submit">Submit</button>
                </form>
            </section>
        </>
    );
}

export default Register;