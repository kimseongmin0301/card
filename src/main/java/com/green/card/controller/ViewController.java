package com.green.card.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/groovy")
public class ViewController {
    @GetMapping("/calendar")
    public String index() {
        return "calendar";
    }

    @GetMapping("/index2")
    public String index2() {
        return "index2";
    }

    @GetMapping("")
    public String main() {
        return "index";
    }

    @GetMapping("/join")
    public String join() {
        return "join";
    }

    @GetMapping("/home")
    public String home() {
        return "home";
    }
}
