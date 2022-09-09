package com.genspark.InventoryTracker.Service;

import com.genspark.InventoryTracker.Entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(int userId);
    User addUser(User user);
    User updateUser(User user);
    String deleteUser(int userId);
}
