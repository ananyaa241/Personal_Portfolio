import { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { exportToDocx } from '../utils/exportToDocx';
import { Plus, Minus, FileDown, BookOpen } from 'lucide-react';
import { fetchQuestionsFromGroq } from '../utils/groqClient';
import Chatbot from './Chatbot';

function UserDashboard() {
    const currentUser = useStore(state => state.currentUser);

    const [selectedModule, setSelectedModule] = useState(null);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [dynamicQuestions, setDynamicQuestions] = useState([]);
    const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

    // Default to first module if none selected but available
    if (!selectedModule && currentUser?.assignedModules.length > 0) {
        setSelectedModule(currentUser.assignedModules[0]);
    }

    useEffect(() => {
        const loadQuestions = async () => {
            if (!selectedModule) return;
            setIsLoadingQuestions(true);
            try {
                const qs = await fetchQuestionsFromGroq(selectedModule);
                setDynamicQuestions(qs);
            } catch (error) {
                console.error("Error loading questions", error);
            } finally {
                setIsLoadingQuestions(false);
            }
        };
        loadQuestions();
    }, [selectedModule]);

    const moduleQuestions = dynamicQuestions;

    const handleAddQuestion = (q) => {
        if (!selectedQuestions.find(sq => sq.id === q.id)) {
            setSelectedQuestions([...selectedQuestions, q]);
        }
    };

    const handleRemoveQuestion = (id) => {
        setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
    };

    const handleExport = () => {
        exportToDocx(selectedQuestions, `${selectedModule} Question Paper`);
    };

    return (
        <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* Left Panel: Modules & Questions */}
                <div>
                    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <BookOpen size={24} /> Assigned Modules
                        </h2>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {currentUser.assignedModules.map(m => (
                                <button
                                    key={m}
                                    className={`btn ${selectedModule === m ? '' : 'btn-secondary'}`}
                                    onClick={() => setSelectedModule(m)}
                                >
                                    {m}
                                </button>
                            ))}
                            {currentUser.assignedModules.length === 0 && (
                                <p>No modules assigned yet.</p>
                            )}
                        </div>
                    </div>

                    {selectedModule && (
                        <div className="glass-panel" style={{ padding: '2rem' }}>
                            <h2 style={{ marginBottom: '1.5rem' }}>Questions - {selectedModule}</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {isLoadingQuestions ? (
                                    <div style={{ padding: '2rem', textAlign: 'center', fontStyle: 'italic', opacity: 0.7 }}>
                                        Loading interesting questions from AI...
                                    </div>
                                ) : (
                                    moduleQuestions.map((q, i) => {
                                        const isSelected = selectedQuestions.some(sq => sq.id === q.id);
                                        return (
                                            <div key={q.id} style={{
                                                background: isSelected ? 'rgba(255,182,193, 0.4)' : 'rgba(255,255,255,0.8)',
                                                padding: '1rem 1.5rem',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                transition: 'all 0.3s'
                                            }}>
                                                <span style={{ fontSize: '1.1rem' }}>{i + 1}. {q.text}</span>
                                                <button
                                                    className="btn-icon"
                                                    onClick={() => isSelected ? handleRemoveQuestion(q.id) : handleAddQuestion(q)}
                                                    style={{ border: 'none', cursor: 'pointer' }}
                                                    title={isSelected ? "Remove from preview" : "Add to preview"}
                                                >
                                                    {isSelected ? <Minus size={18} /> : <Plus size={18} />}
                                                </button>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel: Preview & Export */}
                <div className="glass-panel" style={{ padding: '2rem', alignSelf: 'start', position: 'sticky', top: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>Test Preview</h2>
                        <span style={{ background: 'var(--dark-text)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>
                            {selectedQuestions.length} Qs
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '50vh', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                        {selectedQuestions.length === 0 ? (
                            <p style={{ opacity: 0.6, fontStyle: 'italic', textAlign: 'center', padding: '2rem 0' }}>
                                Click "+" on questions to add them here.
                            </p>
                        ) : (
                            selectedQuestions.map((q, i) => (
                                <div key={q.id} style={{ background: 'rgba(255,255,255,0.6)', padding: '0.75rem', borderRadius: '6px', display: 'flex', gap: '0.5rem' }}>
                                    <strong>{i + 1}.</strong> {q.text}
                                </div>
                            ))
                        )}
                    </div>

                    <button
                        className="btn"
                        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                        disabled={selectedQuestions.length === 0}
                        onClick={handleExport}
                    >
                        <FileDown size={20} /> Export to DOCX
                    </button>
                </div>

            </div>

            <Chatbot />
        </div>
    );
}

export default UserDashboard;
