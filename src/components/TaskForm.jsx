// src/components/TaskForm.jsx
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import Card from './Card';

const TaskForm = ({ addTask, updateTask, editingTask, stopEditing }) => {
    const { user } = useAuth();
    const [task, setTask] = useState({
        firebase_user_id: user ? user.uid : '',
        title: '',
        description: '',
        due_date: '',
        priority: 'Low',
        status: 'Pending'
    });

    useEffect(() => {
        if (editingTask) {
            setTask(editingTask);
        } else {
            setTask({
                firebase_user_id: user ? user.uid : '',
                title: '',
                description: '',
                due_date: '',
                priority: 'Low',
                status: 'Pending'
            });
        }
    }, [editingTask, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTask) {
            updateTask(task);
        } else {
            addTask(task);
        }
        stopEditing();
        setTask({
            firebase_user_id: user ? user.uid : '',
            title: '',
            description: '',
            due_date: '',
            priority: 'Low',
            status: 'Pending'
        });
    };

    return (
        <Card>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Description"
                        value={task.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="due_date"
                        value={task.due_date}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Priority</Form.Label>
                    <Form.Control
                        as="select"
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </Form.Control>
                </Form.Group>
                <div className="d-flex mt-3">
                    <Button variant="primary" type="submit">
                        {editingTask ? 'Update Task' : 'Add Task'}
                    </Button>
                    {editingTask && (
                        <Button variant="secondary" onClick={stopEditing} style={{ marginLeft: '10px' }}>
                            Cancel
                        </Button>
                    )}
                </div>
            </Form>
        </Card>
    );
};

export default TaskForm;
