import './404.css';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className='align-items-center d-flex justify-content-center h-full'>
            <div class="card">
                <div class="card-body">
                    <h1 className='display-1 fw-bold'>404</h1>
                    <h1 className='display-1 fw-medium'>Page not found</h1>
                    <button type="submit" class="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;