import { useEffect, useState } from "react";
import axios from "axios";
import { ShortenURL } from "./ShortenUrl";
import Analytics from "./Analytics";
import { useNavigate } from 'react-router-dom';


export const Home = () => {
    const [message, setMessage] = useState('');
    const [shortId] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
            navigate('/login');
        } else {
            (async () => {
                try {
                    console.log(localStorage.getItem('access_token'));
                    const { data } = await axios.get(apiUrl+'authenticated-route', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        },
                        withCredentials: true,
                    });
                    setMessage(data.message);
                } catch (e) {
                    console.log('not auth');
                    navigate('/login');
                }
            })();
        }
    }, [navigate,apiUrl]);

    return (
        <div>
            <div className="form-signin mt-5 text-center">
                <h3>{message}</h3>
            </div>
            <ShortenURL />
            {shortId && <Analytics shortId={shortId} />} 
        </div>
    );
};
