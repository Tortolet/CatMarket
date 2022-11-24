package com.example.catmarket.repos;

import com.example.catmarket.models.Cat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CatRepo extends JpaRepository<Cat, Long> {
}
