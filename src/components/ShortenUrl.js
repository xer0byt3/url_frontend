// src/components/ShortenURL.js
import { useState } from "react";
import axios from "axios";

export const ShortenURL = () => {
    const [longURL, setLongURL] = useState('');
    const [shortURL, setShortURL] = useState('');
    const [error, setError] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl + 'api/urls/shorten', { long_url: longURL }, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
                withCredentials: true
            });

            let shortURL_parse = baseUrl + response.data.url;

            setShortURL(shortURL_parse);
            setError('');
        } catch (err) {
            setError('Error shortening URL');
            console.error(err);
        }
    };

    return (
        <div className="form-signin mt-5 text-center">
            <h3>Shorten Your URL</h3>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="form-group mt-3">
                    <input
                        className="form-control mt-1"
                        placeholder="Enter long URL"
                        type="url"
                        value={longURL}
                        onChange={(e) => setLongURL(e.target.value)}
                        required
                        style={{ width: '650px' }}
                    />
                </div>
                <div className="gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">Shorten</button>
                </div>
            </form>
            {shortURL && <div className="mt-3"><strong>Short URL:</strong> <a href={shortURL} target="_blank" rel="noopener noreferrer">{shortURL}</a></div>}
            {error && <div className="mt-3 text-danger">{error}</div>}
        </div>
    );
};
