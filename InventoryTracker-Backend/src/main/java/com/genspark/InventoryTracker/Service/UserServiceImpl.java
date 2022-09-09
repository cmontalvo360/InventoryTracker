package com.genspark.InventoryTracker.Service;

import com.genspark.InventoryTracker.Dao.UserDao;
import com.genspark.InventoryTracker.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    private UserDao userDao;

    @Override
    public List<User> getAllUsers() {
        return this.userDao.findAll();
    }

    @Override
    public User getUserById(int userId) {
        Optional<User> list = this.userDao.findById(userId);
        User user = null;
        if(list.isPresent()) {
            user = list.get();
        } else {
            throw new RuntimeException("User not found for id: " + userId);
        }
        return user;
    }

    @Override
    public User addUser(User user) {
        user.setUsername(user.getUsername().toLowerCase());
        user.setPassword(encoder.encode(user.getPassword()));
        userDao.save(user);
        return user;
    }

    @Override
    public User updateUser(User user) {
        return this.userDao.save(user);
    }

    @Override
    public String deleteUser(int userId) {
        this.userDao.deleteById(userId);
        return "User deleted";
    }
}
