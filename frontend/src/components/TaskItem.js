import React from 'react';
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const TaskItem = ({ task, handleCheckboxChange, handleDelete }) => {
  return (
    
      <div className="TaskList-item">
        <div className="TaskList-checkbox">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => handleCheckboxChange(task.id, task.done)}
        />
        </div>
        
        <div className="task-text">
          <span className={task.done ? 'completed' : ''}>{task.description}</span>
        </div>

        <div className="TaskList-delete"><FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(task.id)} /></div>
      </div>
      
  
  );
};

export default TaskItem;
