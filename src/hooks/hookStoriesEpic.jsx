import { useEffect, useState } from "react"
import { API_URL } from "../api"

export const useFetchStoriesEpic = (epicId) => {

    const [state, setState] = useState({
        data: [],
        loading: true
    })

    const getStoriesEpic = async (epicId) => {
        const url = `${API_URL}/epics/${epicId}/stories`
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        })

        const { data } = await resp.json();
        return data;
    }


    useEffect(() => {
        if (!epicId) {
            console.error("No epicId provided!");
            return; // Termina early si no se proporciona epicId
        }
        getStoriesEpic(epicId)
            .then(epics => {
                setState({
                    data: epics,
                    loading: false
                });
            })
            .catch((err) => {
                console.error("Error fetching stories:", err);
                setState({
                    data: [],
                    loading: false
                });
            });
    }, [epicId]);

    return state;
}