package com.example.gomi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaForwardController {

    // "/" 는 index.html
    @RequestMapping(value = "/")
    public String index(){
        return "forward:/index.html";
    }

    @RequestMapping(value = {
            "/{path:^(?!api$)[^\\.]*}",
            "/**/{path:^(?!api$)[^\\.]*}"
    })
    public String forward() {
        return "forward:/index.html";
    }

}
