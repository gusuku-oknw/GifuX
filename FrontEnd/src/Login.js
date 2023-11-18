import React, { useState } from 'react';
import { Div, Input, Button, Anchor } from 'atomize';
import { SuccessNotification, WarningNotification, InfoNotification, AlertNotification } from './Notification';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!username || !password) {
            setErrorMessage('Username and Password are required');
            setShowAlert(true);
            return;
        }
        setErrorMessage('');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // ログイン成功時の処理をここに書く
                setNotificationMessage("ログインしました")
                onLoginSuccess();
            } else {
                // レスポンスがOKでない場合のエラー処理
                setErrorMessage('Login failed. Please check your credentials.');
                setShowWarning(true);
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('An error occurred while logging in.');
            setShowAlert(true);
        }
    };

    return (
        <Div p="2rem" d="flex" flexDir="column" align="center">
            <Div m={{ b: "1rem" }} textAlign="center">
                <h2>Login</h2>
            </Div>
            {errorMessage && <Div textColor="danger700">{errorMessage}</Div>}
            <form onSubmit={handleSubmit}>
                <Input
                    m={{ b: "1rem" }}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleInputChange}
                />
                <Input
                    m={{ b: "1rem" }}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleInputChange}
                />
                <Button type="submit" w="100%">Login</Button>
            </form>
            <Anchor href="#" m={{ t: "1rem" }}>Forgot password?</Anchor>
            <SuccessNotification message={notificationMessage} isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
            <AlertNotification message={errorMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
            <WarningNotification message={errorMessage} isOpen={showWarning} onClose={() => setShowWarning(false)} />
        </Div>
    );
}

export default Login;
