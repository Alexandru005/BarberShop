import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ReservationPage.css";

const PROGRAM_START = 9;  // 09:00
const PROGRAM_END = 19;   // 19:00

function RezervarePage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const barberId = searchParams.get("barberId");
    const shopId = searchParams.get("shopId");

    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [barberName, setBarberName] = useState("");
    const [rezervari, setRezervari] = useState([]);

    // Calendar
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    // Încarcă serviciile și barber-ul
    useEffect(() => {
        fetch(`http://localhost:8080/api/barbershops/${shopId}`)
            .then(res => res.json())
            .then(data => {
                setServices(data.services || []);
                const barber = (data.barbers || []).find(b => String(b.id) === String(barberId));
                if (barber) setBarberName(`${barber.firstName} ${barber.lastName}`);
            });
    }, [shopId, barberId]);

    // Încarcă rezervările barberului
    useEffect(() => {
        fetch(`http://localhost:8080/api/rezervari/barber/${barberId}`)
            .then(res => res.json())
            .then(data => {
                console.log("Rezervari primite:", data); // <- uită-te aici
                setRezervari(data || [])
            })
            .catch(() => setRezervari([]));
    }, [barberId]);

    // --- CALENDAR LOGIC ---
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay(); // 0=Duminică
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay: firstDay === 0 ? 6 : firstDay - 1, daysInMonth }; // Luni = 0
    };

    const isDateInPast = (day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return date < today;
    };

    const handleSelectDate = (day) => {
        if (isDateInPast(day)) return;
        setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
        setSelectedSlot(null);
    };

    // --- SLOTURI ORARE ---
    const getSlotsForDate = () => {
        if (!selectedDate || !selectedService) return [];

        const slots = [];

        for (let hour = PROGRAM_START; hour < PROGRAM_END; hour++) {
            for (let min = 0; min < 60; min += 30) {
                if (hour * 60 + min >= PROGRAM_END * 60) break;

                const slotStart = new Date(selectedDate);
                slotStart.setHours(hour, min, 0, 0);
                const slotEnd = new Date(slotStart.getTime() + 30 * 60000);

                const isOccupied = rezervari.some(r => {
                    // Adăugăm 'Z' dacă lipsește, ca să fie tratat ca UTC corect
                    const rStartStr = r.startDateTime.endsWith('Z') ? r.startDateTime : r.startDateTime + 'Z';
                    const rEndStr = r.endDateTime.endsWith('Z') ? r.endDateTime : r.endDateTime + 'Z';

                    const rStart = new Date(rStartStr);
                    const rEnd = new Date(rEndStr);

                    // Comparăm doar pe aceeași zi
                    const sameDay = rStart.toLocaleDateString() === slotStart.toLocaleDateString();
                    if (!sameDay) return false;

                    return slotStart < rEnd && slotEnd > rStart;
                });

                slots.push({
                    label: `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`,
                    start: slotStart,
                    end: new Date(slotStart.getTime() + selectedService.durationMinutes * 60000),
                    occupied: isOccupied
                });
            }
        }
        return slots;
    };

    // --- TRIMITE REZERVAREA ---
    const handleRezervare = () => {
        const userString = localStorage.getItem("user");
        if (!userString) { alert("Trebuie să fii logat!"); return; }
        if (!selectedService) { alert("Alege un serviciu!"); return; }
        if (!selectedSlot) { alert("Alege un slot orar!"); return; }

        const currentUser = JSON.parse(userString);

        const rezervareData = {
            client: { id: currentUser.id },
            barber: { id: Number(barberId) },
            service: { id: selectedService.id },
            startDateTime: selectedSlot.start.toISOString(),
            endDateTime: selectedSlot.end.toISOString(),
            status: "PENDING"
        };

        fetch("http://localhost:8080/api/rezervari", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rezervareData)
        })
            .then(res => {
                if (res.status === 409) {
                    // Intervalul e deja ocupat — reîncărcăm rezervările
                    alert("⚠️ Acest interval tocmai a fost rezervat de altcineva. Alege alt slot!");
                    // Reîncărcăm rezervările ca să fie la zi
                    return fetch(`http://localhost:8080/api/rezervari/barber/${barberId}`)
                        .then(r => r.json())
                        .then(data => {
                            setRezervari(data || []);
                            setSelectedSlot(null);
                        });
                }
                if (!res.ok) throw new Error("Eroare la rezervare");
                return res.json().then(() => {
                    alert("✅ Rezervare confirmată!");
                    navigate(`/barbershop/${shopId}`);
                });
            })
            .catch(() => alert("Eroare la rezervare."));
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
    const slots = getSlotsForDate();
    const monthName = currentMonth.toLocaleString('ro-RO', { month: 'long', year: 'numeric' });

    return (
        <div className="rezervare-page">
            <h1>Rezervare la <span>{barberName}</span></h1>

            {/* STEP 1 - Alege serviciu */}
            <section className="step">
                <h2>1. Alege serviciul</h2>
                <div className="service-grid">
                    {services.map(s => (
                        <div
                            key={s.id}
                            className={`service-card ${selectedService?.id === s.id ? "selected" : ""}`}
                            onClick={() => { setSelectedService(s); setSelectedSlot(null); }}
                        >
                            <strong>{s.name}</strong>
                            <span>{s.price} Lei</span>
                            <small>{s.durationMinutes} min</small>
                        </div>
                    ))}
                </div>
            </section>

            {/* STEP 2 - Calendar */}
            <section className="step">
                <h2>2. Alege ziua</h2>
                <div className="calendar">
                    <div className="calendar-header">
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>‹</button>
                        <span>{monthName}</span>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>›</button>
                    </div>
                    <div className="calendar-grid">
                        {["Lun","Mar","Mie","Joi","Vin","Sâm","Dum"].map(d => (
                            <div key={d} className="day-label">{d}</div>
                        ))}
                        {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
                        {Array(daysInMonth).fill(null).map((_, i) => {
                            const day = i + 1;
                            const past = isDateInPast(day);
                            const isSelected = selectedDate?.getDate() === day &&
                                selectedDate?.getMonth() === currentMonth.getMonth() &&
                                selectedDate?.getFullYear() === currentMonth.getFullYear();
                            return (
                                <div
                                    key={day}
                                    className={`day ${past ? "past" : ""} ${isSelected ? "selected" : ""}`}
                                    onClick={() => handleSelectDate(day)}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* STEP 3 - Sloturi orare */}
            {selectedDate && selectedService && (
                <section className="step">
                    <h2>3. Alege ora</h2>
                    {slots.length === 0
                        ? <p>Nu există sloturi disponibile.</p>
                        : <div className="slots-grid">
                            {slots.map((slot, i) => (
                                <div
                                    key={i}
                                    className={`slot ${slot.occupied ? "occupied" : ""} ${selectedSlot?.label === slot.label ? "selected" : ""}`}
                                    onClick={() => !slot.occupied && setSelectedSlot(slot)}
                                >
                                    {slot.label}
                                </div>
                            ))}
                        </div>
                    }
                </section>
            )}

            {/* BUTON CONFIRMARE */}
            {selectedSlot && (
                <div className="confirm-bar">
                    <p>📅 {selectedDate.toLocaleDateString('ro-RO')} la {selectedSlot.label} — {selectedService.name}</p>
                    <button onClick={handleRezervare}>✅ Confirmă Rezervarea</button>
                </div>
            )}

            <button className="back-btn" onClick={() => navigate(-1)}>← Înapoi</button>
        </div>
    );
}

export default RezervarePage;