// src/pages/Home.jsx

import Auth from '../Auth';
import { Container } from 'react-bootstrap';
import './Home.css';

const Home = () => {
    return (
        <div className="home-background">
            <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
                <h1 className="todo-title">To<span className="funky-font">DO</span></h1>
                <Auth />
            </Container>
        </div>
    );
};

export default Home;
