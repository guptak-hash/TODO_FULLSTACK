// src/components/Todo/TodoForm.jsx
import { useState } from 'react';
import Button from '../UI/Button';

const TodoForm = ({ onAdd }) => {
  // console.log('onAdd >> ',onAdd)
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    status: 'Pending'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.title.trim()) return;
    
    setIsSubmitting(true);
    try {
      console.log('todo inside TodoForm>> ',todo)
      await onAdd(todo);
      setTodo({
        title: '',
        description: '',
        status: 'Pending'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Description (optional)"
          value={todo.description}
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          rows="3"
        />
      </div>
      <Button 
        type="submit" 
        variant="primary"
        disabled={isSubmitting || !todo.title.trim()}
      >
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </Button>
    </form>
  );
};

export default TodoForm;