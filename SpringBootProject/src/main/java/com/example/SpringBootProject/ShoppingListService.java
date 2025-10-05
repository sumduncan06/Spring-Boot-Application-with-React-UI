package com.example.SpringBootProject;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class ShoppingListService {
    private final List<ShoppingItem> items = new ArrayList<>();
    private final AtomicInteger counter = new AtomicInteger();

    public void addItem(ShoppingItem item) {
        item.setId(counter.incrementAndGet());
        items.add(item);
    }

    public List<ShoppingItem> getItems() { return items; }

    public ShoppingItem getItemById(Integer id) {
        return items.stream()
                .filter(i -> i.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public void updateItem(Integer id, ShoppingItem updatedItem) {
        for (int i = 0; i < items.size(); i++) {
            if (items.get(i).getId().equals(id)) {
                updatedItem.setId(id);
                items.set(i, updatedItem);
                return;
            }
        }
    }

    public void deleteItem(Integer id) {
        items.removeIf(item -> item.getId().equals(id));
    }
}
