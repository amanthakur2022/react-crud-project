import './index.css';
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';

function Dashboard() {
    // const users = [
    //     { id: 1, username: "mark", email: "mark@gmail.com", gender: "Male", phone: "9898989898", password: "poiuyt" },
    //     { id: 2, username: "jacob", email: "jacob@outlook.com", gender: "Male", phone: "8787878787", password: "mnbvc" },
    //     { id: 3, username: "larry", email: "larry@rediffmail.com", gender: "Female", phone: "7676767676", password: "asdfgh" }
    // ];
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
                            <td><a class="btn text-warning" href="#" role="button" title="Edit"><FontAwesomeIcon icon={faPen} /></a>
                                <a class="btn text-danger" href="#" role="button" title="Delete"><FontAwesomeIcon icon={faTrash} /></a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
export default Dashboard;