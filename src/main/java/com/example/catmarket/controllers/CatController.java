package com.example.catmarket.controllers;

import com.example.catmarket.models.Cat;
import com.example.catmarket.repos.CatRepo;
import com.example.catmarket.services.CatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cats")
public class CatController {

    @Autowired
    private CatService catService;

    @PostMapping("/createCat")
    public ResponseEntity createCat(@RequestBody Cat cat){
        catService.save(cat);
        return ResponseEntity.ok().body("Котик успешно создан");
    }

    @GetMapping("/getCats")
    public ResponseEntity getAllCats(){
        return ResponseEntity.ok(catService.allCats());
    }
}
