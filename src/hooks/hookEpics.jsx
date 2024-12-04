import { useState, useEffect } from "react";
import { API_URL } from "../api"
export const useFetchEpics = (projectId) => {

    const getEpics = async (projectId) => {
        const url = `${API_URL}/projects/${projectId}/epics`

        const resp = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        });

        if (!resp.ok) {
            throw new Error(`Error: ${resp.status}`);
        }

        const { data } = await resp.json();
        return data;
    };

    const [state, setState] = useState({
        data: [],
        loading: true
    });

    useEffect(() => {
        if (projectId) {
            getEpics(projectId)
                .then(epics => {
                    setState({
                        data: epics,
                        loading: false
                    });
                })
                .catch((err) => {
                    console.log(err);
                    setState({
                        data: [],
                        loading: false
                    });
                });
        } else {
            setState({
                data: [],
                loading: false
            });
        }
    }, [projectId]); // Agregado projectId como dependencia

    return state;
};
