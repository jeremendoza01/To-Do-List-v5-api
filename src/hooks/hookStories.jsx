import { useEffect, useState } from "react";
import { API_URL } from "../api";

export const hookStories = () => {
    const getStories = async () => {
        const url = `${API_URL}/stories`;


        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        });

        if (!resp.ok) throw new Error('Error al obtener las historias');

        const { data } = await resp.json();
        return data || [];  // Asegura que data siempre sea un array
    };

    const [state, setState] = useState({
        data: [],  // Data comienza como un array vacío
        loading: true
    });

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const stories = await getStories();
                setState({ data: stories, loading: false });
            } catch (err) {
                console.error('Error en fetchStories:', err);
                setState({ data: [], loading: false });
            }
        };

        fetchStories();
    }, []);

    return state;
};

export default hookStories;