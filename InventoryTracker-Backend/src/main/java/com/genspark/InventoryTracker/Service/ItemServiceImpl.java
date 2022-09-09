package com.genspark.InventoryTracker.Service;

import com.genspark.InventoryTracker.Dao.ItemDao;
import com.genspark.InventoryTracker.Entity.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    private ItemDao itemDao;
    @Override
    public List<Item> getAllInventory() {
        return this.itemDao.findAll();
    }

    @Override
    public Item getItemById(int itemId) {
        Optional<Item> list = this.itemDao.findById(itemId);
        Item item = null;
        if(list.isPresent()) {
            item = list.get();
        } else {
            throw new RuntimeException("Task not found for id: " + itemId);
        }

        return item;
    }

    @Override
    public Item addItem(Item item) {
        return this.itemDao.save(item);
    }

    @Override
    public Item updateItem(Item item) {
        return this.itemDao.save(item);
    }

    @Override
    public String deleteItem(int itemId) {
        this.itemDao.deleteById(itemId);
        return "Item Deleted!";
    }
}
