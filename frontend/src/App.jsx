import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import BarberShopPage from './pages/BarberShopPage';
import RezervarePage from "./pages/ReservationPage.jsx";
import BarberHomePage from "./pages/BarberHomePage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/rezervare" element={<RezervarePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/barbershop/:id" element={<BarberShopPage />} />
                <Route path="/barber/home" element={<BarberHomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;