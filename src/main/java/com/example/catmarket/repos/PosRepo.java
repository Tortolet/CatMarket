package com.example.catmarket.repos;

import com.example.catmarket.models.Position;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PosRepo extends JpaRepository<Position, Long> {
    void deleteById(Long id);
}
