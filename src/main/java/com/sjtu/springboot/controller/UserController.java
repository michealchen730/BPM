package com.sjtu.springboot.controller;

import com.sjtu.springboot.model.User;
import com.sjtu.springboot.service.serviceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller

@RequestMapping("/user")
public class UserController {

    private UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService){
        this.userService=userService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") Integer id){
        return userService.getUserById(id);
    }

    @GetMapping("/all")
    public ModelAndView selectAll(){
        List<User> list=userService.getAllUser();
        return new ModelAndView("showAllUser","list",list);
    }

    @GetMapping("/change")
    public ModelAndView changeTest(){
        userService.switchAge(4,5);
        List<User> list=userService.getAllUser();
        return new ModelAndView("showAllUser","list",list);
    }
    @GetMapping("/login")
    public String toLogin(){
        return "login";
    }

    @PostMapping("/dologin")
    public void doLogin(User user){
        System.out.println(user.getName());
        System.out.println(user.getPassword());

    }

    @GetMapping("/register")
    public String toRegister(){
        return "register";
    }

    @PostMapping("/doregister")
    public void doRegister(User user){
        System.out.println(user.getName());
        System.out.println(user.getPassword());

    }

    @PostMapping("/checkUser")
    @ResponseBody
    public String checkUser(String userName){
        List<User> userList = userService.selectUserByName(userName);
        if(userList.isEmpty()){
            return "no";
        }else{
            return "yes";
        }
    }

    @RequestMapping("/test")
    public String toTest(){
        return "test";
    }


}
