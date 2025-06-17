


// src/components/Todo/TodoItem.jsx
import { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({
    title: todo.title,
    description: todo.description,
    status: todo.status
  });
console.log('todo inside TodoItem >> ',todo)
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo._id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTodo({
      title: todo.title,
      description: todo.description,
      status: todo.status
    });
  };

  const handleSave = async () => {
    try {
      await onUpdate(todo._id, {
        title: editedTodo.title,
        description: editedTodo.description
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleStatusToggle = async () => {
    try {
      await onUpdate(todo._id, {
        status: todo.status === 'Pending' ? 'Completed' : 'Pending'
      });
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className={`todo-item ${todo.status.toLowerCase()}`}>
      {isEditing ? (
        <div className="todo-edit-form">
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={editedTodo.title}
              onChange={handleChange}
              className="todo-edit-input"
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              value={editedTodo.description}
              onChange={handleChange}
              className="todo-edit-textarea"
              rows="3"
            />
          </div>
          <div className="todo-edit-actions">
            <Button 
              variant="secondary" 
              size="small"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              size="small"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <>
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
              variant={todo.status === 'Pending' ? 'success' : 'warning'}
              size="small"
              onClick={handleStatusToggle}
            >
              {todo.status === 'Pending' ? 'Mark Complete' : 'Mark Pending'}
            </Button>
            <Button 
              variant="info" 
              size="small"
              onClick={handleEdit}
            >
              Edit
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
        </>
      )}
    </Card>
  );
};

export default TodoItem;