import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiOutlineX, HiArrowLeft } from "react-icons/hi";
import "./styles-NavBarLogged.css";

function NavbarLogged() {
    const [isSidebarOpen, setisSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleSidebar = () => {
        setisSidebarOpen(!isSidebarOpen);
    };

    const isNotHomePage = location.pathname !== "/home";

    return (
        <>
            <header className="App-header">
                <div className="div-header">
                    <HiMenu className="icon-navbar" onClick={toggleSidebar} />
                    {isNotHomePage && <HiArrowLeft className="icon-back" onClick={() => navigate(-1)} />}
                    <h1 className="logo-navbar">TASK TRACKER</h1>
                </div>
            </header>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="div-logo-sidebar">
                    <h1 className="logo-navbar">TASK TRACKER</h1>
                    <HiOutlineX className="close-btn" onClick={toggleSidebar} />
                </div>
                <nav className="nav-sidebar">
                    <div>
                        <ul className="lista-navbar">
                            <Link to="/home" className="text-lista">Home</Link>
                            <Link to="/my-projects" className="text-lista">My Projects</Link>
                            <Link to="/my-stories" className="text-lista">My Stories</Link>
                        </ul>
                    </div>
                    <div className="div-user">
                        <ul>
                            <Link to="/settings" className="text-settings">Settings</Link>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default NavbarLogged;
