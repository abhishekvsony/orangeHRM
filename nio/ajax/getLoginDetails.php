<?php
include 'dbConnection.php';
$empID=$_SESSION['empID'];
$query="SELECT * FROM hs_hr_employee WHERE employee_id='$empID'";
$result=  mysqli_query($hrm_conn, $query);
$row=  mysqli_fetch_array($result);
$loginName=$row['emp_firstname']." ".$row['emp_lastname'];
$empID=$row['emp_number'];
$LOGINID=$empID;
$JOB_TITLE=$row['job_title_code'];
$query="SELECT * FROM hs_hr_nio_employee WHERE emp_id='$empID'";
$result=  mysqli_query($nio_conn, $query);
$row=  mysqli_fetch_array($result);
$ADMIN_STAT=$row['nio_admin'];
$SUPER_ADMIN_STAT=$row['nio_super_admin'];
$NIO_STAT=$row['nio_status'];
?>
