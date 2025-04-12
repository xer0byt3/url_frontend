import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RedirectUrl = () => {
    const { short_id } = useParams(); // get short_id from the URL
    const hasFetched = useRef(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchLongUrl= async () => {
            try {
                const response = await axios.get(apiUrl+`api/urls/${short_id}`);
                const longUrl = response.data.url;
                console.log('Redirecting to:', longUrl);
                window.location.href = longUrl;

            } catch (error) {
                console.error('Error fetching long URL:', error);
            }
        };
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchLongUrl();
        }
        return;
    }, [short_id,apiUrl]);

    return <p>Redirecting...</p>;
};

export default RedirectUrl;
