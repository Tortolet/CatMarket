package com.example.catmarket.services;

import com.example.catmarket.models.Cat;
import com.example.catmarket.models.Position;
import com.example.catmarket.repos.CatRepo;
import com.example.catmarket.repos.PosRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PositionService {

    PosRepo posRepo;

    public PositionService(PosRepo posRepo) {
        this.posRepo = posRepo;
    }

    public List<Position> allPos() {
        return posRepo.findAll();
    }

    public void save(Position position){
        posRepo.save(position);
    }

    public Position findPosById(Long posId) {
        Optional<Position> position = posRepo.findById(posId);
        return position.orElse(new Position());
    }

    public void delete(Long posId){
        posRepo.deleteById(posId);
    }
}
