// src/Auth.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './utils/firebaseConfig';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'https://ccf06c66-0aa3-4566-95c1-d05bf3374568-00-3p0mstsniszcg.riker.replit.dev';

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const { uid } = userCredential.user;
                await axios.post(`${BASE_URL}/signup`, {
                    firebase_user_id: uid,

                    email: email,
                    profile_image_url: 'https://example.com/default-profile-image.jpg'
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate('/todo');
        } catch (error) {
            console.error('Error during authentication', error);
        }
    };

    return (
        <Card className="shadow p-3 mb-5 bg-white rounded" style={{ width: '100%', maxWidth: '400px' }}>
            <Card.Body>
                <h2 className="text-center mb-4">{isRegister ? 'Register' : 'Login'}</h2>
                <Form onSubmit={handleAuth}>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        {isRegister ? 'Register' : 'Login'}
                    </Button>
                    <Button variant="link" onClick={() => setIsRegister(!isRegister)} className="w-100 mt-2">
                        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Auth;
