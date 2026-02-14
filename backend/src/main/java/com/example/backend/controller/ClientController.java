package com.example.backend.controller;

import com.example.backend.model.Client;
import com.example.backend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private ClientService service;

    //C
    @PostMapping
    public ResponseEntity<Client> createClient(@RequestBody Client client){
        Client newClient = service.createClient(client);
        return ResponseEntity.ok(newClient);
    }

    //R
    @GetMapping
    public ResponseEntity<List<Client>> getAllClients(){
        List<Client> clients = service.getAllClients();
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Client>> getClient(@PathVariable Long id){
        Optional<Client> client = service.getClientById(id);

        if(client.isPresent()){
            return ResponseEntity.ok(client);
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
