<?php

require "conn.php";

 if(isset($_GET['picid'])){
    $sid=$_GET['picid'];
    $result=$conn->query("select * from oplist where picid='$sid' ");
     echo json_encode($result->fetch_assoc());

 }


// <?php  

// require "conn.php";
// 	$id=$_GET['picid'];
// 	$result=mysql_query("select * from taobaopic where picid=$sid ");
// 	$wronglist=mysql_fetch_array($result,MYSQL_ASSOC);
// 	echo json_encode($wronglist);
// ?>