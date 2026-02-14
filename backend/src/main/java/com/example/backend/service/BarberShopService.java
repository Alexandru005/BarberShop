package com.example.backend.service;

import com.example.backend.model.BarberShop;
import com.example.backend.repository.BarberShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BarberShopService {

    @Autowired
    private BarberShopRepository barberShopRepository;

    //C
    //Create
    public BarberShop createBarberShop(BarberShop shop){
        return barberShopRepository.save(shop);
    }

    //R
    //Display all shops
    public List<BarberShop> getAllBarberShops(){
        return barberShopRepository.findAll();
    }

    //Display only one shop (by id - in this case)
    public Optional<BarberShop> getBarberShopById(Long id){
        return barberShopRepository.findById(id);
    }

    //U
    //Updating a shop
    public BarberShop updateBarberShop(Long id, BarberShop newBarberShop){
        //Search the shop we want to modify
        Optional<BarberShop> oldBarberShop = barberShopRepository.findById(id);

        if(oldBarberShop.isPresent()){  //If we found it
            BarberShop auxiliarShop = oldBarberShop.get();  //We save it in an auxiliar variable
            auxiliarShop.setName(newBarberShop.getName());  //Then we change data
            auxiliarShop.setAddress(newBarberShop.getAddress());
            return barberShopRepository.save(auxiliarShop);  //Finally we save our changes
        }else{  //If the barbershop doesn't exist
            return null;  //We return null
        }
    }


    //D
    //Deleting a barbershop
    public boolean deleteBarberShop(Long id){
        if(barberShopRepository.existsById(id)){    //Verify if the barbershop exist
            barberShopRepository.deleteById(id);    //If it does then we delete it
            return true;
        }else{
            return false;
        }
    }



}
