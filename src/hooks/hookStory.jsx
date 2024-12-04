import { useEffect, useState } from "react"


export const useFetchStoryById = (idStory) => {
    const [state, setState] = useState({
        data: null,
        loading: true
    })

    const getStoryById = async (idStory) => {
        const url = `${API_URL}/stories/${idStory}`
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            }
        })

        const { data } = await resp.json()

        return data;
    }

    useEffect(() => {
        getStoryById(idStory)
            .then(story =>
                setState({
                    data: story,
                    loading: false
                })
            )
            .catch((err) => {
                console.log(err)
                setState({
                    data: null,
                    loading: false
                })
            })
    }, [])

    return state;
}
