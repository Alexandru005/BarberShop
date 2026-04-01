package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Column(nullable = false)
    private Integer rating;

    // FK 1: Legătura cu Clientul
    @ManyToOne
    @JoinColumn(name = "client_id")
    @JsonIgnoreProperties({"password"}) // Nu vrem parola clientului trimisă spre React
    private Client client;

    // FK 2: Legătura cu Frizerul
    @ManyToOne
    @JoinColumn(name = "barber_id")
    @JsonIgnoreProperties({"password", "barberShop"})
    private Barber barber;

    // FK 3: Legătura cu Frizeria
    @ManyToOne
    @JoinColumn(name = "barbershop_id")
    @JsonIgnoreProperties({"reviews", "services", "barbers"})
    private BarberShop barberShop;

    public Review() {}

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public Client getClient() { return client; }
    public void setClient(Client client) { this.client = client; }
    public Barber getBarber() { return barber; }
    public void setBarber(Barber barber) { this.barber = barber; }
    public BarberShop getBarberShop() { return barberShop; }
    public void setBarberShop(BarberShop barberShop) { this.barberShop = barberShop; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Review)) return false;
        return Objects.equals(id, ((Review) o).id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}