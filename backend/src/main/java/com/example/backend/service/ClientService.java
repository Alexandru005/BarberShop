package com.example.backend.service;

import com.example.backend.model.Client;
import com.example.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository repository;

    //C
    public Client createClient(Client client){
        return repository.save(client);
    }

    //R
    public List<Client> getAllClients(){
        return repository.findAll();
    }

    public Optional<Client> getClientById(Long id){
        return repository.findById(id);
    }

    //U
    public Client updateClient(Long id, Client newClient){
        Optional<Client> oldClient = repository.findById(id);
        if(oldClient.isPresent()){
            Client auxiliarClient = oldClient.get();

            auxiliarClient.setFirstName(newClient.getFirstName());
            auxiliarClient.setLastName(newClient.getLastName());
            auxiliarClient.setEmail(newClient.getEmail());
            auxiliarClient.setPassword(newClient.getPassword());
            auxiliarClient.setPhoneNumber(newClient.getPhoneNumber());

            return repository.save(auxiliarClient);
        }
        return null;
    }

    //D
    public boolean deleteClient(Long id){
        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
