import React from 'react';
import './ResourceCard.css';

const ResourceCard = ({ title, link, description }) => {
    return (
        <div className="resource-card">
            <h3 className="resource-title">{title}</h3>
            <p className="resource-description">{description}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="resource-link">Leer más</a>
        </div>
    );
};

export default ResourceCard;
