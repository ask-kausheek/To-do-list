

import React, { useState } from 'react';

const AddTaskForm = ({ handleSubmit }) => {
  const [newTask, setNewTask] = useState('');

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newTask.trim() !== '') {
      handleSubmit(newTask);
      setNewTask(''); // Clear input field after adding task
    }
  };

  return (
    <div className="Task-Form">
      <input type="text" value={newTask} onChange={handleChange}  onKeyDown={handleKeyDown}style={{ width: '410px', height: '30px' }}
      /> 
    </div>
  );
};

export default AddTaskForm;
