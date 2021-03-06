package com.sjtu.springboot.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.sjtu.springboot.model.User;
import com.sjtu.springboot.service.serviceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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



    @PostMapping("/dologin")
    public void doLogin(User user){
        System.out.println(user.getName());
        System.out.println(user.getPassword());

    }

    @GetMapping("/register_u")
    public String toRegister(){
        return "register_u";
    }

    @GetMapping("/register_s")
    public String toRegisterS(){
        return "register_s";
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
    

    
    @GetMapping("/um")
    public String toAdminUM(){
        return "admin_UM";
    }

    @GetMapping("/rc")
    public String toAdminRC(){
        return "admin_RC";
    }



    @GetMapping("/si")
    public String toShopkeeperSI(){
        return "shopkeeper_si";
    }

    @GetMapping("/shop")
    public String toShop(){
        return "user_shop";
    }


    @GetMapping("/user_add")
    public String toUserAdd(){
        return "user_add";
    }

    @GetMapping("/manager_store_add")
    public String toStoreAdd(){
        return "store_add";
    }

    @GetMapping("/UD")
    public ModelAndView toUserDetail(String id){
        ModelAndView mv=new ModelAndView();
        mv.setViewName("admin_UD");
        mv.addObject("id",id);
        return mv;
    }

    @GetMapping("/commodity_add")
    public String toCommodityAdd(){
        return "commodity_add";
    }

    @GetMapping("/SD")
    public ModelAndView toStoreDetail(String id){
        ModelAndView mv=new ModelAndView();
        mv.setViewName("admin_SD");
        mv.addObject("id",id);
        return mv;
    }

    @GetMapping("/appuser")
    public String toAppUser(){
        return "appuser_map";
    }


    /**
     * 去到管理员界面
     * @param username
     * @param request
     * @return
     */
    @GetMapping("/adminn")
    public String toAdminn(String username, String userid,HttpServletRequest request){
        request.getSession().setAttribute("nameofuser",username);
        request.getSession().setAttribute("idofuser",userid);
        return "admin";
    }

    /**
     * 去到商店店主界面
     * @param username
     * @param request
     * @return
     */
    @GetMapping("/shopkeeperr")
    public String toShopkeeperr(String username, String userid,HttpServletRequest request){
        request.getSession().setAttribute("nameofuser",username);
        request.getSession().setAttribute("idofuser",userid);
        return "shopkeeper";
    }

    /**
     * 登陆
     * @return
     */
    @GetMapping("/login")
    public String toLogin(){
        return "login";
    }

    /**
     * 登出
     * @param session
     * @return
     */
    @GetMapping("/logout")
    public String toLogout(HttpSession session) {
        session.removeAttribute("nameofuser");
        session.removeAttribute("idofuser");
        return "login";
    }
    /**
     * 去到管理员界面
     * @return
     */
    @GetMapping("/admin")
    public String toAdmin(){
        return "admin";
    }

    /**
     * 去到商店店主界面
     * @return
     */
    @GetMapping("/shopkeeper")
    public String toShopkeeper(){
        return "shopkeeper";
    }

    @GetMapping("/consumer")
    public String toConsumer(String username, String userid,HttpServletRequest request){
        request.getSession().setAttribute("nameofuser",username);
        request.getSession().setAttribute("idofuser",userid);
        return "consumer_map";
    }

    @GetMapping("/consumer_cb")
    public ModelAndView toCCommodityBrowse(String id){
        ModelAndView mv=new ModelAndView();
        mv.setViewName("consumer_cb");
        mv.addObject("id",id);
        return mv;
    }

    @GetMapping("/map")
    public String toConsumerMap(){
        return "consumer_map";
    }

    @GetMapping("/mo")
    public String toMyOrder(){
        return "consumer_mo";
    }

    @GetMapping("/mmo")
    public String toMessengerMyOrder(){
        return "messenger_mo";
    }



    @GetMapping("/templates")
    public String toTemplates(){
        return "templates";
    }

    @GetMapping("/templates_test")
    public String toTemplatesTest(){
        return "templates_test";
    }


    //去用户主界面
    @GetMapping("/main")
    public String toUserMain(){
        return "consumer_map";
    }

    //订单管理
    @GetMapping("/om")
    public String toOrderManager(){
        return "admin_OM";
    }

    //订单详情管理
    @GetMapping("/od")
    public String toOrderDetail(){
        return "admin_OD";
    }
    //订单详情管理
    @GetMapping("/getpath")
    public String toPath(){
        return "path";
    }

    @GetMapping("/cod")
    public ModelAndView toConsumerOrderDetail(String id){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("consumer_od");
        modelAndView.addObject("orderid",id);
        return modelAndView;
    }



//    @PostMapping("/getPath")
//    public String getPath(@RequestBody String json){
//        /*JSONPObject rootObject=new JSONPObject(json);
//
//
//        System.out.println("收到请求");
//        System.out.println(json);*/
//        return "login";
//    }





}
