import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../context/AuthContext';

export function Navigation() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">Url Shortener</Navbar.Brand>
            <Nav className="me-auto">
                {isAuthenticated && <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>}
                <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav>
            <Nav>
                {isAuthenticated ? (
                    <>
                        <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                    </>
                ) : (
                    <>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link> {}
                    </>
                )}
            </Nav>
        </Navbar>
    );
}
