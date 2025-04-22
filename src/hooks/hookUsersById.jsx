import { useEffect, useState } from "react";
import { API_URL } from "../api";

export const useFetchUsersById = (usersIds) => {
    const getUsersById = async (userId) => {
        if (!userId) {
            console.error('ID de usuario inválido:', userId);
            return null;
        }
        const url = `${API_URL}/users/${userId}`;
        try {
            const resp = await fetch(url, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            const user = await resp.json();
            // console.log('Usuario obtenido:', user);
            return user;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return null;
        }
    };

    const [state, setState] = useState({
        data: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchMembers = async () => {
            if (!usersIds ||
                (typeof usersIds === 'object' && !usersIds._id && !usersIds[0]?._id)) {
                setState({ data: [], loading: false, error: null });
                return;
            }

            const idsToFetch = Array.isArray(usersIds)
                ? usersIds.map(id => id._id || id)
                : [usersIds._id || usersIds];;

            try {
                const members = await Promise.all(
                    idsToFetch.map(async (userIdToFetch) => {
                        if (userIdToFetch) {
                            const user = await getUsersById(userIdToFetch);
                            return user;
                        } else {
                            console.log("ID de usuario no válido:", userIdToFetch);
                            return null;
                        }
                    })
                );

                const filteredMembers = members.filter(member => member !== null);
                // console.log("Miembros filtrados:", filteredMembers);

                setState({
                    data: filteredMembers,
                    loading: false,
                    error: null
                });
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
                setState({ data: [], loading: false, error: error.message });
            }
        };

        fetchMembers();
    }, [usersIds]);

    return state;
};
