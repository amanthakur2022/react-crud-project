import { useState, useEffect } from "react";
import './index.css';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

function Login() {
    const initialValues = { email: "", password: "" };
    const [input, setInput] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isPassVisible, setIsPassVisible] = useState(false);
    const navigate = useNavigate();

    // function for change in the input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: "" });
        }
    };

    // function for handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(input));
        setIsSubmit(true);
        // login();
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        const fieldErrors = validate({ ...input, [name]: input[name] });
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldErrors[name] || ""
        }));
    };

    // useEffect to check if we have errors 
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            login();
            console.log(input);
        }
    }, [formErrors, isSubmit]);

    // setting validation on all the fields
    const validate = (values) => {
        const errors = {};
        const regex = /^([\w]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;
        if (!values.email) {
            errors.email = "This field is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format!";
        }
        if (!values.password) {
            errors.password = "This field is required!";
        } else if (values.password.length < 4 || values.password.length > 10) {
            errors.password = "Password must be between 4 and 10 characters";
        }
        return errors;
    };

    async function login() {
        try {
            let response = await fetch("http://localhost:5000/user");
            if (!response.ok) {
                alert('Network response was not ok');
            }
            const database = await response.json();
            console.log(database);
            for (let i = 0; i < database.length; i++) {
                if (database[i].email === input.email && database[i].password === input.password) {
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 500);
                    return;
                }
            }
            alert('Invalid credentials');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // async function login() {
    //     let database;
    //     fetch("http://localhost:5000/user")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             database = data;
    //             console.log(database);
    //         })
    //     try {
    //         let response = await fetch("http://localhost:5000/user", {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({}),
    //         });
    //         if (!response.ok) {
    //             alert('Network response was not ok');
    //         }
    //         const userData = await response.json();
    //         console.log(userData);
    //         if (!userData || !userData.email || !userData.password) {
    //             alert('Invalid credentials');
    //         }
    //         for (let i = 0; i < database.length; i++) {
    //             if (database[i].email === input.email && database[i].password === input.password) {
    //                 navigate("/dashboard");
    //                 return;
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Login error:', error);
    //     }
    // };

    //toggle show password
    const togglePassword = () => {
        setIsPassVisible(!isPassVisible);
    };

    // jsx part of the component
    return (
        <div className="fs bg-white d-flex flex-column align-items-center justify-content-center text-black w-50 rounded-5 min-vh-100">
            <h1>Welcome Back</h1>
            <h5>Please enter your details</h5>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label float-start">Email</label>
                    <input type="email"
                        className="form-control"
                        id="inputEmail"
                        name="email"
                        placeholder="Email"
                        value={input.email}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {formErrors.email && <p className='fs-6 text-start text-danger mb-0'>{formErrors.email}</p>}
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword4" className="form-label float-start">Password</label>
                    <div className="position-relative">
                        <input
                            type={!isPassVisible ? "password" : "text"}
                            className="form-control"
                            id="inputPassword"
                            name="password"
                            placeholder="Password"
                            value={input.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="position-absolute end-0 bottom-0 border-0 bg-transparent"
                            disabled={!input.password}
                        >
                            <FontAwesomeIcon
                                icon={!isPassVisible ? faEye : faEyeSlash}
                                size="xs"
                            />
                        </button>
                    </div>
                    {formErrors.password && <p className='fs-6 text-start text-danger mb-0'>{formErrors.password}</p>}
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary" onClick={() => console.log(input)}>Sign in</button>
                </div>
            </form>
            <div className='mt-5'>
                <h6>Don't have an account?</h6>
                <a className="btn btn-secondary" href="/register" role="button">Register yourself</a>
            </div>
        </div>
    );
}
export default Login;