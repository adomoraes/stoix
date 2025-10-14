import { useAuth } from '../contexts/AuthContext';
import { TaskForm } from '../components/TaskForm';
import { TaskItem } from '../components/TaskItem';

// Mock data for demonstration
const mockTasks = [
  { id: 1, title: 'Implement Bento Design', description: 'Use Tailwind CSS to create a bento box layout.', completed: true },
  { id: 2, title: 'Add Tie-Dye Gradients', description: 'Create vibrant, beautiful gradients for backgrounds.', completed: true },
  { id: 3, title: 'Create Reusable Components', description: 'Build TaskItem and TaskForm for the to-do list.', completed: false },
  { id: 4, title: 'Connect to Backend API', description: 'Fetch and persist tasks using the actual API.', completed: false },
];

export function TasksPage() {
  const { logout } = useAuth();

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
          <TaskForm />
        </div>
        <div className="lg:col-span-2">
          <div className="p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">To-Do List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTasks.map(task => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  completed={task.completed}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
