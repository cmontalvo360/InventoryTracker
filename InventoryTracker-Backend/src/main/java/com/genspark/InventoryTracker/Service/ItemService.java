package com.genspark.InventoryTracker.Service;

import com.genspark.InventoryTracker.Entity.Item;

import java.util.List;

public interface ItemService {
    List<Item> getAllInventory();
    Item getItemById(int itemId);
    Item addItem(Item item);
    Item updateItem(Item item);
    String deleteItem(int itemId);
}
