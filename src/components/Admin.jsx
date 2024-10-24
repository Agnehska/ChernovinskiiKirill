import React, { useState } from 'react';
import AdminPanel from './AdminPanel'; 


const Admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); 
    
    const handleLogin = () => {
        if (email === 'admin@shop.ru' && password === 'QWEasd123') {
            setIsAdminLoggedIn(true); 
            
        } else {
            alert('Неверный email или пароль');
        }
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
            <button onClick={handleLogin}>Войти</button>
            {isAdminLoggedIn && <AdminPanel />} 
            
        </div>
    );
};

export default Admin;
