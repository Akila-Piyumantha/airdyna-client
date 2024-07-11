import React, { useEffect, useState } from 'react';
import './pstyles.css';
import Procard from './products';
import Pagination from './pagination';

const Pro = () => {
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async (page) => {
            try {
                const response = await fetch(`/api/workouts?page=${page}&limit=12`, {
                    method: 'GET',
                    credentials: 'include'
                });

                const text = await response.text();

                try {
                    const data = JSON.parse(text);

                    if (response.ok) {
                        setWorkouts(data.workouts);
                        setCurrentPage(data.page);
                        setTotalPages(data.totalPages);
                    } else {
                        console.error('Error fetching products:', data);
                    }
                } catch (error) {
                    console.error('Received non-JSON response:', text);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='bodyback'>
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
        </div>
    );
};

export default Pro;


