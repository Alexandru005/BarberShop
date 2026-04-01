package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "service")
public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    // Legătura cu Frizeria (Foreign Key: barbershop_id)
    @ManyToOne
    @JoinColumn(name = "barbershop_id")
    @JsonIgnoreProperties({"Servicess", "barbers", "reviews"}) // Previne bucla infinită de date
    private BarberShop barberShop;

    public Services() {}

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    public BarberShop getBarberShop() { return barberShop; }
    public void setBarberShop(BarberShop barberShop) { this.barberShop = barberShop; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Services)) return false;
        return Objects.equals(id, ((Services) o).id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
