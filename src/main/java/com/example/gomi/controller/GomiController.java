package com.example.gomi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GomiController {

    @GetMapping("/api/gomi")
    public String gomi(){
        return "gomi";
    }

}
