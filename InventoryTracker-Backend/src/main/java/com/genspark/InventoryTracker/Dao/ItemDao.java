package com.genspark.InventoryTracker.Dao;

import com.genspark.InventoryTracker.Entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemDao extends JpaRepository<Item,Integer> {
}
