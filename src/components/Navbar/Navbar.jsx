import { useState } from 'react';
import { Link } from "react-router-dom"
import { HiMenu } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";

import "./styles.css"

function Navbar() {

    const [isSidebarOpen, setisSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setisSidebarOpen(!isSidebarOpen)
    }

    return (
        <>
            <header className="App-header">
                <div className="div-header">
                    <HiMenu className='icon-navbar' onClick={toggleSidebar} />
                    <h1 className='logo-navbar'>TASK TRACKER</h1>
                    <Link to={"/login"} className='text-login'>Login</Link>
                </div>
            </header>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className='div-logo-sidebar'>
                    <h1 className="logo-navbar">TASK TRACKER</h1>
                    <HiOutlineX className='close-btn' onClick={toggleSidebar} />
                </div>
                <nav className='nav-sidebar'>
                    <div>
                        <ul className='lista-navbar'>
                            <Link to={"/home"} className='text-lista' >Home</Link>
                            <Link to={"/my-projects"} className='text-lista' >My Proyects</Link>
                            <Link to={"/my-stories"} className='text-lista'>My Stories</Link>
                        </ul>
                    </div>

                    <div className='div-user'>
                        <ul >
                            <Link to={"/settings"} className='text-settings' >Settings</Link>
                        </ul>
                    </div>
                </nav>
            </div >
        </>

    );
}
export default Navbar