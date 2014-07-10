<?php

include 'dbConnection.php';

$admin=array();     //List of employee with admin privilege
$superAdmin=array();//List of employee with superAdmin privilege
$noAccess=array();  //List of employee who dont have access to NIO system

$query="SELECT * FROM hs_hr_nio_employee WHERE nio_status=false";
$result=mysqli_query($nio_conn,$query);
while($row=mysqli_fetch_array($result)){
    $noAccess[]=$row['emp_id'];
}


$query="SELECT * FROM hs_hr_nio_employee WHERE nio_admin=true";
$result=mysqli_query($nio_conn,$query);
while($row=mysqli_fetch_array($result)){
    $admin[]=$row['emp_id'];
}


$query="SELECT * FROM hs_hr_nio_employee WHERE nio_super_admin=true";
$result=mysqli_query($nio_conn,$query);
while($row=mysqli_fetch_array($result)){
    $superAdmin[]=$row['emp_id'];
}

$jsonData=array();
$jsonData['admin']=$admin;
$jsonData['superAdmin']=$superAdmin;
$jsonData['noAccess']=$noAccess;

echo json_encode($jsonData);
?>
