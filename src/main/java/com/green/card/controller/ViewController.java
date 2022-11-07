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

    @GetMapping("/canvas")
    public String canvas() {
        return "canvas";
    }

    @GetMapping("/report")
    public String report() {
        return "report";
    }

    @GetMapping("/profile")
    public String profile() {return "profile";}

    @GetMapping("/findId")
    public String findId() {return "findId";}

    @GetMapping("/findPw")
    public String findPw() {return "findPw";}
}
