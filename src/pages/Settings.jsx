import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import { useAuth } from "../auth/AuthProvider";
import "./styles/styles-Settings.css";

function Settings() {
    const { logout, user } = useAuth();

    const handleLogout = () => {
        if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            logout();
        }
    };

    return (
        <>
            <NavbarLogged />
            <div className="settings-container">
                {/* User Profile Section */}
                <div className="profile-section">
                    <h2 className="section-title">Perfil del Usuario</h2>
                    <div className="profile-info">
                        <p><strong>Nombre:</strong> {user.username}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="logout-section">
                    <button
                        type="button"
                        className="button logout-button"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </>
    );
}

export default Settings;
