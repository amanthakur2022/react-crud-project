import { useState, useEffect } from "react";
import './login.css';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
    // for initializing values to input fields
    const initialValues = { email: "", password: "" };
    // set state to input fields
    const [input, setInput] = useState(initialValues);
    // state for errors
    const [formErrors, setFormErrors] = useState({});
    // state for submit button
    const [isSubmit, setIsSubmit] = useState(false);
    // state for show password
    const [isPassVisible, setIsPassVisible] = useState(false);

    // function for change in the input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: "" });
        }
    };

    // function for handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(input));
        setIsSubmit(true);
        authenticate();
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
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(input);
        }
        console.log(Object.keys(formErrors));
    }, [formErrors, isSubmit, input]);

    // setting validation on all the fields
    const validate = (values) => {
        const errors = {};
        const regex = /^([\w]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;
        if (!values.email) {
            errors.email = "This field is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "This field is required!";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    const authenticate = () => {
        if (input.email === "gurleen@qwerty.com" && input.password === "12345") {
            alert("Signed in successfully");
        }
        else {
            alert("Incorrect Email or Password")
        }
    }
    //toggle show password
    const togglePassword = () => {
        setIsPassVisible(!isPassVisible);
    };

    // jsx part of the component
    return (
        <div className="login-header">
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
                    <p className='fs-6 text-start text-danger mb-0'>{formErrors.email}</p>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword4" className="form-label float-start">Password</label>
                    <div className="position-relative">
                        <input
                            type={!isPassVisible ? "password" : "text"} className="form-control" id="inputPassword"
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
                            disabled={input.password ? false : true}
                        >
                            <FontAwesomeIcon
                                icon={!isPassVisible ? faEye : faEyeSlash} size="xs"
                            />
                        </button>
                    </div>
                    <p className='fs-6 text-start text-danger mb-0'>{formErrors.password}</p>
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary" onClick={() => console.log(input)}>Sign in</button>
                </div>
            </form>
            <div className='mt-5'>
                <h6>Don't have an account?</h6>
                <a className="btn btn-secondary" href="/register" role="button">Register yourself</a>
            </div>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
        </div>
    );
}
export default Login;