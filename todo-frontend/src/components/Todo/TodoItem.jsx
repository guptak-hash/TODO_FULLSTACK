// src/components/Todo/TodoItem.jsx
import { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo._id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className={`todo-item ${todo.status === 'Completed' ? 'completed' : ''}`}>
      <div className="todo-content">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <div className="todo-meta">
          <span className={`status-badge ${todo.status.toLowerCase()}`}>
            {todo.status}
          </span>
        </div>
      </div>
      <div className="todo-actions">
        <Button 
          variant="secondary" 
          size="small"
          onClick={() => onToggle(todo._id)}
        >
          {todo.status === 'Pending' ? 'Complete' : 'Undo'}
        </Button>
        <Button 
          variant="danger" 
          size="small"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Card>
  );
};

export default TodoItem;