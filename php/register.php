<?php
include "conn.php";

//后端获取前端的用户名和数据库进行匹配。
if(isset($_POST['name'])){
    $name=$_POST['name'];
    $result=$conn->query("select * from loginregister where username='$name'");

    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}


//根据form内部name值获取前端表单提交的值
if(isset($_POST['submit'])){
    $username=$_POST['username'];
    $password=sha1($_POST['password']);
    $conn->query("insert usertable values(null,'$username','$password',NOW())");
    //设置跳转的地址
    header('location:http://10.31.158.50/moonbasa/src/login.html');
}