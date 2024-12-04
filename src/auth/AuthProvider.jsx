import { useContext, createContext, useState, useEffect } from "react";
import { API_URL } from "../api";

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: false,
    login: async () => { },
    logout: () => { },
    user: null
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        // Recupera el token y los datos de usuario de localStorage al iniciar la app
        const token = localStorage.getItem('authToken');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (username, password) => {
        setIsLoading(true)
        console.log(`${API_URL}/login`); // Esto te mostrará la URL final

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error('Credenciales incorrectas');

            const { token, user } = await response.json();
            localStorage.setItem('authToken', token);  // Guarda el token en localStorage
            localStorage.setItem('user', JSON.stringify(user));  // Guarda los datos del usuario
            setIsAuthenticated(true);
            setUser(user);
        } catch (err) {
            throw new Error('Error al iniciar sesión');
        }
        finally {
            setIsLoading(false);
        }
    };


    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, isLoading }}> {/* Incluir isLoading en el contexto */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
