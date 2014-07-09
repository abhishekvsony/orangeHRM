<?php

/*
    Structure of the Json to passback
 * date               
 * startTime
 * endTime
 * type             : Is it a leave day or NIO day
 * status           : approved cancelled or etc...
 *  */

include 'dbConnection.php';

$empID=1;
$data=array();


$query="SELECT * FROM hs_hr_nio WHERE emp_id='$empID'";
$result=  mysqli_query($nio_conn, $query);
 while($row=  mysqli_fetch_array($result)){
     $type=1;       //IT is NIO type
     $status=$row['nio_status'];
     $nioID=$row['nio_id'];
     $query="SELECT * FROM hs_hr_nio_details WHERE nio_id='$nioID'";
     $resultDetails=  mysqli_query($nio_conn, $query);
     while($rowDetail=  mysqli_fetch_array($resultDetails)){
         $date=$rowDetail['nio_date'];
         $date=  strtotime($date)*1000;
         
         $startTime=$rowDetail['nio_start_time'];
         $endTime=$rowDetail['nio_end_time'];
         if($status!=-2)
         $data[]=array('date'=>$date,'startTime'=>$startTime,'endTime'=>$endTime,'type'=>$type,'status'=>$status);
     }
 }

 $jsonData=$data;
 echo json_encode($jsonData);