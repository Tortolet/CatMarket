package com.example.catmarket.services;

import com.example.catmarket.models.Cat;
import com.example.catmarket.models.User;
import com.example.catmarket.repos.CatRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatService {

    CatRepo catRepo;

    public CatService(CatRepo catRepo) {
        this.catRepo = catRepo;
    }

    public void save(Cat cat){
        catRepo.save(cat);
    }

    public Cat findCatById(Long catId) {
        Optional<Cat> cat = catRepo.findById(catId);
        return cat.orElse(new Cat());
    }

    public List<Cat> allCats() {
        return catRepo.findAll();
    }
}
