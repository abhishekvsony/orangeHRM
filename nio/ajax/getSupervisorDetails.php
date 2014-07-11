<?php
session_start();
include 'getLoginDetails.php';
$array=array();
$query="SELECT * FROM hs_hr_emp_reportto WHERE erep_sup_emp_number=$LOGINID";
$result=  mysqli_query($hrm_conn, $query);
while ($row=  mysqli_fetch_array($result)){
    $array[]=intval($row['erep_sub_emp_number']);
}

$jsonData['status']=array('admin'=>$ADMIN_STAT,'superAdmin'=>$SUPER_ADMIN_STAT);
$jsonData['subs']=$array;
echo json_encode($jsonData);
?>
