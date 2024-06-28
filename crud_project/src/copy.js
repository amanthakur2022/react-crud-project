import React, { useState } from 'react';
import './register.css';

function Copy() {
    const [username, setUsername] = useState("");
    const [userErr, setUserErr] = useState(false);
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [phone, setPhone] = useState("");
    const [phoneErr, setPhoneErr] = useState(false);
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);
    const [cPassword, setCPassword] = useState("");
    const [cPasswordErr, setCPasswordErr] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
    }

    const userHandler = (e) => {
        let user = e.target.value;
        if (!user) {
            setUserErr(true)
        }
        else {
            setUserErr(false)
        }
        setUsername(user)
    }
    const emailHandler = (e) => {
        let item = e.target.value;
        const emailRegex = /^([\w]{1,})([^\W])(@)([\w]{1,})(\.[\w]{1,})+$/;

        if (!emailRegex.test(item)) {
            setEmailErr(true);
        }
        else {
            setEmailErr(false);
        }
        setEmail(e.target.value)
    }
    const phoneHandler = (e) => {
        let item = e.target.value;
        const phoneRegex = /^\d{10}$/;

        if (!phoneRegex.test(item)) {
            setPhoneErr(true);
        }
        else {
            setPhoneErr(false);
        }
        setPhone(e.target.value)
    }
    const passwordHandler = (e) => {
        let item = e.target.value;
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

        if (!passwordRegex.test(item)) {
            setPasswordErr(true);
        }
        else {
            setPasswordErr(false);
        }
        setPassword(e.target.value)
    }
    const cPasswordHandler = (e) => {
        let item = e.target.value;

        if (item !== password) {
            setCPasswordErr(true);
        }
        else {
            setCPasswordErr(false);
        }
        setCPassword(e.target.value)
    }
    return (
        <div className="register-header">
            <h1>Register Yourself</h1>
            <h5>Please enter your details</h5>
            <form className="row g-3 w-75" onSubmit={handleSubmit} noValidate >
                <div className="col-md-12 form-group">
                    <label htmlFor="inputUsername" className="form-label float-start">Username</label>
                    <input type="text" className="form-control" id="inputUsername" value={username}
                        onChange={userHandler} required />
                    {userErr ? <p className='fs-6 text-start text-danger mb-0'>Username is required</p> : ""}
                </div>
                <div className="col-md-12 form-group">
                    <label htmlFor="inputEmail" className="form-label float-start">Email</label>
                    <input type="email" className="form-control" id="inputEmail" value={email}
                        onChange={emailHandler} required />
                    {emailErr ? <p className='fs-6 text-start text-danger mb-0'>Invalid Email Format</p> : ""}
                </div>
                <div className="col-md-12 form-group">
                    <label htmlFor="inputFName" className="form-label float-start">Gender</label>
                    <select className="form-select" value={gender}
                        onChange={(e) => setGender(e.target.value)} required>
                        <option value="default">Please Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="col-md-12 form-group">
                    <label htmlFor="inputPhone" className="form-label float-start">Phone</label>
                    <input type="tel" className="form-control" id="inputPhone" value={phone}
                        onChange={phoneHandler} required />
                    {phoneErr ? <p className='fs-6 text-start text-danger mb-0'>Invalid Phone Number Format</p> : ""}
                </div>
                <div className="col-md-12 form-group">
                    <label htmlFor="inputPassword" className="form-label float-start">Password</label>
                    <input type="password" className="form-control" id="inputPassword" value={password}
                        onChange={passwordHandler} required />
                    {passwordErr ? <p className='fs-6 text-start text-danger mb-0'>A minimum 8 characters password contains a combination of uppercase, lowercase letter, special characters and number</p> : ""}

                </div>
                <div className="col-md-12 form-group">
                    <label htmlFor="inputCPassword" className="form-label float-start">Confirm Password</label>
                    <input type="password" className="form-control" id="inputCPassword" value={cPassword}
                        onChange={cPasswordHandler} required />
                    {cPasswordErr ? <p className='fs-6 text-start text-danger mb-0'>Passwords doesn't match</p> : ""}

                </div>

                <button type="submit" className="btn btn-primary" onClick={() => console.log(username, email, phone, gender, password, cPassword)}>Sign in</button>
                {/* <button type="submit" className="btn btn-primary" onClick={() => console.log(input)}>Sign in</button> */}
            </form>
            <div className='mt-5'>
                <h6>Already have an account?</h6>
                <a className="btn btn-secondary" href="/" role="button">Login here</a>
            </div>
        </div>
    );
}

export default Copy;