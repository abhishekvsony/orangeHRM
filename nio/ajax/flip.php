<?php

$flip = $_POST['flip'];

session_start();
include_once 'getLoginDetails.php';

$LOGINID = intval($LOGINID);
$table = $databaseHRM . ".hs_hr_emp_reportto";


if ($flip == 2) {
    if ($ADMIN_STAT || $SUPER_ADMIN_STAT)
        $query = "SELECT COUNT(*) FROM hs_hr_nio WHERE nio_status=0";
    else
        $query = "SELECT COUNT(*) FROM hs_hr_nio WHERE nio_status=0 AND emp_id IN
        (SELECT erep_sub_emp_number 
        FROM $table WHERE erep_sup_emp_number=$LOGINID)";
    $result = mysqli_query($nio_conn, $query);
    $row = mysqli_fetch_array($result);

    $array = array();
    $array[] = array('nioCount' => $row[0]);
    $jsonData = $array;
    echo json_encode($jsonData);
} else
if ($flip == 1) {
    if ($ADMIN_STAT || $SUPER_ADMIN_STAT)
        $query = "SELECT COUNT(DISTINCT leave_request_id) FROM hs_hr_leave WHERE leave_status=1";
    else
        $query = "SELECT COUNT(DISTINCT leave_request_id) FROM hs_hr_leave WHERE leave_status=1 AND emp_id IN
        (SELECT erep_sub_emp_number 
        FROM $table WHERE erep_sup_emp_number=$LOGINID)";
    $result = mysqli_query($hrm_conn, $query);
    $row = mysqli_fetch_array($result);

    $array = array();
    $array[] = array('leaveCount' => $row[0]);
    $jsonData = $array;
    echo json_encode($jsonData);
}
?>
