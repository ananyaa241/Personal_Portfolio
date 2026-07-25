import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import { LogOut } from 'lucide-react';

function ProtectedRoute({ children, requiredRole }) {
  const currentUser = useStore((state) => state.currentUser);

  if (!currentUser) return <Navigate to="/" replace />;
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/user'} replace />;
  }
  return children;
}

function Navbar() {
  const currentUser = useStore((state) => state.currentUser);
  const logout = useStore((state) => state.logout);

  if (!currentUser) return null;

  return (
    <nav className="navbar glass-panel container" style={{ marginBottom: '2rem', padding: '1rem 2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
        {currentUser.role === 'admin' ? 'Admin Portal' : 'Student Portal'}
      </h2>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>Welcome, <strong>{currentUser.username}</strong></span>
        <button className="btn btn-secondary" onClick={logout} style={{ padding: '0.5rem 1rem' }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
