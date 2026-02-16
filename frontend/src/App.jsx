import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import BarberShopPage from './pages/BarberShopPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. Când deschizi site-ul (path="/"), te duce direct la LOGIN */}
                <Route path="/" element={<LoginPage />} />

                {/* 2. Dacă dai click pe "Creează cont", te duce la REGISTER */}
                <Route path="/register" element={<RegisterPage />} />

                {/* 3. După ce dai Login cu succes, te duce la HOME */}
                <Route path="/home" element={<HomePage />} />

                {/* AICI E MAGIA: ":id" este o variabilă.
                Orice pui după /barbershop/ va fi capturat ca "id".*/}
                <Route path="/barbershop/:id" element={<BarberShopPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;