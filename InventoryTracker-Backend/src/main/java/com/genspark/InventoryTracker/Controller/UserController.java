package com.genspark.InventoryTracker.Controller;

import com.genspark.InventoryTracker.Dao.UserDao;
import com.genspark.InventoryTracker.Entity.User;
import com.genspark.InventoryTracker.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@Validated
public class UserController {
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    private UserService userService;
    @Autowired
    UserDao userDao;

    @GetMapping("/users")
    public List<User> getUsers() { return this.userService.getAllUsers(); }

    @GetMapping("/users/{userId}")
    public User getUser(@PathVariable String userId) {
        return this.userService.getUserById(Integer.parseInt(userId));
    }

    @PostMapping("/users")
    ResponseEntity<String> signup(@Valid @RequestBody User user) {
        if(userDao.findByUsernameIgnoreCase(user.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "User already exists!");
        } else {
            userService.addUser(user);

            System.out.println("added user");
            return ResponseEntity.ok(user.toString());
        }
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        return this.userService.updateUser(user);
    }

    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable String userId) {
        return this.userService.deleteUser(Integer.parseInt(userId));
    }
}
