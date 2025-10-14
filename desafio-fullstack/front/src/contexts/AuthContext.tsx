import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

// Define the User type based on Laravel's default User model
interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // On component mount, check if user is already authenticated
  useEffect(() => {
    api.get('/api/user')
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  async function login(credentials: { email: string; password: string }) {
    // CSRF cookie request
    await api.get('/sanctum/csrf-cookie');
    
    const response = await api.post('/api/login', credentials);
    setUser(response.data);
    navigate('/');
  }

  async function logout() {
    try {
      await api.post('/api/logout');
    } catch (error) {
      console.error("Logout failed, but clearing session locally.", error);
    } finally {
      setUser(null);
      navigate('/login');
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
