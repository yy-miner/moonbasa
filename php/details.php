<?php

require "conn.php";

 if(isset($_GET['picid'])){
    $sid=$_GET['picid'];
    $result=$conn->query("select * from oplist where picid='$sid' ");
     echo json_encode($result->fetch_assoc());
 }

 ?>