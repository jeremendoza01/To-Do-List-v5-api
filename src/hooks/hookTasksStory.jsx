import { useEffect, useState } from "react";
import { API_URL } from "../api";

export const useFetchTasksStory = (storyId) => {
    const url = `${API_URL}/stories/${storyId}/tasks`;
    const [state, setState] = useState({
        data: [],
        loading: true,
    });

    useEffect(() => {
        if (storyId) {
            // console.log('Fetching tasks for storyId:', storyId);
            fetchTasks();
        } else {
            console.warn('No storyId provided.');
        }
    }, [storyId]);


    const fetchTasks = async () => {
        setState({ data: [], loading: true });
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });

            if (!response.ok) {
                console.error(`Error HTTP: ${response.status}`);
                setState({ data: [], loading: false });
                return;
            }

            const result = await response.json();
            setState({ data: result.data || [], loading: false });
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setState({ data: [], loading: false });
        }
    };
    return {
        data: state.data,
        loading: state.loading,
        refetch: fetchTasks,
    };
};


