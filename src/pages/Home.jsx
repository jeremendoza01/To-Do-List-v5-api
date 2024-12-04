import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar/Navbar";
import "./styles/styles-Home.css";

const HomePage = () => {
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [animatedCards, setAnimatedCards] = useState(new Set());
    const features = [
        {
            id: 1,
            title: "Organiza Tareas",
            description: "Crea listas de tareas personalizadas y clasifícalas por proyecto.",
            stats: "1000+ tareas organizadas",
            color: "#3182ce"
        },
        {
            id: 2,
            title: "Seguimiento de Progreso",
            description: "Haz seguimiento de tu progreso en tiempo real y cumple tus plazos.",
            stats: "95% de efectividad",
            color: "#38a169"
        },
        {
            id: 3,
            title: "Reportes Detallados",
            description: "Genera reportes para ver el estado actual de cada proyecto.",
            stats: "Análisis en tiempo real",
            color: "#805ad5"
        },
        {
            id: 4,
            title: "Integración de Calendarios",
            description: "Sincroniza tu calendario personal con las tareas del proyecto.",
            stats: "Compatibilidad con Google Calendar y Outlook",
            color: "#e53e3e"
        },
        {
            id: 5,
            title: "Colaboración en Tiempo Real",
            description: "Trabaja con tu equipo en tareas y proyectos en tiempo real.",
            stats: "Más de 500 equipos colaborando",
            color: "#dd6b20"
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const cards = document.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight * 0.75;
                if (isVisible && !animatedCards.has(index)) {
                    setAnimatedCards(prev => new Set([...prev, index]));
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [animatedCards]);

    const FeatureCard = ({ feature, isSelected, onSelect, isAnimated, index }) => (
        <div
            className="feature-card"
            style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '24px',
                boxShadow: isSelected ? `0 0 0 2px ${feature.color}` : '0 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 1s ease',
                opacity: isAnimated ? 1 : 0,
                transform: isAnimated ? 'translateY(0)' : 'translateY(20px)',
                position: 'relative',
                top: 0,
            }}
            onMouseEnter={() => onSelect(feature.id)}
            onMouseLeave={() => onSelect(null)}
        >
            <div className="feature-icon" style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: `${feature.color}20`,
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 1s ease'
            }}>
                <span className="feature-icon-text" style={{
                    fontSize: '24px',
                    color: feature.color
                }}>
                    {feature.id}
                </span>
            </div>
            <h2 className="feature-title" style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '12px',
                textAlign: 'center',
                color: '#1a202c'
            }}>
                {feature.title}
            </h2>
            <p className="feature-description" style={{
                fontSize: '16px',
                color: '#4a5568',
                marginBottom: '16px',
                textAlign: 'center',
                lineHeight: '1.5'
            }}>
                {feature.description}
            </p>
            <div className="feature-stats" style={{
                fontSize: '14px',
                color: feature.color,
                textAlign: 'center',
                fontWeight: '500'
            }}>
                {feature.stats}
            </div>
        </div>
    );

    return (
        <div className="home-container">
            <Navbar />
            <main className="main-content">
                <div className="hero-section">
                    <h1 className="hero-title">
                        Gestiona tus Proyectos con Eficiencia
                    </h1>
                    <p className="hero-subtitle">
                        Una solución integral para la gestión de tareas y proyectos
                    </p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                            isSelected={selectedFeature === feature.id}
                            onSelect={setSelectedFeature}
                            isAnimated={animatedCards.has(index)}
                            index={index}
                        />
                    ))}
                </div>
            </main>
            <footer className="footer">
                <div className="footer-content">
                    <div>
                        <p className="footer-text">
                            © 2024 Task Tracker Pro - Todos los derechos reservados
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
