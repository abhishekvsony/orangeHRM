<?php

//Get history of all the NIOs applied by an employee

session_start();
include 'dbConnection.php';
$empID = $_SESSION['empID'];
$query = "SELECT * FROM hs_hr_employee WHERE employee_id='$empID'";
$result = mysqli_query($hrm_conn, $query);
$row = mysqli_fetch_array($result);
$loginName = $row['emp_firstname'] . " " . $row['emp_lastname'];
$empID = $row['emp_number'];

$array = array();
$query = "SELECT * FROM hs_hr_nio WHERE emp_id=$empID";
$result = mysqli_query($nio_conn, $query);
while ($row = mysqli_fetch_array($result)) {
    $nioID = $row['nio_id'];
    $status = $row['nio_status'];

    switch (intval($status, 10)) {
        case 1: $status = "Approved";
            break;
        case 0: $status = "Pending";
            break;
        case -1: $status = "Rejected";
            break;
        case -2: $status = "Cancelled";
            break;
        case -3: $status= "Invalid";
    }

    $duration = $row['nio_duration'];
    $query = "SELECT * FROM hs_hr_nio_request WHERE nio_id=$nioID";
    $request = mysqli_query($nio_conn, $query);
    while ($requestRow = mysqli_fetch_array($request)) {
        $requestID = $requestRow['nio_request_id'];
        $dateApplied = $requestRow['nio_date_applied'];
        $dateApplied = date('d M Y', strtotime($dateApplied));
        $reason = $requestRow['nio_type'];
        if (intval($reason) > 0) {
            $query = "SELECT * FROM hs_hr_nio_types WHERE nio_type_id=$reason";
            $resultType = mysqli_query($nio_conn, $query);
            $rowType = mysqli_fetch_array($resultType);
            $reason = $rowType['nio_type_name'];
        }
        else
            $reason = "other";
        $array[] = array('nioID' => $nioID, 'status' => $status, 'duration' => $duration, 'reqID' => $requestID, 'appDate' => $dateApplied, 'reason' => $reason);
    }
}
$jsonData = $array;
echo json_encode($jsonData);
?>
