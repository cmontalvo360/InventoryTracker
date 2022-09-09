package com.genspark.InventoryTracker.Controller;

import com.genspark.InventoryTracker.Dao.UserDao;
import com.genspark.InventoryTracker.Entity.User;
import com.genspark.InventoryTracker.JwtUtil.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@CrossOrigin
@RestController
public class AuthController {
    @Autowired
    UserDao userDao;

    @PostMapping("/authenticate")
    public String createAuthenticationToken(@AuthenticationPrincipal UserDetails details) throws Exception {
        if(details != null){

            Optional<User> user = userDao.findByUsernameIgnoreCase(details.getUsername());
            return user.get().toString();
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Incorrect password or email!");
        }
    }
}
