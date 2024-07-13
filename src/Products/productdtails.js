import React, { useEffect, useState } from 'react';
import './pstyles.css';
import Procard from './products';
import Pagination from './pagination';

const Pro = () => {
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);  // Error state

    useEffect(() => {
        const fetchProducts = async (page) => {
            try {
                const response = await fetch(`/api/workouts?page=${page}&limit=12`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                setWorkouts(data.workouts);
                setCurrentPage(data.page);
                setTotalPages(data.totalPages);
            } catch (err) {
                console.error('Failed to fetch workouts:', err);
                setError(err.message);  // Set error message
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
