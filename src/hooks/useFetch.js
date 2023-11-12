import { useState, useEffect } from 'react'

export default function useFetch(key) {
    const [data, setData] = useState([])
    const [pending,setPending]=useState(true)
    const [error,setError]=useState(false)
    useEffect(() => {
        fetch(key)
            .then(response => response.json())
            .then(json => {
                setData(json);
                setPending(false);
            })
            .catch(error => {
                setError(true)
            });
    }, [key])
    return [data, pending,error]
}
