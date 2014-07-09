<?php

//This is to fetch the Employee names and ther respective IDs
//This is also to fetch employee designations and their IDS
//This is used in Admin/NIO

include 'dbConnection.php';

$empStatus='EST000';

$employeeData=array();
$designationData=array();
$nio=array();


$query="SELECT * FROM hs_hr_employee";
$result=  mysqli_query($hrm_conn, $query);
while($row=  mysqli_fetch_array($result)){
    $name=$row['emp_firstname']." ".$row['emp_lastname'];
    $empID=$row['emp_number'];
    $employeeData[]=array('label'=>$name,'value'=>$empID);
}

$query="SELECT * FROM hs_hr_job_title";
$result=  mysqli_query($hrm_conn, $query);
while($row=  mysqli_fetch_array($result)){
    $id=$row['jobtit_code'];
    $name=$row['jobtit_name'];
    $designationData[]=array('label'=>$name,'value'=>$id);
}

$query="SELECT * FROM hs_hr_nio_types WHERE flag=1";
$result=mysqli_query($nio_conn, $query);
$nioID=1;
while($row=mysqli_fetch_array($result)){
    $nioTypeName=$row['nio_type_name'];
    $nioTypeID=$row['nio_type_id'];
    $dept=array();
    $emp=array();
    
    $query="SELECT * FROM hs_hr_nio_type_employee WHERE nio_type_id=$nioTypeID AND flag=1";
    $empResult=  mysqli_query($nio_conn, $query);
    while($empRow=mysqli_fetch_array($empResult)){
        $emp[]=$empRow['emp_id'];
    }
    
    $query="SELECT * FROM hs_hr_nio_department WHERE nio_type_id=$nioTypeID AND flag=1";
    $deptResult=  mysqli_query($nio_conn, $query);
    while($deptRow=mysqli_fetch_array($deptResult)){
        $dept[]=$deptRow['dept_id'];
    }
    
    $nio[]=array('nioID'=>$nioID,'nioDepartment'=>$dept,'nioEmployee'=>$emp,'nioName'=>$nioTypeName,'id'=>$nioTypeID);
    
    $nioID++;
}

$jsonData=array();
$jsonData['empName']=$employeeData;
$jsonData['designations']=$designationData;
$jsonData['nio']=$nio;
echo json_encode($jsonData);
?>
