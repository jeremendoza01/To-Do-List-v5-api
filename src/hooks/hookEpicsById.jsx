import { useState, useEffect } from "react";
import { API_URL } from "../api"

export const useFetchEpicsById = (epicId) => {

    const getEpicsById = async (epicId) => {
        const url = `${API_URL}/epics/${epicId}`

        try {
            const resp = await fetch(url, {
                method: 'GET',
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

        } catch (error) {
            console.error("Error fetching epics:", error);
            throw error;
        }
    }


    const [state, setState] = useState({
        data: [],
        loading: true
    })

    useEffect(() => {
        getEpicsById(epicId)
            .then(epic => {
                setState({
                    data: epic,
                    loading: false
                })
            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false
                })
            })
    }, [])


    return state;
}