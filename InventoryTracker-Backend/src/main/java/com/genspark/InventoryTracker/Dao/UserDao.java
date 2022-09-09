package com.genspark.InventoryTracker.Dao;

import com.genspark.InventoryTracker.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserDao extends JpaRepository<User, Integer> {
    Optional<User> findByUsernameIgnoreCase(String username);
}
