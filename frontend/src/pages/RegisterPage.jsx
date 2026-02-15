import { useState } from 'react';
import './RegisterPage.css'; // Importăm stilurile de mai sus
import sticker1 from '/src/assets/register-sticker1-removebg-preview.png'
import sticker2 from '/src/assets/register-sticker2-removebg-preview.png'
import sticker3 from '/src/assets/png-transparent-barbershop-sign-light-pole-stripes-thumbnail-removebg-preview.png'

function RegisterPage() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('✅ Cont creat cu succes! Verifică baza de date.');
                setFormData({ firstName: '', lastName: '', email: '', password: '', phoneNumber: '' });
            } else {
                alert('❌ Eroare: Email-ul există deja sau datele sunt invalide.');
            }
        } catch (error) {
            alert('❌ Eroare de conexiune cu serverul.');
        }
    };


    return (
        <>
            <div className={"register-page"}>
                <img src={sticker1} alt="sticker1" id="sticker1" />
                <img src={sticker2} alt="sticker2" id="sticker2" />
                <img src={sticker3} alt="sticker3" id="sticker3" />

                <form onSubmit={handleSubmit}>
                    <h3 className={"title"}>Register Page</h3>
                    <hr/>

                    <div className="form-group">
                        <h4 className={"subtitle"}>First name</h4>
                        <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <h4 className={"subtitle"}>Last name</h4>
                        <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <h4 className={"subtitle"}>Email</h4>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <h4 className={"subtitle"}>Password</h4>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <h4 className={"subtitle"}>Phone number</h4>
                        <input type="tel" name="phoneNumber" placeholder="Phone number" value={formData.phoneNumber} onChange={handleChange} required/>
                    </div>

                    <button type="submit">Sign up</button>
                </form>
            </div>
        </>
    );
}

export default RegisterPage;