<?php

//This is to get general details while applying NIO
// ['genDetails']       ---{'allowHolidays' : 'true/false'}
//  ['weekends']          ----{1,2,3,4,5,6,7}
//['holidays']          -----   {dates}
//['nioTypes']          -----[{nioID:1,
//                              nioName: forgot ID}]
session_start();
include 'getLoginDetails.php';

$weekends=array();
$holidays=array();
$nioTypes=array();
$genDetails=array();

$query="SELECT * 
        FROM hs_hr_nio_types
        WHERE flag=1 AND nio_type_id IN(
        SELECT hs_hr_nio_department.nio_type_id 
        FROM hs_hr_nio_department, hs_hr_nio_type_employee
        WHERE hs_hr_nio_department.flag=1 AND hs_hr_nio_type_employee.flag=1 
        AND (emp_id=$LOGINID OR dept_id='$JOB_TITLE')
        )";
$result=  mysqli_query($nio_conn, $query);
while($row=  mysqli_fetch_array($result)){
    $nioTypes[]=array('nioTypeID'=>$row['nio_type_id'],'nioTypeName'=>$row['nio_type_name']);
}

$jsonData=array();
$jsonData['nioTypes']=$nioTypes;
echo json_encode($jsonData);
?>
