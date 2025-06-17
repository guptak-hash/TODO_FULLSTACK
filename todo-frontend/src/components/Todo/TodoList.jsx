// src/components/Todo/TodoList.jsx
import { useTodos } from '../../hooks/useTodos';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import Card from '../UI/Card';
import Loader from '../UI/Loader';

const TodoList = () => {
   const { todos, loading, error, addTodo, removeTodo, updateTodo } = useTodos();
  if (loading && !todos.length) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="todo-container">
    
      <TodoForm onAdd={addTodo} />
        <h1>My Todos</h1>
      <div className="todo-list">
        {todos.length === 0 ? (
          <Card className="empty-state">
            <p>No todos yet. Add one to get started!</p>
          </Card>
        ) : (
          todos.map(todo => (
            <TodoItem
      key={todo._id}
      todo={todo}
      onDelete={removeTodo}
      onUpdate={updateTodo}
    />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;


