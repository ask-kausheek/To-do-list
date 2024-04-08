import React , { useState } from 'react';
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const TaskItem = ({ task, handleCheckboxChange, handleDelete }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  // Handle over-flowed task length
  const truncateDescription = (description, max_length = 40) => {
    if (description.length <= max_length) {
      return description;
    } else {
      return description.slice(0, max_length) + '...'; // Append ... if length is too big
    }
  };
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
          <span
          className={task.done ? 'completed' : ''}
          title={task.description}
          onMouseEnter={toggleDescription}
          onMouseLeave={toggleDescription}
          style={{ wordWrap: 'break-word'}}
          >
            {truncateDescription(task.description)}
        </span>
        </div>

        <div className="TaskList-delete"><FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(task.id)} /></div>
      </div>
      
  
  );
};

export default TaskItem;
