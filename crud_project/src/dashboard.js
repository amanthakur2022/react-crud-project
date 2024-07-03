import './index.css';
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';

function Dashboard() {
    const initialValues = { username: "", email: "", gender: "", phone: "", password: "", cPassword: "" };
    const [input, setInput] = useState(initialValues);
    const [users, setUsers] = useState([]);
    const [deleteUserId, setDeleteUserId] = useState(null);
    useEffect(() => {
        getUsers();
    })
    const getUsers = () => {
        fetch("http://localhost:5000/user").then((result) => {
            result.json().then((resp) => {
                setUsers(resp)
            })
        })
    }

    const deleteUser = (id) => {
        fetch(`http://localhost:5000/user/${id}`, {
            method: "DELETE"
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
                getUsers();
                setDeleteUserId(null);
            })
        })
    }
    const handleDeleteModalOpen = (id) => {
        setDeleteUserId(id);
    }
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
                            <td><a className="btn text-warning" href="#" role="button" title="Edit" data-bs-toggle="modal" data-bs-target="#editModal"><FontAwesomeIcon icon={faPen} /></a>
                                <a className="btn text-danger" href="#" role="button" title="Delete" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => handleDeleteModalOpen(user.id)}><FontAwesomeIcon icon={faTrash} /></a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit</h1>
                            <button type="button" className="btn-close fs-6" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="id" className="form-label float-start">Id</label>
                                    <input
                                        className="form-control"
                                        id="id"
                                        type="text"
                                        name="id"
                                        value="id"
                                        disabled />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputUsername" className="form-label float-start">Username</label>
                                    <input
                                        className="form-control"
                                        id="inputUsername"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={input.username} />
                                </div>
                                <div className="col-md-6">
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
                                <div className="col-md-6">
                                    <label htmlFor="inputPhone" className="form-label float-start">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="inputPhone"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={input.phone} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputEmail" className="form-label float-start">Email</label>
                                    <input
                                        className="form-control"
                                        id="inputEmail"
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={input.email} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword" className="form-label float-start">Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputPassword"
                                        name="password"
                                        placeholder="Password"
                                        value={input.password} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="deleteModalLabel">Delete</h1>
                            <button type="button" className="btn-close fs-6" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body fs-5">
                            Do you really want to delete this entry?
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteUser(deleteUserId)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;