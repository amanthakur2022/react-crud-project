import './register.css';

function Register() {
    return (
        <div className="register-header">
            <h1>Register Yourself</h1>
            <h5>Please enter your details</h5>
            <form class="row g-3 w-75">
                <div class="col-md-12">
                    <label for="inputUsername" class="form-label float-start">Username</label>
                    <input type="text" class="form-control" id="inputUsername" />
                </div>
                <div class="col-md-12">
                    <label for="inputEmail4" class="form-label float-start">Email</label>
                    <input type="email" class="form-control" id="inputEmail4" />
                </div>
                <div class="col-md-12">
                    <label for="inputFName" class="form-label float-start">Gender</label>
                    <select class="form-select" aria-label="Default select">
                        <option selected>Please Select</option>
                        <option value="1">Male</option>
                        <option value="2">Female</option>
                        <option value="3">Other</option>
                    </select>
                </div>
                <div class="col-md-12">
                    <label for="inputPhone" class="form-label float-start">Phone</label>
                    <input type="tel" class="form-control" id="inputPhone" />
                </div>
                <div class="col-md-12">
                    <label for="inputPassword" class="form-label float-start">Password</label>
                    <input type="password" class="form-control" id="inputPassword" />
                </div>
                <div class="col-md-12">
                    <label for="inputCPassword" class="form-label float-start">Confirm Password</label>
                    <input type="password" class="form-control" id="inputCPassword" />
                </div>
                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
            </form>
            <div className='mt-5'>
                <h6>Already have an account?</h6>
                <a class="btn btn-secondary" href="/" role="button">Login here</a>
            </div>
        </div>
    );
}

export default Register;