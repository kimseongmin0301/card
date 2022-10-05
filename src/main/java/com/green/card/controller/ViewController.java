package com.green.card.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {
    @GetMapping("/index1")
    public String index() {
        return "index";
    }

    @GetMapping("/index2")
    public String index2() {
        return "index2";
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    @GetMapping("/main")
    public String main() {
        return "main";
    }
}
