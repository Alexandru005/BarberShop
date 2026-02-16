package com.example.backend.controller;

import com.example.backend.model.BarberShop;
import com.example.backend.service.BarberShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/barbershops")
@CrossOrigin(origins = "http://localhost:5173")
public class BarberShopController {

    @Autowired
    private BarberShopService service;

    //Get all the barbershops
    @GetMapping
    public ResponseEntity<List<BarberShop>> getAllBarberShops(){
        List<BarberShop> barberShops = service.getAllBarberShops();
        return ResponseEntity.ok(barberShops);
    }

    //Get a specific barbershop
    @GetMapping("/{id}")
    public ResponseEntity<Optional<BarberShop>> getBarberShop(@PathVariable Long id){
        Optional<BarberShop> shop = service.getBarberShopById(id);

        if(shop.isPresent()){
            return ResponseEntity.ok(shop);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    //Create a new shop
    @PostMapping
    public ResponseEntity<BarberShop> createBarberShop(@RequestBody BarberShop shop){
        BarberShop newShop = service.createBarberShop(shop);
        return ResponseEntity.ok(newShop);
    }

    //Update an existent shop
    @PutMapping("/{id}")
    public ResponseEntity<BarberShop> updateBarberShop(@PathVariable Long id,@RequestBody BarberShop newShop){
        BarberShop oldBarberShop = service.updateBarberShop(id, newShop);
        if(oldBarberShop != null){
            return ResponseEntity.ok(oldBarberShop);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBarberShop(@PathVariable Long id){
        boolean status = service.deleteBarberShop(id);
        if(status == true){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


}
