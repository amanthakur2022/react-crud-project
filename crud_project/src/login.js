import './login.css';

function Login() {
    return (
        <div className="login-header">
            <h1>Welcome Back</h1>
            <h5>Please enter your details</h5>
            <form class="row g-3">
                <div class="col-md-12">
                    <label for="inputEmail4" class="form-label float-start">Email</label>
                    <input type="email" class="form-control" id="inputEmail4" />
                </div>
                <div class="col-md-12">
                    <label for="inputPassword4" class="form-label float-start">Password</label>
                    <input type="password" class="form-control" id="inputPassword4" />
                </div>
                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
            </form>
            <div className='mt-5'>
                <h6>Don't have an account?</h6>
                <a class="btn btn-secondary" href="/register" role="button">Register yourself</a>
            </div>
        </div>
    );
}
export default Login;