import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
                const response = await axios.get(`${process.env.REACT_APP_API}/api/workouts`, {
                    params: { page, limit: 12 }
                });
                const data = response.data;

                if (response.status === 200) {
                    setWorkouts(data.workouts);
                    setCurrentPage(data.page);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.error("Error fetching products", error);
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


