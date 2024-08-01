import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { Container, Row, Col, Navbar, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import fetchQuote from '../utils/fetchQuote';
import Card from '../components/Card';

const BASE_URL = 'https://26dcb711-8128-4562-903e-5e90ce17012c-00-2oc5jhzdfapax.pike.replit.dev';

const Todo = ({ profileData }) => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [quote, setQuote] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchTasks(user.uid);
            fetchQuoteData();
        }
    }, [user]);

    const fetchTasks = async (uid) => {
        try {
            const response = await axios.get(`${BASE_URL}/tasks/${uid}`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchQuoteData = async () => {
        const data = await fetchQuote();
        setQuote(data);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const addTask = async (task) => {
        try {
            const response = await axios.post(`${BASE_URL}/tasks`, task);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async (task) => {
        try {
            const response = await axios.put(`${BASE_URL}/tasks/${task.task_id}`, task);
            setTasks(tasks.map(t => (t.task_id === task.task_id ? response.data : t)));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (task_id) => {
        try {
            await axios.delete(`${BASE_URL}/tasks/${task_id}`);
            setTasks(tasks.filter(t => t.task_id !== task_id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const startEditing = (task) => {
        setEditingTask(task);
    };

    const stopEditing = () => {
        setEditingTask(null);
    };

    return (
        <Container>
            <Navbar bg="transparent" variant="dark">

                <Navbar.Brand style={{ fontSize: '2.5rem' }}>
                    <span style={{ color: 'black' }}>To</span>
                    <span className="funky-font" style={{ fontSize: '2.5rem', color: 'white' }}>Do</span>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    {profileData && profileData.profile_image_url && (
                        <Image src={profileData.profile_image_url} roundedCircle width={40} height={40} className="mr-2" />
                    )}
                    <Button variant="outline-light" style={{ marginLeft: '10px' }} onClick={() => navigate('/profile')}>Profile</Button>
                    <Button variant="outline-light" style={{ marginLeft: '10px' }} onClick={handleLogout}>Logout</Button>
                </Navbar.Collapse>

            </Navbar>
            <Row className="justify-content-md-center mt-4">
                <Col md="6">
                    {quote && (
                        <Card>
                            <p className="text-center">
                                <i className="fas fa-quote-left"></i> {quote.text} <i className="fas fa-quote-right"></i>
                            </p>
                            <p className="text-muted text-center">
                                — {quote.author || 'Unknown'}
                            </p>
                        </Card>
                    )}
                    <TaskForm addTask={addTask} updateTask={updateTask} editingTask={editingTask} stopEditing={stopEditing} />
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-4">
                <Col md="6">
                    <TaskList tasks={tasks} deleteTask={deleteTask} startEditing={startEditing} />
                </Col>
            </Row>
        </Container>
    );
};

export default Todo;
