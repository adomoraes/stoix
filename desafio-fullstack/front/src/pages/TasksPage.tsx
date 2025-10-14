import { useAuth } from '../contexts/AuthContext';

export function TasksPage() {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Tasks Page</h1>
      <p>Welcome! You are logged in.</p>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}
