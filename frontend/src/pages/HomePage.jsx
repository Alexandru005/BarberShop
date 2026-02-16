import { useState, useEffect } from 'react'; // 1. Importăm hook-urile
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import image from '../assets/barber-shop-design-with-skull-beard-hair-and-razor-design-element-for-logo-poster-card-banner-emblem-t-shirt-illustration-vector.jpg';

function HomePage() {
    // 2. Starea pentru lista de frizerii (inițial e goală)
    const [barbershops, setBarbershops] = useState([]);
    const navigate = useNavigate();

    // 3. Cerem datele de la Backend când intrăm pe pagină
    useEffect(() => {
        // Presupunem că endpoint-ul tău este /api/barbershops
        fetch('http://localhost:8080/api/barbershops')
            .then(res => res.json())
            .then(data => {
                console.log("Date primite:", data); // Pentru debugging
                setBarbershops(data);
            })
            .catch(err => console.error("Eroare la fetch:", err));
    }, []); // [] înseamnă că rulează o singură dată la început

    const handleShowMore = (id) => {
        // Navigăm către o rută dinamică: /barbershop/1, /barbershop/2 etc.
        navigate(`/barbershop/${id}`);
    };

    return (
        <div className="home-page">
            <h1 className="title">💈 Welcome to BarberShop 💈</h1>
            <p className="quote">,,Our mission is to make sure you find the best barbers."</p>

            <ul className="list-barbershops">
                {/* 4. Folosim .map() pentru a genera HTML pentru fiecare frizerie */}
                {barbershops.map((shop) => (
                    <li className="barbershop" key={shop.id}>
                        {/* Momentan folosim imaginea statică pentru toate */}
                        <img src={image} alt="Barber Logo"/>

                        <div className="data-info">
                            {/* Ai grijă ca numele câmpurilor (name, location) să fie la fel ca în Java */}
                            <p className="name">{shop.name}</p>
                            <p className="address">{shop.address}</p>
                        </div>

                        <button onClick={() => handleShowMore(shop.id)}>
                            Show more
                        </button>
                    </li>
                ))}

                {/* Dacă lista e goală, afișăm un mesaj */}
                {barbershops.length === 0 && <p style={{color: 'white'}}>Nu s-au găsit frizerii...</p>}
            </ul>
        </div>
    );
}

export default HomePage;