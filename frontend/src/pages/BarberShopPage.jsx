import './BarberShopPage.css';
import patern from '../assets/background-vintage-barbershop-with-diagonal-colored-stripes-illustration-vector.jpg';
import profile from '../assets/0921fc87aa989330b8d403014bf4f340.jpg';

import star1 from '../assets/1-star.png';
import star2 from '../assets/2-star.png';
import star3 from '../assets/3-star.png';
import star4 from '../assets/4-star.png';
import star5 from '../assets/5-star.png';

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BarberShopPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [shop, setShop] = useState(null);
    const [services, setServices] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReviewText, setNewReviewText] = useState("");
    const [newReviewRating, setNewReviewRating] = useState(5);

    useEffect(() => {
        fetch(`http://localhost:8080/api/barbershops/${id}`)
            .then(res => {
                if(!res.ok) throw new Error("Eroare la gasirea frizeriei");
                return res.json();
            })
            .then(data => {
                console.log("Date primite: ", data);
                setShop(data);
                setServices(data.services || []);
                setBarbers(data.barbers || []);
                setReviews(data.reviews || []);
            })
            .catch(err => console.error(err));
    }, [id]);

    // Opresc afișarea până nu vin datele de la backend
    if (!shop) return <h1 style={{color: 'white', textAlign: 'center'}}>Se încarcă...</h1>;

    // Funcția care se apelează când apeși "Trimite" la formularul de recenzii
    const handleAddReview = () => {
        // 1. Luăm datele user-ului exact cum le-ai salvat în LoginPage
        const userString = localStorage.getItem('user');

        // Verificăm dacă există cineva logat
        if (!userString) {
            alert("Trebuie să fii logat pentru a lăsa o recenzie!");
            return;
        }

        // Transformăm textul din localStorage înapoi într-un obiect JS
        const currentUser = JSON.parse(userString);

        // Verificăm dacă a scris ceva în caseta de text
        if (newReviewText.trim() === "") {
            alert("Te rog să scrii un comentariu!");
            return;
        }

        // 2. Construim pachetul de date pentru Spring Boot
        const reviewData = {
            text: newReviewText,
            rating: newReviewRating,
            barberShop: { id: id }, // id-ul este scos din URL (prin useParams)
            client: { id: currentUser.id } // ID-ul real al celui logat
        };

        // 3. Facem cererea POST către Backend
        fetch('http://localhost:8080/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => {
                if (!res.ok) throw new Error("Eroare la adăugarea recenziei");
                return res.json();
            })
            .then(data => {
                // 4. Afișăm instant pe ecran (Forțăm firstName-ul pentru siguranță vizuală)
                const newReviewForDisplay = {
                    ...data,
                    client: { firstName: currentUser.firstName }
                };

                // Punem noua recenzie la finalul listei existente
                setReviews([...reviews, newReviewForDisplay]);

                // 5. Curățăm formularul ca să fie gol data viitoare când îl deschide
                setNewReviewText("");
                setNewReviewRating(5);
                setShowReviewForm(false);
            })
            .catch(err => {
                console.error(err);
                alert("A apărut o eroare la trimiterea recenziei.");
            });
    };

    return (
        <div className="barbershop-page">
            <img src={patern} className="barbershop-page-patern" alt="Patern" />
            <h1 className="title">{shop.name}</h1>

            {/* --- SERVICES --- */}
            <h1 className="title-service">Services</h1>
            <div className="barbershop-page-services">

                {services.length === 0 && <p>Nu există servicii adăugate.</p>}

                {services.map((service, index) => (
                    <div className="barbershop-page-service-card" key={index}>
                        <h2 className="service-name">
                            {service.name} - <span className="service-price">{service.price}<sup><small>00</small></sup>Lei</span>
                        </h2>
                        <p className="service-duration">{service.durationMinutes} min.</p>
                        <ul className="service-description">
                            {service.description
                                ? service.description.split(',').map((detaliu, i) => (
                                    /* Folosim .trim() ca să ștergem spațiile goale de la începutul cuvântului */
                                    <li key={i}>{detaliu.trim()}</li>
                                ))
                                : <li>Detalii serviciu</li>
                            }
                        </ul>
                    </div>
                ))}
            </div>

            {/* --- BARBERS --- */}
            <h1 className="title-service">Our Barbers</h1>
            <div className="barbershop-page-barbers">
                <ul>
                    {barbers.length === 0 && <p>Nu există frizeri adăugați.</p>}

                    {barbers.map((barber) => (
                        <li key={barber.id}>
                            <img src={profile} alt="profile-pic"/>
                            <h3>{barber.firstName} {barber.lastName}</h3>
                            <button onClick={() => navigate(`/rezervare?barberId=${barber.id}&shopId=${id}`)}>
                                Rezerva acum
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* --- REVIEWS --- */}
            <h1 className="title-review">Reviews</h1>
            <div className="container-reviews">
                <ul className="review-list">

                    {reviews.length === 0 && <p style={{textAlign: 'center'}}>Nu există recenzii.</p>}

                    {reviews.map((review, index) => {
                        // Logica pentru a alege imaginea cu stele corectă
                        let starImg = star5;
                        if(review.rating === 4) starImg = star4;
                        if(review.rating === 3) starImg = star3;
                        if(review.rating === 2) starImg = star2;
                        if(review.rating === 1) starImg = star1;

                        return (
                            <li className="review-item" key={index}>
                                <div className="user-review">
                                    <h3>{review.client?.firstName || review.client?.clientName || "Client Anonim"}</h3>
                                    <img src={starImg} alt={`${review.rating} stele`}/>
                                </div>
                                <p>{review.text}</p>
                            </li>
                        );
                    })}
                </ul>

                {/* Butonul care deschide formularul */}
                <div style={{textAlign: 'center', marginBottom: '20px'}}>
                    <button
                        className="add-review-btn"
                        onClick={() => setShowReviewForm(!showReviewForm)}
                    >
                        {showReviewForm ? "✖ Anulează" : "✍️ Adaugă Review"}
                    </button>
                </div>

                {/* Formularul (Apare doar dacă showReviewForm este true) */}
                {showReviewForm && (
                    <div className="review-form-box">
                        <textarea
                            placeholder="Cum a fost experiența ta?"
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                        />
                        <div className="form-controls">
                            <select
                                value={newReviewRating}
                                onChange={(e) => setNewReviewRating(Number(e.target.value))}
                            >
                                <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                                <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                                <option value={3}>⭐⭐⭐ (3/5)</option>
                                <option value={2}>⭐⭐ (2/5)</option>
                                <option value={1}>⭐ (1/5)</option>
                            </select>
                            <button className="submit-review-btn" onClick={handleAddReview}>
                                Trimite
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default BarberShopPage;