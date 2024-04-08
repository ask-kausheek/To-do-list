
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, handleCheckboxChange, handleDelete }) => {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          handleCheckboxChange={handleCheckboxChange}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
