import { FaTrash, FaPencilAlt } from 'react-icons/fa';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => (
  <li className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
    <span onClick={() => toggleComplete(todo.id)} className={`todo-text ${todo.isCompleted ? 'strikethrough' : ''}`}>
      {todo.text}
      {todo.isCompleted && (
        <FaPencilAlt className="pencil-icon" />
      )}
    </span>
    <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
      <FaTrash />
    </button>
  </li>
);

export default TodoItem;




  