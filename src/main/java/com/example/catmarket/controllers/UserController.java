package com.example.catmarket.controllers;

import com.example.catmarket.models.User;
import com.example.catmarket.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URI;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getUsers")
    public ResponseEntity getAllUsers(){
        return ResponseEntity.ok(userService.allUsers());
    }

    @GetMapping("/getUsersById")
    public ResponseEntity getUserById(@RequestHeader Long id){
        try {
            return ResponseEntity.ok(userService.findUserById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Пользователь не найден");
        }
    }

    @PostMapping("/createUsers")
    public ResponseEntity createUser(@RequestBody User user){
        if (!user.getPassword().equals(user.getPasswordConfirm())){
            return ResponseEntity.badRequest().body("Пароли не совпадают");
        }

        if(!userService.registrationUser(user)){
            return ResponseEntity.badRequest().body("Пользователь уже существует");
        }

        userService.save(user);
        return ResponseEntity.ok().body("Пользователь " + user.getUsername() + " создан");
    }
}
