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
    const [error, setError] = useState(null);  // Añadido

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);
    
        try {
            // Realizar la solicitud al backend para login
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
    
            // Verificar si la respuesta fue exitosa
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al iniciar sesión');
            }
    
            // Extraer los datos de la respuesta
            const data = await response.json();
            const { token, user } = data;
    
            // Almacenar el token y los datos del usuario en el almacenamiento local
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
    
            // Actualizar el estado de autenticación y usuario
            setIsAuthenticated(true);
            setUser(user);
        } catch (err) {
            // Manejo de errores más detallado
            if (err.message === 'Usuario no encontrado' || err.message === 'Contraseña incorrecta') {
                setError('Usuario o contraseña incorrectos');
            } else {
                setError(err.message || 'Error al iniciar sesión');
            }
        } finally {
            // Esto siempre se ejecuta al final
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
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            login, 
            logout, 
            user, 
            isLoading, 
            error  // Añadir error al contexto
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);