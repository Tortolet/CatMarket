package com.example.catmarket.controllers;

import com.example.catmarket.services.CatService;
import com.example.catmarket.services.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class ShopController {

    @Autowired
    private CatService catService;

    @Autowired
    private PositionService positionService;

    @GetMapping("/shop")
    public String shoppingCats(Model model){
        model.addAttribute("positions", positionService.allPos());
        return "shop";
    }
}
