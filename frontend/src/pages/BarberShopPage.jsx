import './BarberShopPage.css';
import patern from '../assets/background-vintage-barbershop-with-diagonal-colored-stripes-illustration-vector.jpg';
import profile from '../assets/0921fc87aa989330b8d403014bf4f340.jpg';

function BarberShopPage() {

    return (
        <div className={"barbershop-page"}>
            <img src={patern} className={"barbershop-page-patern"} alt="Patern" />
            <h1 className={"title"}>Name of the barbershop</h1>

            <h1 className={"title-service"}>Sevices</h1>
            <div className={"barbershop-page-services"}>

                <div className={"barbershop-page-service-card"}>
                    <h2 className={"service-name"}>Tuns - <span className={"service-price"}>70<sup><small>00</small></sup>Lei</span></h2>
                    <p className={"service-duration"}>30 min.</p>
                    <ul className={"service-description"}>
                        <li>Spalat</li>
                        <li>Tuns</li>
                        <li>Frezat</li>
                        <li>Parfumat</li>
                        <li>Mai ceva</li>
                    </ul>
                </div>

                <div className={"barbershop-page-service-card"}>
                    <h2 className={"service-name"}>Tuns - <span className={"service-price"}>70<sup><small>00</small></sup>Lei</span></h2>
                    <p className={"service-duration"}>30 min.</p>
                    <ul className={"service-description"}>
                        <li>Spalat</li>
                        <li>Tuns</li>
                        <li>Frezat</li>
                        <li>Parfumat</li>
                        <li>Mai ceva</li>
                    </ul>
                </div>

                <div className={"barbershop-page-service-card"}>
                    <h2 className={"service-name"}>Tuns - <span className={"service-price"}>70<sup><small>00</small></sup>Lei</span></h2>
                    <p className={"service-duration"}>30 min.</p>
                    <ul className={"service-description"}>
                        <li>Spalat</li>
                        <li>Tuns</li>
                        <li>Frezat</li>
                        <li>Parfumat</li>
                        <li>Mai ceva</li>
                    </ul>
                </div>

                <div className={"barbershop-page-service-card"}>
                    <h2 className={"service-name"}>Tuns - <span className={"service-price"}>70<sup><small>00</small></sup>Lei</span></h2>
                    <p className={"service-duration"}>30 min.</p>
                    <ul className={"service-description"}>
                        <li>Spalat</li>
                        <li>Tuns</li>
                        <li>Frezat</li>
                        <li>Parfumat</li>
                        <li>Mai ceva</li>
                    </ul>
                </div>

                <div className={"barbershop-page-service-card"}>
                    <h2 className={"service-name"}>Tuns - <span className={"service-price"}>70<sup><small>00</small></sup>Lei</span></h2>
                    <p className={"service-duration"}>30 min.</p>
                    <ul className={"service-description"}>
                        <li>Spalat</li>
                        <li>Tuns</li>
                        <li>Frezat</li>
                        <li>Parfumat</li>
                        <li>Mai ceva</li>
                    </ul>
                </div>

                <div className={"barbershop-page-service-card"}>
                    <h2 className={"service-name"}>Tuns - <span className={"service-price"}>70<sup><small>00</small></sup>Lei</span></h2>
                    <p className={"service-duration"}>30 min.</p>
                    <ul className={"service-description"}>
                        <li>Spalat</li>
                        <li>Tuns</li>
                        <li>Frezat</li>
                        <li>Parfumat</li>
                        <li>Mai ceva</li>
                    </ul>
                </div>

                <div className={"barbershop-page-service-card"}>
                    <h2 className={"service-name"}>Tuns - <span className={"service-price"}>70<sup><small>00</small></sup>Lei</span></h2>
                    <p className={"service-duration"}>30 min.</p>
                    <ul className={"service-description"}>
                        <li>Spalat</li>
                        <li>Tuns</li>
                        <li>Frezat</li>
                        <li>Parfumat</li>
                        <li>Mai ceva</li>
                    </ul>
                </div>

            </div>

            <h1 className={"title-service"}>Our Barbers</h1>
            <div className={"barbershop-page-barbers"}>
                <ul>
                    <li>
                        <img src={profile} alt="profile-pic"/>
                        <h3>Nume</h3>
                        <button>Rezerva acum</button>
                    </li>

                    <li>
                        <img src={profile} alt="profile-pic"/>
                        <h3>Nume</h3>
                        <button>Rezerva acum</button>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default BarberShopPage;