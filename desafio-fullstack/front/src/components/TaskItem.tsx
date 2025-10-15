import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (id: number, completed: boolean) => void;
  onDeleteRequested: (task: Task) => void;
  isDeleting: boolean;
}

export function TaskItem({ task, onTaskUpdated, onDeleteRequested, isDeleting }: TaskItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTaskUpdated(task.id, e.target.checked);
  };

  const handleDeleteClick = () => {
    onDeleteRequested(task);
  };

  const animationClasses = isDeleting
    ? 'opacity-0 -translate-y-full scale-50'
    : 'opacity-100 translate-y-0 scale-100';

  return (
    <div
      className={`p-6 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg flex flex-col justify-between transition-all duration-500 ease-in-out ${animationClasses}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-bold text-white ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </h3>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
            className="form-checkbox h-6 w-6 text-purple-500 bg-white/20 border-transparent rounded-md focus:ring-0 cursor-pointer"
          />
        </div>
        <p className={`text-white/80 ${task.completed ? 'line-through' : ''}`}>
          {task.description}
        </p>
      </div>
      <div className="flex items-center justify-end gap-x-4 mt-6">
        <button className="text-sm font-medium text-white/70 hover:text-white transition-colors">Edit</button>
        <button onClick={handleDeleteClick} className="text-pink-400 hover:text-pink-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
