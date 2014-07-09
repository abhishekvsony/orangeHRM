<?php

include 'dbConnection.php';

$leavePage=$_POST['page']-1;

$query = "SELECT * FROM hs_hr_employee LIMIT $leavePage,8";
$result = mysqli_query($hrm_conn, $query);

$empNames=array();
$leaveLeft=array();
$leaveTaken=array();

while ($row = mysqli_fetch_array($result)) {
    $empID=$row['emp_number'];
    $query = "SELECT * FROM hs_hr_employee_leave_quota WHERE employee_id=$empID";
    $leave = mysqli_query($hrm_conn, $query);
    $totalNumber=0;
    $taken=0;
    while ($rowLeave = mysqli_fetch_array($leave)) {
        $totalNumber+=$rowLeave['no_of_days_allotted'];
        $taken+=$rowLeave['leave_taken'];
    }
    $name=$row['emp_firstname']." ".$row['emp_lastname'];
    $empNames[]=$name;
    $leaveLeft[]=$totalNumber-$taken;
    $leaveTaken[]=$taken;
}

$jsonData=array();
$jsonData[]=$empNames;
$jsonData[]=$leaveTaken;
$jsonData[]=$leaveLeft;

echo json_encode($jsonData);
?>
