<?php

include 'dbConnection.php';
$empID=1;
$array=array();
$query="SELECT * FROM hs_hr_nio WHERE emp_id=$empID";
$result=  mysqli_query($nio_conn, $query);
while($row=  mysqli_fetch_array($result)){
 $nioID=$row['nio_id'];
 $status=$row['nio_status'];
 
 switch(intval($status,10)){
    case 1: $status="Approved";break;
    case 0: $status="Pending";break;
    case -1: $status="Rejected";break;
    case -2: $status="Cancelled";break;
}
 
 $duration=$row['nio_duration'];
 $query="SELECT * FROM hs_hr_nio_request WHERE nio_id=$nioID";
 $request=  mysqli_query($nio_conn, $query);
 while($requestRow=mysqli_fetch_array($request)){
     $requestID=$requestRow['nio_request_id'];
     $dateApplied=$requestRow['nio_date_applied'];
     $dateApplied=date('d M Y',  strtotime($dateApplied));
     $reason=$requestRow['nio_type'];
     $array[]=array('nioID'=>$nioID,'status'=>$status,'duration'=>$duration,'reqID'=>$requestID,'appDate'=>$dateApplied,'reason'=>$reason);
 }
}
$jsonData = $array;
echo json_encode($jsonData);
?>
