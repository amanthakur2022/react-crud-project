import Login from './login';
import Register from './register';
import Copy from './copy';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import PageNotFound from './404';

function App() {
  return (
    <div className="text-center">
      <header className='bg-image'>
        <Router>
          {/* <Link to="" >Login</Link>
          <Link to="/register" >Register</Link> */}

          <Routes>
            <Route exact path="" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/copy" Component={Copy} />
            <Route path="*" Component={PageNotFound} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
