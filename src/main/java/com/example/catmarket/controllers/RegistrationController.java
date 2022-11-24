package com.example.catmarket.controllers;

import com.example.catmarket.models.User;
import com.example.catmarket.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RegistrationController {

    @Autowired
    private UserService userService;

    @GetMapping("/registration")
    public String registration(Model model){
        return "registration";
    }

    @PostMapping("/registration")
    public String addUser(User user, Model model){

        if (!user.getPassword().equals(user.getPasswordConfirm())){
            model.addAttribute("passwordError", "Пароли не совпадают");
            return "registration";
        }

        if(!userService.registrationUser(user)){
            model.addAttribute("messageError", "Пользователь уже существует");
            return "registration";
        }
//
//        userService.save(user);

        return "redirect:/login";
    }
}
