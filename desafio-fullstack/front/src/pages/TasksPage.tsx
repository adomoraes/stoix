import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TaskForm } from '../components/TaskForm';
import { TaskItem } from '../components/TaskItem';
import api from '../services/api';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export function TasksPage() {
  const { logout, user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const handleTaskUpdate = async (id: number, completed: boolean) => {
    const originalTasks = [...tasks];
    
    // Optimistic update
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id ? { ...task, completed } : task
      )
    );

    try {
      await api.put(`/api/tasks/${id}`, { completed });
    } catch (error) {
      console.error("Failed to update task", error);
      // Revert on error
      setTasks(originalTasks);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-purple-700 via-pink-500 to-red-500 text-white p-4 sm:p-6 lg:p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">My Tasks</h1>
        <button
          onClick={logout}
          className="px-4 py-2 text-sm font-bold bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 transition-colors"
        >
          Log Out
        </button>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TaskForm onTaskCreated={fetchTasks} />
        </div>
        <div className="lg:col-span-2">
          <div className="p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">To-Do List</h2>
            {loading ? (
              <p>Loading tasks...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tasks.length > 0 ? tasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onTaskUpdated={handleTaskUpdate}
                  />
                )) : <p>No tasks yet. Add one!</p>}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
