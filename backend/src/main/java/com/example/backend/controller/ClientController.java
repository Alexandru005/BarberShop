package com.example.backend.controller;

import com.example.backend.model.Client;
import com.example.backend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "http://localhost:5173") // <--- Adaugă linia asta! (Permite accesul React-ului)
public class ClientController {

    @Autowired
    private ClientService service;

    //C
    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client){
        Client newClient = service.createClient(client);
        return ResponseEntity.ok(newClient);
    }

    @PostMapping("/login")
    public ResponseEntity<Client> login(@RequestBody Client loginRequest) {
        // Caută clientul cu emailul și parola primite
        Client client = service.loginClient(loginRequest.getEmail(), loginRequest.getPassword());

        if (client != null) {
            return ResponseEntity.ok(client); // 200 OK - Am găsit utilizatorul
        } else {
            return ResponseEntity.status(401).build(); // 401 Unauthorized - Date greșite
        }
    }

    //R
    @GetMapping
    public ResponseEntity<List<Client>> getAllClients(){
        List<Client> clients = service.getAllClients();
        return ResponseEntity.ok(clients);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Client> getClient(@PathVariable Long id){
        Optional<Client> client = service.getClientById(id);

        if(client.isPresent()){
            return ResponseEntity.ok(client.get());
        }
        return ResponseEntity.notFound().build();
    }


    //U
    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id,@RequestBody Client newClient){
        Client oldClient = service.updateClient(id, newClient);
        if(oldClient != null){
            return ResponseEntity.ok(oldClient);
        }
        return ResponseEntity.notFound().build();
    }

    //D
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id){
        boolean delete = service.deleteClient(id);
        if(delete == true){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
