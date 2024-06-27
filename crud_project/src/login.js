import './login.css';

function Login() {
    return (
        <div className="login-header">
            <h1>Welcome Back</h1>
            <h5>Please enter your details</h5>
            <form className="row g-3">
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label float-start">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword4" className="form-label float-start">Password</label>
                    <input type="password" className="form-control" id="inputPassword4" />
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
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