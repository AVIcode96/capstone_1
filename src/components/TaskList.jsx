// src/components/TaskList.jsx
import { Button, ListGroup } from 'react-bootstrap';
import Card from './Card';

const TaskList = ({ tasks = [], deleteTask, startEditing }) => {
    return (
        <ListGroup>
            {tasks.map(task => (
                <ListGroup.Item key={task.task_id}>
                    <Card>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Status: {task.status}</p>
                        <Button variant="link" onClick={() => startEditing(task)}>
                            <i className="fas fa-edit"></i>
                        </Button>
                        <Button variant="link" onClick={() => deleteTask(task.task_id)}>
                            <i className="fas fa-trash" style={{ color: 'red' }}></i>
                        </Button>
                    </Card>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default TaskList;
