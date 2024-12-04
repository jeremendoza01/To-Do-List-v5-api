import { useEffect, useState } from 'react';

function hookFetch(url, option) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, option)
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [url, option])

    return { data, loading, error };
}

export default hookFetch;
