import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const { login } = useAuth();

  return (
    <div>
      <h1>Login Page</h1>
      <p>You are not logged in.</p>
      <button onClick={login}>Log In</button>
    </div>
  );
}
