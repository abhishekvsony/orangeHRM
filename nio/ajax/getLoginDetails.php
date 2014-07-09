<?php
include 'dbConnection.php';
$query="SELECT * FROM hs_hr_employee WHERE emp_number='$empID'";
$result=  mysqli_query($hrm_conn, $query);
$row=  mysqli_fetch_array($result);
$loginName=$row['emp_firstname']." ".$row['emp_lastname'];
?>
