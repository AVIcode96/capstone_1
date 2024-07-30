// src/components/Card.jsx

import './Card.css';

const Card = ({ children }) => {
    return (
        <div className="custom-card">
            {children}
        </div>
    );
};

export default Card;
