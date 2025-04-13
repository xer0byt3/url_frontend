import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Analytics.css';
import { useNavigate } from 'react-router-dom';

const Analytics = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const baseUrl = process.env.REACT_APP_BASE_URL;


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    navigate('/login');
                }

                const response = await axios.get(apiUrl + 'api/analytics', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                setData(response.data);
            } catch (error) {

                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [navigate, apiUrl]);

    const handleDelete = async (short_id) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(apiUrl + `api/urls/${short_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setData(data.filter(item => item.short_id !== short_id));
        } catch (error) {
            console.error('Error deleting URL:', error);
        }
    };

    return (
        <div className="analytics-container">
            <h1>Analytics</h1>
            <table>
                <thead>
                    <tr>
                        <th>Short URL</th>
                        <th>Long URL</th>
                        <th>Click Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.short_id}>
                            <td>{baseUrl + `${item.short_id}`}</td>
                            <td>{item.long_url}</td>
                            <td>{item.click_count}</td>
                            <td>
                                <button onClick={() => handleDelete(item.short_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Analytics;
