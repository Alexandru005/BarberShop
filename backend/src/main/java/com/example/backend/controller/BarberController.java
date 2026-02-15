package com.example.backend.controller;

import com.example.backend.model.Barber;
import com.example.backend.service.BarberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/barbers")
@CrossOrigin(origins = "http://localhost:5173")
public class BarberController {

    @Autowired
    private BarberService service;

    //C
    @PostMapping
    public ResponseEntity<Barber> createBarber(@RequestBody Barber barber){
        Barber auxiliarBarber = service.createBarber(barber);
        if(auxiliarBarber != null){
            return ResponseEntity.ok(auxiliarBarber);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Barber> login(@RequestBody Barber loginRequest){
        Barber barber = service.getBarberByEmailAndPassword(loginRequest.getEmail(), loginRequest.getPassword());
        if(barber != null){
            return ResponseEntity.ok(barber);
        }
        return ResponseEntity.status(401).build();
    }

    //R
    @GetMapping
    public ResponseEntity<List<Barber>> getAllBarbers(){
        List<Barber> barbers = service.getAllBarbers();
        return ResponseEntity.ok(barbers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Barber> getBarberById(@PathVariable Long id){
        Optional<Barber> barber = service.getBarberById(id);
        if(barber.isPresent()){
            return ResponseEntity.ok(barber.get());
        }
        return ResponseEntity.notFound().build();
    }

    //U
    @PutMapping("/{id}")
    public ResponseEntity<Barber> updateBarber(@PathVariable Long id, @RequestBody Barber newBarber){
        Barber oldBarber = service.updateBarber(id, newBarber);
        if(oldBarber != null){
            return ResponseEntity.ok(oldBarber);
        }
        return ResponseEntity.notFound().build();
    }

    //D
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBarber(@PathVariable Long id){
        boolean deleted = service.deleteBarber(id);
        if(deleted == true){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
