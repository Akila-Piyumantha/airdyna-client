import React, { useEffect, useState } from 'react';
import './pstyles.css';
import '../navbar2styles.css';
import Procard from './products';
import Pagination from './pagination';

const Pro = () => {
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);  // Error state
    const apiUrl = process.env.API_URL;

    useEffect(() => {
        const fetchProducts = async (page) => {
            try {
                const response = await fetch(`${apiUrl}/api/workouts?page=${page}&limit=12`);
                const contentType = response.headers.get('content-type');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                if (contentType && contentType.indexOf('application/json') !== -1) {
                    const data = await response.json();
                    setWorkouts(data.workouts);
                    setCurrentPage(data.page);
                    setTotalPages(data.totalPages);
                } else {
                    const text = await response.text();
                    console.error('Expected JSON, but got:', text);
                    throw new Error('Response was not JSON');
                }

            } catch (err) {
                console.error('Failed to fetch workouts:', err);
                setError(err.message);  // Set error state with the error message
            }
        };

        fetchProducts(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='bodyback'>
            {error ? (
                <div className="error-message">Error: {error}</div>  // Display error message
            ) : (
                <>
                    <section className="hero-section bodym bodyback">
                        {workouts.map(workout => (
                            <Procard key={workout._id} workout={workout} />
                        ))}
                    </section>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default Pro;
