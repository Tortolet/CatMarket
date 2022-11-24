package com.example.catmarket.controllers;

import com.example.catmarket.models.Cat;
import com.example.catmarket.models.Position;
import com.example.catmarket.repos.CatRepo;
import com.example.catmarket.repos.PosRepo;
import com.example.catmarket.services.CatService;
import com.example.catmarket.services.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/positions")
public class PositionController {

    @Autowired
    private PositionService positionService;

    @Autowired
    private CatService catService;

    @PostMapping("/createPos")
    public ResponseEntity createPos(@RequestHeader Long catId, @RequestBody Position position){
        try {
            Cat cat = catService.findCatById(catId);

            if(cat.getId() == null){
                return ResponseEntity.badRequest().body("Котик не найден");
            }

            position.setCat(cat);
            position.setOnSale(true);
            positionService.save(position);
            return ResponseEntity.ok().body("Позиция создана");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Котик уже создан");
        }
    }

    @PostMapping("/addPosition")
    public ResponseEntity addPos(@RequestBody Position position){
        try {
            position.setOnSale(true);
            positionService.save(position);
            return ResponseEntity.ok().body("Позиция создана");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Ошибка");
        }
    }

    @GetMapping("/getPositions")
    public ResponseEntity getAllPos(){
        return ResponseEntity.ok(positionService.allPos());
    }

    @GetMapping("/getPositionsById")
    public ResponseEntity getUserById(@RequestHeader Long posId){
        try {
            return ResponseEntity.ok(positionService.findPosById(posId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Пользователь не найден");
        }
    }

    @PutMapping("/updateSale")
    public ResponseEntity updateSale(@RequestHeader Long posId, @RequestHeader boolean sale){
        try {
            Position position = positionService.findPosById(posId);

            if(position.getId() == null){
                return ResponseEntity.badRequest().body("Позиция не найден");
            }

            position.setOnSale(sale);
            positionService.save(position);
            return ResponseEntity.ok().body("Позиция обновлена");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Ошибка");
        }
    }

    @PutMapping("/updatePosition")
    public ResponseEntity updatePos(@RequestHeader Long posId, @RequestHeader int cost, @RequestBody Cat cat){
        try {
            Position position = positionService.findPosById(posId);
            Cat cat1 = position.getCat();

            if(positionService.findPosById(posId) == null){
                return ResponseEntity.badRequest().body("Позиция не найден");
            }

//            cat.setName(name);
//            cat.setBreed(breed);
//            cat.setGender(gender);
//            cat.setColor(color);
//            cat.setYears(years);
//            cat.setDescription(desc);
//            position.setCost(cost);
            cat1.setName(cat.getName());
            cat1.setBreed(cat.getBreed());
            cat1.setGender(cat.getGender());
            cat1.setColor(cat.getColor());
            cat1.setYears(cat.getYears());
            cat1.setDescription(cat.getDescription());

            position.setDateChange(new Date(System.currentTimeMillis()));
            position.setCost(cost);
            position.setCat(cat1);

            positionService.save(position);
            return ResponseEntity.ok().body("Позиция обновлена");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Ошибка");
        }
    }

    @DeleteMapping("/deletePosition")
    public ResponseEntity deletePos(@RequestHeader Long posId){
        try {
            Position position = positionService.findPosById(posId);

            if(position.getId() == null){
                return ResponseEntity.badRequest().body("Позиция не найден");
            }

            positionService.delete(position.getId());
            return ResponseEntity.badRequest().body("Позиция удалена");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Ошибка");
        }
    }
}
