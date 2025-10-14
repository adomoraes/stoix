import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { TasksPage } from './pages/TasksPage';
import { PrivateRoute } from './components/PrivateRoute';

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<TasksPage />} />
        {/* Outras rotas protegidas podem ser adicionadas aqui */}
      </Route>
    </Routes>
  );
}