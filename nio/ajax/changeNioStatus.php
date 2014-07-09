<?php
$nioID=$_POST['nioID'];
$nioStatus=$_POST['status'];

include("dbConnection.php");

$query="UPDATE hs_hr_nio SET nio_status=$nioStatus WHERE nio_id=$nioID";
$result=  mysqli_query($nio_conn,$query);
echo $result;
?>
