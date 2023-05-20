import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get and destructure the auth slice
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate("/");
        }

        dispatch(reset());
    }, [user, isSuccess, isError, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        };

        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

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