import { useEffect, useState } from "react"
import { API_URL } from "../api";

export const useFetchProjects = () => {
    const [state, setState] = useState({
        data: [],
        loading: true,
        error: null, // Agregado para manejar errores
    });

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const getProjects = async () => {
            try {
                const url = `${API_URL}/projects`;
                const resp = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!resp.ok) {
                    throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
                }
                const { data } = await resp.json();
                setState({
                    data,
                    loading: false,
                    error: null,
                });
            } catch (error) {
                console.error('Error fetching projects:', error.message);
                setState({
                    data: [],
                    loading: false,
                    error: error.message, // Guardar el error para mostrarlo
                });
            }
        };

        getProjects();
    }, []);

    return state;
};
