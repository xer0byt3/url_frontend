import { ShortenURL } from "./ShortenUrl";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const { isAuthenticated, loading } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        const token = localStorage.getItem('access_token');
        if (!token) {
            console.log("no token");
            navigate('/login');
        }
        if (!isAuthenticated) {
            console.log("not authenticated");
            navigate('/login');
        }
    }
        , [navigate, isAuthenticated, loading]);

    return (
        <div>
            <ShortenURL />
        </div>
    );
};
