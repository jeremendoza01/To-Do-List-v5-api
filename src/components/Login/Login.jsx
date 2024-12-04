import './stylesLogin.css';
import { useState } from 'react';
import { useAuth } from "../../auth/AuthProvider";
import NavbarLogin from "../NavbarLogin/NavbarLogin"
const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            setError('');
        } catch (err) {
            setError('Error al iniciar sesión. Por favor verifica tus credenciales.');
        }
    };

    return (
        <>
            <NavbarLogin />
            <div className='div-login' >
                <form className="form" onSubmit={handleSubmit}>
                    <h1 className='h1-inicio'>Iniciar Sesion</h1>
                    {error && <p className='error'>{error}</p>}
                    <div className='div-usuario'>
                        <label >Usuario</label>
                        <input
                            className='input'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}

                        />

                        <label >Contraseña</label>
                        <input
                            className='input'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>

                    <button className='button-submit' type='submit' >
                        Iniciar sesion
                    </button>
                </form>

            </div>
        </>
    );

};

export default Login;
