import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import "./LoginModal.css"

function LoginModal({ onLoginSuccess })
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) =>
    {
        e.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data =>
            {
                if (data.access_token)
                {
                    localStorage.setItem('token', data.access_token);
                    onLoginSuccess();
                } else
                {
                    setError('Invalid username or password');
                }
            })
            .catch(() => setError('An error occurred. Please try again.'));
    };

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h2>Sign in</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="button-container">
                            <button type="submit">Login</button>
                        </div>
                    </form>

                    {error && <p className="error">{error}</p>}
                </div>
            </div>
            <div>
                {error && (<Alert severity="error" className="custom-alert" onClose={() => { }}>
                    {error}
                </Alert>)}
            </div>
        </>
    );
}

export default LoginModal;
