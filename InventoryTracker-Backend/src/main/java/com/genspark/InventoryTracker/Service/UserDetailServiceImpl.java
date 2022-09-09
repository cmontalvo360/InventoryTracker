package com.genspark.InventoryTracker.Service;

import com.genspark.InventoryTracker.Dao.UserDao;
import com.genspark.InventoryTracker.Entity.User;
import com.genspark.InventoryTracker.Security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userDao.findByUsernameIgnoreCase(username);
        if (user.isPresent()) {
            System.out.println("found a matching user!");
            System.out.println(user.get().getUsername());
            return new UserDetailsImpl(user.get());
        } else {
            throw new UsernameNotFoundException("Not found: " + username);
        }
    }
}
