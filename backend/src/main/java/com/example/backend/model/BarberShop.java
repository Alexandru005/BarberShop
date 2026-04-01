package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "barbershop")
public class BarberShop{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, length = 100)
    private String address;

    @OneToMany(mappedBy = "barberShop", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("barberShop")
    private List<Barber> barbers;

    @OneToMany(mappedBy = "barberShop", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("barberShop")
    private List<Services> services; // <--- Aici ai grijă să imporți modelul tău Service!

    @OneToMany(mappedBy = "barberShop", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("barberShop")
    private List<Review> reviews;

    public BarberShop(){}

    public BarberShop(String name, String address){
        this.name = name;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Barber> getBarbers() {
        return barbers;
    }

    public void setBarbers(List<Barber> barbers) {
        this.barbers = barbers;
    }

    public List<Services> getServices() {
        return services;
    }

    public void setServices(List<Services> services) {
        this.services = services;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        com.example.backend.model.BarberShop that = (com.example.backend.model.BarberShop) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(address, that.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, address);
    }
}
