import './pstyles.css';
import React from 'react';

const Procard = ({ workout }) => {
    return (
        <div className="card-grid" style={{ paddingTop: '90px' }}>
            <a className="card" href="/add">
                <div className="card__background" style={{ backgroundImage: `url(${workout.imageUrl})` }}></div>
                <div className="card__content">
                    <p className="card__category">{workout.title}</p>
                    <h3 className="card__heading">{workout.category}</h3>
                </div>
            </a>
        </div>
    );
}

export default Procard;
