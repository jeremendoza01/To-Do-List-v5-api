import { useState } from 'react';
import { HiOutlineHome } from "react-icons/hi";
import { Link } from "react-router-dom"

import "./styles.css"
function NavbarLogin() {

    const [isSidebarOpen, setisSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setisSidebarOpen(!isSidebarOpen)
    }

    return (
        <>
            <header className="App-header">
                <div className="div-header">
                    <Link to={"/home"}><HiOutlineHome className='icon-home' /></Link>
                    <h1 className='logo-navbar'>TASK TRACKER</h1>
                </div>
            </header>

        </>

    );
}
export default NavbarLogin;