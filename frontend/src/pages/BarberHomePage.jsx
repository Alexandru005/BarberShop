import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BarberHomePage.css';

export default function BarberHomePage() {
    const navigate = useNavigate();
    const [barber, setBarber] = useState(null);
    const [programari, setProgramari] = useState([]);
    const [programariTrecute, setProgramariTrecute] = useState([]);
    const [castiguri, setCastiguri] = useState(0);

    useEffect(() => {
        const userString = localStorage.getItem('user');

        if (!userString) { navigate('/'); return; }

        const user = JSON.parse(userString);
        setBarber(user);

        // Programări viitoare + trecute din luna curentă
        fetch(`http://localhost:8080/api/rezervari/barber/${user.id}`)
            .then(res => res.json())
            .then(data => {
                const now = new Date();
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

                const viitoare = (data || [])
                    .filter(r => new Date(r.startDateTime) > now)
                    .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));
                setProgramari(viitoare);

                const trecute = (data || [])
                    .filter(r => new Date(r.startDateTime) <= now && new Date(r.startDateTime) >= startOfMonth)
                    .sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));
                setProgramariTrecute(trecute);
            })
            .catch(() => { setProgramari([]); setProgramariTrecute([]); });

        // Câștiguri luna curentă
        fetch(`http://localhost:8080/api/rezervari/barber/${user.id}/castiguri`)
            .then(res => res.json())
            .then(data => setCastiguri(data))
            .catch(() => setCastiguri(0));
    }, []);

    if (!barber) return null;

    const lunaActuala = new Date().toLocaleString('ro-RO', { month: 'long', year: 'numeric' });

    const formatData = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' });
    };

    const formatOra = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
    };

    const CardProgramare = ({ p, trecuta = false }) => {
        const statusAfisat = trecuta ? 'DONE' : 'PENDING';
        const statusClasa = trecuta ? 'done' : 'pending';

        return (
            <div className={`programare-card ${trecuta ? 'trecuta' : ''}`}>
                <div className="programare-stanga">
                    <p className="programare-data">{formatData(p.startDateTime)}</p>
                    <p className="programare-ora">
                        🕐 {formatOra(p.startDateTime)} — {formatOra(p.endDateTime)}
                    </p>
                    <p className="programare-serviciu">✂️ {p.service?.name}</p>
                </div>
                <div className="programare-dreapta">
                    <p className="programare-client">
                        👤 {p.client?.firstName} {p.client?.lastName}
                    </p>
                    <p className="programare-pret">{p.service?.price} Lei</p>
                    <span className={`status ${statusClasa}`}>
                    {statusAfisat}
                </span>
                </div>
            </div>
        );
    };

    return (
        <div className="barber-home">

            {/* HEADER */}
            <div className="barber-header">
                <div className="barber-welcome">
                    <h1>Bună, <span>{barber.firstName}!</span></h1>
                    <p>Iată ce te așteaptă</p>
                </div>
            </div>

            {/* CASTIGURI */}
            <div className="castiguri-card">
                <p className="castiguri-label">Câștiguri în {lunaActuala}</p>
                <h2 className="castiguri-suma">{castiguri.toFixed(2)} <span>Lei</span></h2>
                <p className="castiguri-sub">Programări viitoare: {programari.length}</p>
            </div>

            {/* PROGRAMARI VIITOARE */}
            <h2 className="sectiune-titlu">📅 Programări viitoare</h2>

            {programari.length === 0
                ? <p className="gol">Nu ai programări viitoare.</p>
                : <div className="programari-list">
                    {programari.map(p => (
                        <CardProgramare key={p.id} p={p} trecuta={false} />
                    ))}
                </div>
            }

            {/* PROGRAMARI TRECUTE */}
            <h2 className="sectiune-titlu" style={{ marginTop: '40px' }}>
                ✅ Programări efectuate în {lunaActuala}
            </h2>

            {programariTrecute.length === 0
                ? <p className="gol">Nu ai programări efectuate în această lună.</p>
                : <div className="programari-list">
                    {programariTrecute.map(p => (
                        <CardProgramare key={p.id} p={p} trecuta={true} />
                    ))}
                </div>
            }

        </div>
    );
}