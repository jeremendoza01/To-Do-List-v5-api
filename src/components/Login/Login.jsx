import './stylesLogin.css';
import { useState } from 'react';
import { useAuth } from "../../auth/AuthProvider";
import NavbarLogin from "../NavbarLogin/NavbarLogin";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Login = () => {
    const { login, error: authError, setIsLoading } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para mostrar spinner


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (!username || !password) {
            setLocalError('Por favor, completa todos los campos.');
            return;
        }

        try {
            setIsSubmitting(true); // Activar spinner
            await login(username, password);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                // Manejo específico para errores 401
                setLocalError('Usuario o contraseña incorrectos. Intenta nuevamente.');
            } else {
                setLocalError(err.message || 'Error al iniciar sesión');
            }
        } finally {
            setIsSubmitting(false); // Desactivar spinner
        }
    };

    return (
        <>
            <NavbarLogin />
            <div className='div-login'>
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className='h1-inicio'>Iniciar Sesión</h1>
                    {(localError || authError) && (
                        <p className='error'>{localError || authError}</p>
                    )}
                    <div className='div-usuario'>
                        <label>Usuario</label>
                        <input
                            className='input'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label>Contraseña</label>
                        <input
                            className='input'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className='button-submit' type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Cargando...' : 'Iniciar sesión'}
                    </button>

                    {isSubmitting && <div className="spinner">...</div>}
                </form>
            </div>
        </>
    );
};

export default Login;
