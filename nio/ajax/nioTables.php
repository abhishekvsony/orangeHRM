<?php

//Populate the tables

session_start();
include_once 'getLoginDetails.php';

$tableNumber = (int) $_POST['tableNumber'];
$recordNumber = (int) $_POST['record'] - 1;
$LOGINID = intval($LOGINID);
$table = $databaseHRM . ".hs_hr_emp_reportto";

$array = array();
if ($tableNumber == 2 || $tableNumber == 3) {
    if ($tableNumber == 2)
        if ($ADMIN_STAT || $SUPER_ADMIN_STAT)
            $query = "SELECT * FROM hs_hr_nio WHERE nio_status=0 ORDER BY nio_id DESC LIMIT $recordNumber,25";
        else
            $query = "SELECT * FROM hs_hr_nio WHERE nio_status=0 AND emp_id IN
        (SELECT erep_sub_emp_number 
        FROM $table WHERE erep_sup_emp_number=$LOGINID) ORDER BY nio_id DESC LIMIT $recordNumber,25";
    else
        if ($ADMIN_STAT || $SUPER_ADMIN_STAT)
            $query = "SELECT * FROM hs_hr_nio WHERE nio_status=1 ORDER BY nio_id DESC LIMIT $recordNumber,25";
        else
        $query = "SELECT * FROM hs_hr_nio WHERE nio_status=1 AND emp_id IN
        (SELECT erep_sub_emp_number 
        FROM $table WHERE erep_sup_emp_number=$LOGINID) ORDER BY nio_id DESC LIMIT $recordNumber,25";
    $recordResult = mysqli_query($nio_conn, $query);
    while ($record = mysqli_fetch_array($recordResult)) {
        $empID = $record['emp_id'];
        $nioID = $record['nio_id'];
        $duration = $record['nio_duration'];

        $query = "SELECT * FROM hs_hr_employee WHERE emp_number=$empID";
        $result = mysqli_query($hrm_conn, $query);
        $row = mysqli_fetch_array($result);

        $empName = $row['emp_firstname'] . " " . $row['emp_lastname'];

        $query = "SELECT MAX(nio_request_id) FROM hs_hr_nio_request WHERE nio_id='$nioID'";
        $result = mysqli_query($nio_conn, $query);
        $row = mysqli_fetch_array($result);

        $nioRequestID = $row[0];

        $query = "SELECT * FROM hs_hr_nio_request WHERE nio_request_id='$nioRequestID'";
        $result = mysqli_query($nio_conn, $query);
        $row = mysqli_fetch_array($result);


        $reason = $row['nio_type'];
        $appDate = $row['nio_date_applied'];
        $appDate = date("d-m-Y", strtotime($appDate));
        $duration = intval(($duration / 60), 10) . "h " . ($duration % 60) . "m";
        
        if (intval($reason) > 0) {
            $query = "SELECT * FROM hs_hr_nio_types WHERE nio_type_id=$reason";
            $resultType = mysqli_query($nio_conn, $query);
            $rowType = mysqli_fetch_array($resultType);
            $reason = $rowType['nio_type_name'];
        }
        else
            $reason = "other";
        
        $array[] = array('reason' => $reason, 'empID' => $empID, 'empName' => $empName, 'appDate' => $appDate, 'nioID' => $nioID, 'startDate' => $appDate, 'endDate' => $appDate, 'duration' => $duration);
    }
} else
if ($tableNumber == 1) {
    if ($ADMIN_STAT || $SUPER_ADMIN_STAT)
         $query = "SELECT * FROM hs_hr_nio_attendance WHERE flag=0 ORDER BY date DESC LIMIT $recordNumber,25";
        else
    $query = "SELECT * FROM hs_hr_nio_attendance WHERE flag=0 AND emp_id 
                IN
                (SELECT erep_sub_emp_number 
                FROM $table WHERE erep_sup_emp_number=$LOGINID) ORDER BY date DESC LIMIT $recordNumber,25";           //select people with flag=0 means not worked for min hours
    $result = mysqli_query($nio_conn, $query);
    while ($row = mysqli_fetch_array($result)) {
        $date = $row['date'];
        $date = date('d-m-Y', strtotime($date));
        $duration = $row['duration'];
        $attID = $row['att_id'];
        $empID = $row['emp_id'];
        $query = "SELECT * FROM hs_hr_employee WHERE emp_number='$empID'";
        $employee = mysqli_query($hrm_conn, $query);
        $employee = mysqli_fetch_array($employee);
        $empName = $employee['emp_firstname'] . " " . $employee['emp_lastname'];
        $duration = ($duration / 60) . "h " . ($duration % 60) . "m";
        $array[] = array('date' => $date, 'duration' => $duration, 'attID' => $attID, 'empID' => $empID, 'empName' => $empName);
    }
}
$jsonData = $array;
echo json_encode($jsonData);
?>
