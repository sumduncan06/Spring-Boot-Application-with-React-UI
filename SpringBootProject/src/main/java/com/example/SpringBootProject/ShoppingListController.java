package com.example.SpringBootProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/shopping")
public class ShoppingListController {
    @Autowired
    private ShoppingListService shoppingListService;

    @PostMapping
    public void addItem(@RequestBody ShoppingItem item) { shoppingListService.addItem(item); }

    @GetMapping
    public List<ShoppingItem> getItems() { return shoppingListService.getItems(); }

    @GetMapping("/{id}")
    public ShoppingItem getItem(@PathVariable Integer id) { return shoppingListService.getItemById(id); }

    @PutMapping("/{id}")
    public void updateItem(@PathVariable Integer id, @RequestBody ShoppingItem item) {
        shoppingListService.updateItem(id, item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Integer id) { shoppingListService.deleteItem(id); }
}
