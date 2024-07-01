import './dashboard.css';
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {

    // jsx part of the component
    return (
        <div className="dashboard-header">
            <h1>Dashboard</h1>
            <table className="table table-striped table-bordered">
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
                    <tr>
                        <th scope="row">1</th>
                        <td>mark</td>
                        <td>mark@gmail.com</td>
                        <td>Male</td>
                        <td>9898989898</td>
                        <td>poiuyt</td>
                        <td><a class="btn text-warning" href="#" role="button"><FontAwesomeIcon icon={faPen} /></a>
                            <a class="btn text-danger" href="#" role="button"><FontAwesomeIcon icon={faTrash} /></a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>jacob</td>
                        <td>jacob@outlook.com</td>
                        <td>Male</td>
                        <td>8787878787</td>
                        <td>mnbvc</td>
                        <td><a class="btn text-warning" href="#" role="button"><FontAwesomeIcon icon={faPen} /></a>
                            <a class="btn text-danger" href="#" role="button"><FontAwesomeIcon icon={faTrash} /></a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>larry</td>
                        <td>larry@rediffmail.com</td>
                        <td>Female</td>
                        <td>7676767676</td>
                        <td>asdfgh</td>
                        <td><a class="btn text-warning" href="#" role="button"><FontAwesomeIcon icon={faPen} /></a>
                            <a class="btn text-danger" href="#" role="button"><FontAwesomeIcon icon={faTrash} /></a>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}
export default Dashboard;