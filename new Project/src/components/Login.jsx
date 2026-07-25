import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { LogIn } from 'lucide-react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const login = useStore(state => state.login);
    const currentUser = useStore(state => state.currentUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate(currentUser.role === 'admin' ? '/admin' : '/user');
        }
    }, [currentUser, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
        const user = useStore.getState().currentUser;
        if (!user) {
            setError('Invalid username or password');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem' }}>
                <h1 className="page-title" style={{ marginBottom: '1rem', fontSize: '2rem' }}>Question Bank</h1>
                <p style={{ textAlign: 'center', marginBottom: '2rem', opacity: 0.8 }}>Login to continue</p>

                {error && (
                    <div style={{ background: '#ffcccc', color: 'red', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Username</label>
                        <input
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. admin"
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                        />
                    </div>
                    <button type="submit" className="btn" style={{ marginTop: '0.5rem', width: '100%' }}>
                        <LogIn size={20} /> Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
