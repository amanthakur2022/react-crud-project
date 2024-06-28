import { useState, useEffect } from "react";
import './register.css';

function Register() {
    // for initializing values to input fields
    const initialValues = { username: "", email: "", gender: "", phone: "", password: "", cPassword: "" };
    // set state to input fields
    const [input, setInput] = useState(initialValues);
    // state for errors
    const [formErrors, setFormErrors] = useState({});
    // state for submit button
    const [isSubmit, setIsSubmit] = useState(false);

    // function for change in the input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    // function for handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(input));
        setIsSubmit(true);
    };

    // useEffect to check if we have errors 
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(input);
        }
        console.log(Object.keys(formErrors));
    }, [formErrors]);

    // setting validation on all the fields
    const validate = (values) => {
        const errors = {};
        const regex = /^([\w]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;
        const phoneRegex = /^\d{10}$/;
        if (!values.username) {
            errors.username = "This field is required!";
        }
        else {
            errors.username = "";
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
        if (values.gender == "default" || !values.gender) {
            errors.gender = "This field is required!"
        }
        if (!values.password) {
            errors.password = "This field is required!";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (!values.cPassword) {
            errors.cPassword = "This field is required!";
        } else if (values.cPassword !== values.password) {
            errors.cPassword = "Passwords doesn't match";
        }
        return errors;
    };

    // jsx part of the component
    return (
        <div className="register-header">
            <form onSubmit={handleSubmit} className="row g-3 w-75">
                <h1>Register Yourself</h1>
                <h5>Please enter your details</h5>
                <div className="col-md-12">
                    <label htmlFor="inputUsername" className="form-label float-start">Username</label>
                    <input className="form-control" id="inputUsername"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={input.username}
                        onChange={handleChange}
                    />
                    <p className='fs-6 text-start text-danger mb-0'>{formErrors.username}</p>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label float-start">Email</label>
                    <input className="form-control" id="inputEmail"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={input.email}
                        onChange={handleChange}
                    />
                    <p className='fs-6 text-start text-danger mb-0'>{formErrors.email}</p>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputFName" className="form-label float-start">Gender</label>
                    <select className="form-select" value={input.gender} name="gender"
                        onChange={handleChange} required>
                        <option value="default">Please Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <p className='fs-6 text-start text-danger mb-0'>{formErrors.gender}</p>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPhone" className="form-label float-start">Phone</label>
                    <input type="tel" className="form-control" id="inputPhone" name="phone" value={input.phone}
                        onChange={handleChange} />
                    <p className='fs-6 text-start text-danger mb-0'>{formErrors.phone}</p>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword" className="form-label float-start">Password</label>
                    <input
                        type="password" className="form-control" id="inputPassword"
                        name="password"
                        placeholder="Password"
                        value={input.password}
                        onChange={handleChange}
                    />
                    <p className='fs-6 text-start text-danger mb-0'>{formErrors.password}</p>
                </div>
                <div className="col-md-12 form-group">
                    <label htmlFor="inputCPassword" className="form-label float-start">Confirm Password</label>
                    <input type="password" className="form-control" name="cPassword" id="inputCPassword" value={input.cPassword}
                        onChange={handleChange} />
                    <p className='fs-6 text-start text-danger mb-0'>{formErrors.cPassword}</p>

                </div>
                <button type="submit" className="btn btn-primary" onClick={() => console.log(input)}>Signup</button>
            </form>
        </div>
    );
}

export default Register;