import React, { useRef, useEffect } from 'react';
import './FeatureCard.css';

const FeatureCard = ({ title, description, index }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(cardRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="feature-card hidden" ref={cardRef} style={{ animationDelay: `${index * 0.3}s` }}>
            <h2 className='h2-home'>{title}</h2>
            <p className='p-home'>{description}</p>
        </div>
    );
};

export default FeatureCard;
