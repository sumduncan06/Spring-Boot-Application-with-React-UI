package com.example.SpringBootProject;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class ConfigController {

    @RequestMapping(value = "/config", method = RequestMethod.GET)
    public Map<String, String> getConfig() {
        Map<String, String> environmentVariables = System.getenv();
        System.out.println("=== Environment Variables ===");
        for (String key : environmentVariables.keySet()) {
            System.out.println(key + " = " + environmentVariables.get(key));
        }
        return environmentVariables;
    }

    @RequestMapping(value = "/fib", method = RequestMethod.GET)
    public List<Integer> getFibonacci(@RequestParam("length") int length) {
        List<Integer> fibonacciNumbers = new ArrayList<>();
        int first = 0;
        int second = 1;
        for (int i = 0; i < length; i++) {
            fibonacciNumbers.add(first);
            int next = first + second;
            first = second;
            second = next;
        }
        System.out.println("Fibonacci sequence (" + length + " numbers): " + fibonacciNumbers);
        return fibonacciNumbers;
    }
}
