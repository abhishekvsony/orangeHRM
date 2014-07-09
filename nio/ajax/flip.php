<?php

$flip = $_POST['flip'];

include_once('dbConnection.php');


if ($flip == 2) {
    $query = "SELECT COUNT(*) FROM hs_hr_nio WHERE nio_status=0";
    $result = mysqli_query($nio_conn, $query);
    $row = mysqli_fetch_array($result);

    $array = array();
    $array[] = array('nioCount' => $row[0]);
    $jsonData = $array;
    echo json_encode($jsonData);
} else
if ($flip == 1) {
    $query = "SELECT COUNT(DISTINCT leave_request_id) FROM hs_hr_leave WHERE leave_status=1";
    $result = mysqli_query($hrm_conn, $query);
    $row = mysqli_fetch_array($result);

    $array = array();
    $array[] = array('leaveCount' => $row[0]);
    $jsonData = $array;
    echo json_encode($jsonData);
}
?>
