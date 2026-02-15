import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

// Imaginile
import sticker1 from '../assets/register-sticker1-removebg-preview.png';
import sticker2 from '../assets/register-sticker2-removebg-preview.png';
import sticker3 from '../assets/png-transparent-barbershop-sign-light-pole-stripes-thumbnail-removebg-preview.png';

function LoginPage() {
    const navigate = useNavigate();
    const [role, setRole] = useState('client');
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // 1. Alegem URL-ul în funcție de rol (Client sau Frizer)
        // Momentan facem doar pentru Client, frizerul urmează
        let url = '';
        if (role === 'client') {
            url = 'http://localhost:8080/api/clients/login';
        } else {
            // url = 'http://localhost:8080/api/barbers/login'; // Va urma
            alert("Logica pentru frizer nu e gata încă!");
            return;
        }

        try {
            // 2. Trimitem cererea la Backend (POST)
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials) // {email: "...", password: "..."}
            });

            // 3. Verificăm răspunsul
            if (response.ok) {
                const user = await response.json(); // Primim datele utilizatorului din Java

                console.log("Login reușit!", user);
                alert(`Bine ai venit, ${user.firstName}!`);

                // Opțional: Salvăm userul în browser ca să știm că e logat
                localStorage.setItem('user', JSON.stringify(user));

                // Navigăm la pagina principală
                navigate('/home');
            } else {
                // Răspuns 401 (Unauthorized)
                alert('❌ Email sau parolă greșită!');
            }
        } catch (error) {
            console.error("Eroare:", error);
            alert('❌ Eroare de conexiune cu serverul.');
        }
    };

    return (
        <>
            <div className={"login-page"}>
                <img src={sticker1} alt="sticker1" id="sticker1" />
                <img src={sticker2} alt="sticker2" id="sticker2" />
                <img src={sticker3} alt="sticker3" id="sticker3" />

                {/* Folosim clasa .auth-form definita in CSS */}
                <form className="auth-form" onSubmit={handleLogin}>

                    <h3 className="title">Welcome Back</h3>
                    <hr/>

                    {/* Butoanele de selectare rol */}
                    <div className="role-selector">
                        <button
                            type="button"
                            className={`role-btn ${role === 'client' ? 'active' : ''}`}
                            onClick={() => setRole('client')}
                        >
                            Client
                        </button>
                        <button
                            type="button"
                            className={`role-btn ${role === 'barber' ? 'active' : ''}`}
                            onClick={() => setRole('barber')}
                        >
                            Barber
                        </button>
                    </div>

                    <div className="form-group" style={{marginTop: '20px'}}>
                        <h4 className="subtitle">Email</h4>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <h4 className="subtitle">Password</h4>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">Login</button>

                    <div className="link-text">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginPage;