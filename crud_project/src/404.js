import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    // jsx part of the component
    return (
        <div className='align-items-center d-flex justify-content-center vh-100'>
            <div className="card">
                <div className="card-body">
                    <h1 className='display-1 fw-bold'>404</h1>
                    <h1 className='display-1 fw-medium'>Page not found</h1>
                    <button type="submit" className="btn btn-primary" onClick={goBack}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;