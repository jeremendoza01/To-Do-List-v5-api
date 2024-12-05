import { useEffect, useState } from "react";
import { API_URL } from "../api";

export const hookStories = () => {
    const getStories = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Token de autenticación no disponible');
        }
    
        const url = `${API_URL}/stories`;
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    
        if (!resp.ok) {
            const errorText = await resp.text();
            throw new Error(`Error al obtener las historias: ${errorText}`);
        }
    
        const { data } = await resp.json();
        return data || [];
    };
    

    const [state, setState] = useState({
        data: [],
        loading: true,
        error: null,
    });
    
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const stories = await getStories();
                // console.log("Fetched stories:", stories);
                setState({ data: stories, loading: false, error: null });
            } catch (err) {
                console.error("Error en fetchStories:", err);
                setState({ data: [], loading: false, error: err.message });
            }
        };
    
        fetchStories();
    }, []);
    

    return state;
};

export default hookStories;