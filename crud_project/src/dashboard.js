import './index.css';
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';

function Dashboard() {
    const initialValues = { username: "", email: "", gender: "", phone: "", password: "", cPassword: "" };
    const [input, setInput] = useState(initialValues);
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/user").then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    })
    // jsx part of the component
    return (
        <div className="fs bg-white d-flex flex-column align-items-center text-black min-vh-100">
            <h1 className='my-5'>Dashboard</h1>
            <table className="table table-striped table-bordered w-auto">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Password</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>{user.phone}</td>
                            <td>{user.password}</td>
                            <td><a className="btn text-warning" href="#" role="button" title="Edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><FontAwesomeIcon icon={faPen} /></a>
                                <a className="btn text-danger" href="#" role="button" title="Delete"><FontAwesomeIcon icon={faTrash} /></a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" className="btn-close fs-6" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3 w-75">
                                <div className="col-md-12">
                                    <label htmlFor="inputUsername" className="form-label float-start">Username</label>
                                    <input
                                        className="form-control"
                                        id="inputUsername"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={input.username} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputEmail" className="form-label float-start">Email</label>
                                    <input
                                        className="form-control"
                                        id="inputEmail"
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={input.email} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputFName" className="form-label float-start">Gender</label>
                                    <select
                                        className="form-select"
                                        value={input.gender}
                                        name="gender" >
                                        <option value="default">Please Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputPhone" className="form-label float-start">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="inputPhone"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={input.phone} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputPassword" className="form-label float-start">Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputPassword"
                                        name="password"
                                        placeholder="Password"
                                        value={input.password} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="inputCPassword" className="form-label float-start">Confirm Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cPassword"
                                        id="inputCPassword"
                                        value={input.cPassword}
                                        placeholder="Confirm Password" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;