<?php

$nioID=$_POST['nioID'];

$array=array();

include("dbConnection.php");

$query="SELECT * FROM hs_hr_nio WHERE nio_id=$nioID";

$result=  mysqli_query($nio_conn, $query);
$rowNIO= mysqli_fetch_array($result);

$empID= $rowNIO['emp_id'];
$nioRequestID=$rowNIO['nio_request_id'];
$reason=$rowNIO['nio_type'];
$status=$rowNIO['nio_status'];

switch(intval($status,10)){
    case 1: $status="Approved";break;
    case 0: $status="Pending";break;
    case -1: $status="Rejected";break;
    case -2: $status="Cancelled";break;
}


$query="SELECT * FROM hs_hr_employee WHERE emp_number=$empID";
$result=  mysqli_query($hrm_conn, $query);
$rowEmployee=  mysqli_fetch_array($result);
$empName = $rowEmployee['emp_firstname'] . " " . $rowEmployee['emp_lastname'];

$query="SELECT * FROM hs_hr_nio_request WHERE nio_request_id=$nioRequestID";
$result=  mysqli_query($nio_conn, $query);
$row=  mysqli_fetch_array($result);
$description=$row['nio_description'];
$dateApplied=$row['nio_date_applied'];
$dateApplied=date('D,M d,Y',strtotime($dateApplied));
$array['genDetails']=array("status"=>$status,"empID"=>$empID,"empName"=>$empName,"dateApplied"=>$dateApplied,"requestID"=>$nioRequestID,"description"=>$description,"reason"=>$reason);

$query="SELECT * FROM hs_hr_nio_details WHERE nio_id='$nioID'";
$result=  mysqli_query($nio_conn, $query);
while($row=  mysqli_fetch_array($result)){
    $date=$row['nio_date'];
    $startTime=$row['nio_start_time'];
    $endTime=$row['nio_end_time'];
    $duration=strtotime($date." ".$endTime)-strtotime($date." ".$startTime);
    $duration=$duration/60;
    $array[]=array("date"=>$date,"startTime"=>$startTime,"endTime"=>$endTime,"duration"=>$duration);
}

$jsonData=$array;
echo json_encode($jsonData);
?>
