import { useState } from 'react';
import useStore from '../store/useStore';
import { UserPlus } from 'lucide-react';

function AdminDashboard() {
    const users = useStore(state => state.users);
    const addUser = useStore(state => state.addUser);
    const modules = useStore(state => state.modules);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedModule, setSelectedModule] = useState(modules[0]);

    const handleCreateUser = (e) => {
        e.preventDefault();
        if (!username || !password) return;

        addUser({
            username,
            password,
            role: 'user',
            assignedModules: [selectedModule]
        });

        setUsername('');
        setPassword('');
    };

    return (
        <div className="container">
            <h1 className="page-title">Admin Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>

                {/* Create User Form */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <UserPlus size={24} /> Create Student
                    </h2>

                    <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Username</label>
                            <input
                                type="text"
                                className="input-field"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Assign Module</label>
                            <select
                                className="input-field"
                                value={selectedModule}
                                onChange={(e) => setSelectedModule(e.target.value)}
                            >
                                {modules.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn" style={{ marginTop: '1rem' }}>
                            Create User
                        </button>
                    </form>
                </div>

                {/* Existing Users List */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Registered Users</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {users.map(u => (
                            <div key={u.id} style={{
                                background: 'rgba(255,255,255,0.8)',
                                padding: '1rem',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <strong style={{ fontSize: '1.1rem' }}>{u.username}</strong>
                                    <span style={{ marginLeft: '1rem', color: '#666', fontSize: '0.9rem' }}>Role: {u.role}</span>
                                </div>
                                {u.role !== 'admin' && (
                                    <span style={{
                                        background: 'var(--secondary-pink)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '12px',
                                        fontSize: '0.875rem'
                                    }}>
                                        {u.assignedModules.join(', ')}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;
