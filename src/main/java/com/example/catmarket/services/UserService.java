package com.example.catmarket.services;

import com.example.catmarket.models.Roles;
import com.example.catmarket.models.User;
import com.example.catmarket.repos.UserRepo;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    UserRepo userRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepo userRepo, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepo;
        this.bCryptPasswordEncoder = passwordEncoder;
    }

    public User findUserById(Long userId) {
        Optional<User> userFromDb = userRepository.findById(userId);
        return userFromDb.orElse(new User());
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public void save(User user){
        String enPas = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(enPas);
        this.userRepository.save(user);
    }

    public boolean registrationUser(User user){
        User userInBD = userRepository.findByUsername(user.getUsername());

        if(userInBD != null){
            return false;
        }

        user.setActive(true);
        user.setRoles(Collections.singleton(Roles.ROLE_USER));
        return true;
    }


}
