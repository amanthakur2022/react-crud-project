import { useState, useEffect } from "react";
import './index.css';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';


function Register() {
    // for initializing values to input fields
    const initialValues = { username: "", email: "", gender: "", phone: "", password: "", cPassword: "" };
    // set state to input fields
    const [input, setInput] = useState(initialValues);
    // state for errors
    const [formErrors, setFormErrors] = useState({});
    // state for submit button
    const [isSubmit, setIsSubmit] = useState(false);
    // state for show password
    const [isPassVisible, setIsPassVisible] = useState(false);
    const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

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
            console.log(input);
            SaveUser();
        }
    }, [formErrors, isSubmit]);

    // setting validation on all the fields
    const validate = (values) => {
        const errors = {};
        const regex = /^([\w]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;
        const phoneRegex = /^\d{10}$/;

        if (!values.username) {
            errors.username = "This field is required!";
        }
        if (!values.email) {
            errors.email = "This field is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.phone) {
            errors.phone = "This field is required!";
        } else if (!phoneRegex.test(values.phone)) {
            errors.phone = "Please enter a 10 digit phone number"
        }
        if (values.gender === "default" || !values.gender) {
            errors.gender = "Please select a gender!"
        }
        if (!values.password) {
            errors.password = "This field is required!";
        } else if (values.password.length < 4 || values.password.length > 10) {
            errors.password = "Password must be between 4 and 10 characters";
        }
        if (!values.cPassword) {
            errors.cPassword = "This field is required!";
        } else if (values.cPassword !== values.password) {
            errors.cPassword = "Passwords do not match!";
        }
        return errors;
    };

    //toggle show password
    const togglePasswordVisibility = () => {
        setIsPassVisible(!isPassVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPassVisible(!isConfirmPassVisible);
    }
    const navigate = useNavigate();
    const SaveUser = () => {
        fetch("http://localhost:5000/user", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn('resp', resp)
            })
        })
        navigate('/login');
    }

    // jsx part of the component
    return (
        <div className="fs bg-white d-flex flex-column align-items-center justify-content-center text-black w-50 rounded-5 min-vh-100">
            <form onSubmit={handleSubmit} className="row g-3 w-75" method="POST">
                <h1>Register Yourself</h1>
                <h5>Please enter your details</h5>
                <div className="col-md-12">
                    <label htmlFor="inputUsername" className="form-label float-start">Username</label>
                    <input
                        className="form-control"
                        id="inputUsername"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={input.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {formErrors.username && <p className='fs-6 text-start text-danger mb-0'>{formErrors.username}</p>}
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label float-start">Email</label>
                    <input
                        className="form-control"
                        id="inputEmail"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={input.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {formErrors.email && <p className='fs-6 text-start text-danger mb-0'>{formErrors.email}</p>}
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputFName" className="form-label float-start">Gender</label>
                    <select
                        className="form-select"
                        value={input.gender}
                        name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}>
                        <option value="default">Please Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {formErrors.gender && <p className='fs-6 text-start text-danger mb-0'>{formErrors.gender}</p>}
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPhone" className="form-label float-start">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="inputPhone"
                        name="phone"
                        placeholder="Phone Number"
                        value={input.phone}
                        onChange={handleChange}
                        onBlur={handleBlur} />
                    {formErrors.phone && <p className='fs-6 text-start text-danger mb-0'>{formErrors.phone}</p>}
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword" className="form-label float-start">Password</label>
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
                            onClick={togglePasswordVisibility}
                            className="position-absolute end-0 bottom-0 border-0 bg-transparent"
                            disabled={!input.password}
                        >
                            <FontAwesomeIcon
                                icon={!isPassVisible ? faEye : faEyeSlash} size="xs"
                            />
                        </button>
                    </div>
                    {formErrors.password && <p className='fs-6 text-start text-danger mb-0'>{formErrors.password}</p>}
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputCPassword" className="form-label float-start">Confirm Password</label>
                    <div className="position-relative">
                        <input
                            type={!isConfirmPassVisible ? "password" : "text"}
                            className="form-control"
                            name="cPassword"
                            id="inputCPassword"
                            value={input.cPassword}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            onBlur={handleBlur} />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="position-absolute end-0 bottom-0 border-0 bg-transparent"
                            disabled={!input.cPassword}
                        >
                            <FontAwesomeIcon
                                icon={!isConfirmPassVisible ? faEye : faEyeSlash}
                                size="xs"
                            />
                        </button>
                    </div>
                    {formErrors.cPassword && <p className='fs-6 text-start text-danger mb-0'>{formErrors.cPassword}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
            <div className='mt-5'>
                <h6>Already have an account?</h6>
                <a className="btn btn-secondary" href="/login" role="button">Login Here!</a>
            </div>
        </div>
    );
}

export default Register;