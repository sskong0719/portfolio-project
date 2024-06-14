import React, { useState } from 'react';

function LoginModal({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                onLoginSuccess();
            } else {
                setError('Invalid username or password');
            }
        })
        .catch(() => setError('An error occurred. Please try again.'));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;
