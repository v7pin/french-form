// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import RegistrationForm from './components/RegistrationForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/register" element={<RegistrationForm />} />
            </Routes>
        </Router>
    );
}

export default App;
