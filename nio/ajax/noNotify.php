<?php

$attID=$_POST['caseID'];

$array=array();

include("dbConnection.php");

$query="SELECT * FROM hs_hr_nio_attendance WHERE att_id=$attID";

$result=  mysqli_query($nio_conn, $query);
$row= mysqli_fetch_array($result);

$empID= $row['emp_id'];
$date=$row['date'];
$dateFormat=date('D,M d,Y',strtotime($date));

$query="SELECT * FROM hs_hr_employee WHERE emp_number=$empID";
$result=  mysqli_query($hrm_conn, $query);
$rowEmployee=  mysqli_fetch_array($result);
$empName = $rowEmployee['emp_firstname'] . " " . $rowEmployee['emp_lastname'];


$array['genDetails']=array("empID"=>$empID,"empName"=>$empName,'date'=>$dateFormat);

$query="SELECT * FROM hs_hr_attendance WHERE date(punchin_time)=$date AND employee_id=$empID";
$result=  mysqli_query($hrm_conn, $query);
while($row=  mysqli_fetch_array($result)){
    $attID=$row['attendance_id'];
    $inTime=$row['punchin_time'];
    $outTime=$row['punchout_time'];
    $duration=strtotime($date." ".$outTime)-strtotime($date." ".$inTime);
    $duration=$duration/60;
    $array[]=array("attID"=>$attID,"inTime"=>$inTime,"outTime"=>$outTime,"duration"=>$duration);
}

$jsonData=$array;
echo json_encode($jsonData);
?>
