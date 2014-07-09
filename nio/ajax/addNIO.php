<?php

///This is to ADD entry or entries to the NIO database.

include 'dbConnection.php';

$empID = 1;
$empName = 'Roshan';
$data = $_POST['data'];
$description = "Forgot ID card";
$nioType = 1;
$nioStatus = 0;
$appDate = date('Y-m-d H:i:s');
$duration = 0;

$dataLength = count($data);

$query = "SELECT MAX(nio_id) AS max FROM hs_hr_nio";
$result = mysqli_query($nio_conn, $query);
$row = mysqli_fetch_array($result);
$nioID = $row['max'] + 1;

if (!$nioID) {
    $nioID = 1;
}

$query = "INSERT INTO hs_hr_nio_request(nio_id,nio_date_applied,nio_type,nio_description) VALUES ('$nioID','$appDate','$nioType','left id card')";
$result = mysqli_query($nio_conn, $query);
$query = "SELECT MAX(nio_request_id) FROM hs_hr_nio_request WHERE nio_id='$nioID'";
$result = mysqli_query($nio_conn, $query);
$rowRequest = mysqli_fetch_array($result);
$nioRequestID = $rowRequest[0];

$i = 0;
while ($i < $dataLength) {
    $nioDate = date('y-m-d', $data[$i]['date'] / 1000);
    $startTime = $data[$i]['startTime'];
    $endTime = $data[$i]['endTime'];
    $status = $data[$i]['status'];

    $duration = $duration+(strtotime($endTime) - strtotime($startTime)) / 60;
    if($status){
    $query = "INSERT INTO hs_hr_nio_details (nio_id,nio_date,nio_start_time,nio_end_time) VALUES ('$nioID','$nioDate','$startTime','$endTime')";
    $result = mysqli_query($nio_conn, $query);
    }

    $i++;
}

$query = "INSERT INTO hs_hr_nio (nio_id,nio_status,nio_request_id,nio_type,emp_id,nio_duration) VALUES ('$nioID','$nioStatus','$nioRequestID','$nioType','$empID','$duration')";
$result = mysqli_query($nio_conn, $query);


echo "okay";
?>