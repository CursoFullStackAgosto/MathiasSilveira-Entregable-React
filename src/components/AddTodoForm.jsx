import { useState } from 'react';

const AddTodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" disabled={!task.trim()}>
        Agregar 
      </button>
    </form>
  );
};

export default AddTodoForm;
