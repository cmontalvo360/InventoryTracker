package com.genspark.InventoryTracker.Controller;

import com.genspark.InventoryTracker.Entity.Item;
import com.genspark.InventoryTracker.Service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("/")
    public String home() { return "<HTML><H1>My Inventory List!</H1></HTML>"; }

    @GetMapping("/admin")
    public String admin() { return "<HTML><H1>Welcome Admin!</H1></HTML>"; }

    @GetMapping("/items")
    public List<Item> getItems() { return this.itemService.getAllInventory(); }

    @GetMapping("/items/{itemId}")
    public Item getItem(@PathVariable String movId) {
        return this.itemService.getItemById(Integer.parseInt(movId));
    }

    @PostMapping("/items")
    public Item addItem(@RequestBody Item item) { return this.itemService.addItem(item); }

    @PutMapping("/items")
    public Item updateItem(@RequestBody Item item) { return this.itemService.updateItem(item); }

    @DeleteMapping("/items/{itemId}")
    public String deleteItem(@PathVariable String itemId) {
        return this.itemService.deleteItem(Integer.parseInt(itemId));
    }
}
