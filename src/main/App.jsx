import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TodoList from '../components/TodoList';
import AddTodoForm from '../components/AddTodoForm';
import './App.css';

const App = () => {

  
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const todosPerPage = 10;

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        if (Array.isArray(parsedTodos)) {
          setTodos(parsedTodos);
        } else {
          console.error("Los datos en localStorage no son válidos.");
        }
      } catch (error) {
        console.error("Error al cargar tareas de localStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      console.log("Guardando tareas en localStorage:", todos);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (task) => {
    const newTodo = { id: Date.now(), text: task, isCompleted: false };
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const toggleComplete = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.id !== id);
      const filteredTodos = updatedTodos.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const totalPagesAfterDeletion = Math.ceil(filteredTodos.length / todosPerPage);

      if (currentPage >= totalPagesAfterDeletion && currentPage > 0) {
        setCurrentPage(totalPagesAfterDeletion - 1);
      }

      return updatedTodos;
    });
  }, [currentPage, searchQuery, todosPerPage]);

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedTodos = filteredTodos.slice(
    currentPage * todosPerPage,
    (currentPage + 1) * todosPerPage
  );

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const progress =
    todos.length > 0
      ? (todos.filter((todo) => todo.isCompleted).length / todos.length) * 100
      : 0;

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.isCompleted).length;

  const generateStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.random() * 3 + 1; 
      const animationDelay = Math.random() * 5 + "s";
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: animationDelay,
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="app">
      <Header setSearchQuery={setSearchQuery} />
      <main className="container box">
        <div className="task-summary">
          <p>Total de tareas: {totalTasks}</p>
          <p>Tareas completadas: {completedTasks}</p>
        </div>

        <div id="progress-container">
          <div
            id="progress-bar"
            style={{
              width: `${progress}%`,
              backgroundColor: progress >= 50 ? 'green' : 'red',
            }}
          >
            <span id="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>

        <AddTodoForm addTodo={addTodo} />
        <TodoList
          todos={paginatedTodos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />

        {totalPages > 1 && (
          <div id="pagination">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 0}
            >
              &lt;&lt; Anterior
            </button>
            <span>
              Página {currentPage + 1} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === totalPages - 1}
            >
              Siguiente &gt;&gt;
            </button>
          </div>
        )}
      </main>
      <Footer />
      <div className="stars">{generateStars(100)}</div>
    </div>
  );
};

export default App;

