package com.example.backend.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "barber")
public class Barber {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "password", nullable = false, length = 50)
    private String password;

    @ManyToOne
    @JoinColumn(name = "barbershop_id")
    private BarberShop barberShop;

    public Barber(){}

    public Barber(String firstName, String lastName, String email, String password, BarberShop barberShop) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.barberShop = barberShop;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public BarberShop getBarberShop() {
        return barberShop;
    }

    public void setBarberShop(BarberShop barberShop) {
        this.barberShop = barberShop;
    }

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof Barber barber)) return false;
        return Objects.equals(id, barber.id) && Objects.equals(firstName, barber.firstName) &&
                Objects.equals(lastName, barber.lastName);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
