
import React, { useState, useEffect } from 'react';
import './App.css'; 
import axios from 'axios';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

function App() {

  const [tasks, setTasks] = useState([]);
  // To store the current count of done tasks
  const [undoneCount, setUndoneCount] = useState(
    localStorage.getItem('undoneCount') || 0
  );
  const [clearedCount, setClearedCount] = useState(
    localStorage.getItem('clearedCount') || 0
  );

  useEffect(() => {
    axios.get('http://localhost:4000/api/tasks')
      .then(res => {
        setTasks(res.data);
        updateTaskCounts(res.data);
      })
      .catch(err => {
        console.error('Error fetching tasks:', err);
      });
  }, []);

  const updateTaskCounts = (tasks) => {
    const undoneTasks = tasks.filter(task => !task.done);
    const clearedTasks = tasks.filter(task => task.done);
    setUndoneCount(undoneTasks.length);
    setClearedCount(clearedTasks.length);
  };

  const handleCheckboxChange = (id, done) => {
    axios.put(`http://localhost:4000/api/tasks/${id}`, { done: !done })
      .then(() => {
        const updatedTasks = tasks.map(task => {
          if (task.id === id) {
            return { ...task, done: !done };
          }
          return task;
        });
        setTasks(updatedTasks);
        updateTaskCounts(updatedTasks);
      })
      .catch(err => {
        console.error('Error updating task:', err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/api/tasks/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        updateTaskCounts(updatedTasks);
      })
      .catch(err => {
        console.error('Error deleting task:', err);
      });
  };

  const handleSubmit = (description) => {
    axios.post('http://localhost:4000/api/tasks', { description })
      .then(res => {
        setTasks([...tasks, res.data]);
        updateTaskCounts([...tasks, res.data]);
      })
      .catch(err => {
        console.error('Error creating task:', err);
      });
  };

  return (
    <div className="container">
      <div className="Input-container">
      What do you want to do today?
      <AddTaskForm handleSubmit={handleSubmit} />
      </div>

      <TaskList
        tasks={tasks}
        handleCheckboxChange={handleCheckboxChange}
        handleDelete={handleDelete}
      />
      <div className="counters">
        <span>{undoneCount} tasks left.</span>
        <span>Clear {clearedCount} completed task</span>
      </div>
    </div>
  );
}

export default App;
