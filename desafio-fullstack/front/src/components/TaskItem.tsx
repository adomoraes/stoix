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
}

export function TaskItem({ task, onTaskUpdated }: TaskItemProps) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTaskUpdated(task.id, e.target.checked);
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg flex flex-col justify-between">
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
        <button className="text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors">Delete</button>
      </div>
    </div>
  );
}
