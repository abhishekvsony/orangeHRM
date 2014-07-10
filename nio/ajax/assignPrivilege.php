<?php

include 'dbConnection.php';

$empID=$_POST['empID'];
$status=$_POST['status'];
$table=$_POST['table'];
switch($table){
    case 1:             //if admin
        $query="UPDATE hs_hr_nio_employee SET nio_admin=$status WHERE emp_id=$empID";
        break;
    case 2:             //if super admin
        $query="UPDATE hs_hr_nio_employee SET nio_super_admin=$status WHERE emp_id=$empID";
        break;
    case 3:             //if no nio table
        $query="UPDATE hs_hr_nio_employee SET nio_status=$status WHERE emp_id=$empID";
        break;
}
$result=mysqli_query($nio_conn,$query);
echo $result;
?>
