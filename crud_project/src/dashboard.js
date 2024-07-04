import './index.css';
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';

function Dashboard() {
    const initialValues = { username: "", email: "", gender: "", phone: "", password: "", cPassword: "" };
    const [value, setValue] = useState(initialValues);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [selectGender, setSelectGender] = useState("")
    const [selectId, setSelectId] = useState("")
    useEffect(() => {
        getUsers();
    }, [])

    // function to get all users data
    const getUsers = () => {
        fetch("http://localhost:5000/user").then((result) => {
            result.json().then((resp) => {
                setUsers(resp);
            })
        })
    }
    const Search = (e) => {
        setSearchInput(e.target.value);
    }
    const genderSearch = (e) => {
        setSelectGender(e.target.value);
    }
    const idSearch = (e) => {
        setSelectId(e.target.value);
    }


    const searchFilter = users.filter((user) => {
        if (searchInput === "" && selectGender === "" && selectId === "") {
            return user
        }
        else if (selectGender || selectId) {
            return ((selectGender && user.gender.toLowerCase().includes(selectGender.toLowerCase())) ||
                (selectId && user.id.toLowerCase().includes(selectId.toLowerCase()))
            )
        }
        // else if (selectGender) {
        //     return (user.gender.toLowerCase().includes(selectGender.toLowerCase()))
        // }
        // else if (selectId) {
        //     return (user.id.toLowerCase().includes(selectId.toLowerCase()))
        // }
        else {
            return (user.id.toLowerCase().includes(searchInput)) ||
                (user.username.toLowerCase().includes(searchInput)) ||
                (user.email.toLowerCase().includes(searchInput)) ||
                (user.gender.toLowerCase().includes(searchInput)) ||
                (user.phone.toLowerCase().includes(searchInput)) ||
                (user.password.toLowerCase().includes(searchInput))
        }
        // return searchInput === "" ? user : ((user.id.toLowerCase().includes(searchInput)) ||
        //     (user.username.toLowerCase().includes(searchInput)) ||
        //     (user.email.toLowerCase().includes(searchInput)) ||
        //     (user.gender.toLowerCase().includes(searchInput)) ||
        //     (user.phone.toLowerCase().includes(searchInput)) ||
        //     (user.password.toLowerCase().includes(searchInput)))
    });
    // function to delete user data
    const deleteUser = (id) => {
        fetch(`http://localhost:5000/user/${id}`, {
            method: "DELETE"
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
                getUsers();
                setUserId(null);
            })
        })
    }

    // function to update user data
    const updateUser = () => {
        fetch(`http://localhost:5000/user/${value.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn(resp);
                getUsers();
            })
        })
    }
    // function to get user data
    async function read(id) {
        try {
            let response = await fetch(`http://localhost:5000/user/${id}`);
            const userData = await response.json();
            setValue(userData)
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // function to open the modal and set id
    const handleModalOpen = (id) => {
        setUserId(id);
    }
    // jsx part of the component
    return (
        <div className="fs bg-white d-flex flex-column align-items-center text-black min-vh-100">
            <h1 className='my-3'>Dashboard</h1>
            {/* search bar */}
            <input
                className="form-control w-25 mb-3"
                id="id"
                type="text"
                name="id"
                value={searchInput}
                onChange={Search}
                placeholder="Search" />
            {/* filters */}
            <div className='d-flex gap-3 mb-3'>
                <span className="badge text-bg-primary">Filters</span>
                <select
                    className="form-select" value={selectGender}
                    name="gender" onChange={genderSearch} >
                    <option value="">Please Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    className="form-control"
                    id="id"
                    type="text"
                    name="id"
                    placeholder='id'
                    onChange={idSearch}
                />
            </div>
            {/* table for data view */}
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
                    {searchFilter.map((user) => (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>{user.phone}</td>
                            <td>{user.password}</td>
                            <td><a className="btn text-warning" href="#" role="button" title="Edit" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => read(user.id)}><FontAwesomeIcon icon={faPen} /></a>
                                <a className="btn text-danger" href="#" role="button" title="Delete" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => handleModalOpen(user.id)}><FontAwesomeIcon icon={faTrash} /></a>
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
                                        placeholder={value.id}
                                        disabled />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputUsername" className="form-label float-start">Username</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={value.username}
                                        onChange={(e) => setValue({ ...value, username: e.target.value })} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputFName" className="form-label float-start">Gender</label>
                                    <select
                                        className="form-select"
                                        value={value.gender}
                                        onChange={(e) => setValue({ ...value, gender: e.target.value })}
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
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={value.phone}
                                        onChange={(e) => setValue({ ...value, phone: e.target.value })} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputEmail" className="form-label float-start">Email</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={value.email}
                                        onChange={(e) => setValue({ ...value, email: e.target.value })} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="inputPassword" className="form-label float-start">Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={value.password}
                                        onChange={(e) => setValue({ ...value, password: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => updateUser(userId)}>Update</button>
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
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => deleteUser(userId)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;