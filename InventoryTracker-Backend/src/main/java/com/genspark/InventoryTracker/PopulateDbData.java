package com.genspark.InventoryTracker;

import com.genspark.InventoryTracker.Dao.UserDao;
import com.genspark.InventoryTracker.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PopulateDbData implements CommandLineRunner {
    @Autowired
    UserDao userDao;
    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        loadUserData();
    }

    private void loadUserData() {
        if(userDao.count() == 0) {
            User user1 = new User("Cesar", "Monty", "cam12@yahoo.com", "password12!@");
            User user2 = new User("Robert", "Gauchy", "rober12@yahoo.com", "password12!@");
            user1.setPassword(encoder.encode(user1.getPassword()));
            user2.setPassword(encoder.encode(user2.getPassword()));
            userDao.save(user1);
            userDao.save(user2);
            System.out.println("Seeded User Table!");
        } else {
            System.out.println("Already populated");
        }
    }
}
