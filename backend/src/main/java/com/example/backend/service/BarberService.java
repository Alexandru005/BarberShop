package com.example.backend.service;

import com.example.backend.model.Barber;
import com.example.backend.repository.BarberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarberService {
    @Autowired
    private BarberRepository repository;

    //C
    public Barber createBarber(Barber barber) {
        return repository.save(barber);
    }

    //R
    public List<Barber> getAllBarbers() {
        return repository.findAll();
    }

    public Optional<Barber> getBarberById(Long id) {
        return repository.findById(id);
    }

    public Barber getBarberByEmailAndPassword(String email, String password) {
        Optional<Barber> barber = repository.findByEmailAndPassword(email, password);
        return barber.orElse(null);
    }

    //U
    public Barber updateBarber(Long id, Barber newBarber) {
        Optional<Barber> oldBarber = repository.findById(id);
        if (oldBarber.isPresent()) {
            Barber auxiliarBarber = oldBarber.get();

            auxiliarBarber.setFirstName(newBarber.getFirstName());
            auxiliarBarber.setLastName(newBarber.getLastName());
            auxiliarBarber.setEmail(newBarber.getEmail());
            auxiliarBarber.setPassword(newBarber.getPassword());
            auxiliarBarber.setBarberShop(newBarber.getBarberShop());

            return repository.save(auxiliarBarber);
        }
        return null;
    }

    //D
    public boolean deleteBarber(Long id){
        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
