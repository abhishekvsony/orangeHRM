<?php

$numberOfElements = 8;
$page = $_POST['page']-1;
include("dbConnection.php");
$query = "SELECT * FROM hs_hr_nio_employee LIMIT $page,$numberOfElements";
$result = mysqli_query($nio_conn, $query);

$series = array();

$nioApplied = array();
$nioAccepted = array();
$data = array();

while ($row = mysqli_fetch_array($result)) {
    $empID = $row['emp_id'];
    $query = "SELECT * FROM hs_hr_employee WHERE emp_number=$empID";
    $emp = mysqli_query($hrm_conn, $query);
    $emp = mysqli_fetch_array($emp);
    $empName = $emp['emp_firstname'] . " " . $emp['emp_lastname'];
    $data[] = $empName;
    $nioApplied[] = $row['nio_applied_count'];
    $nioAccepted[] = $row['nio_accepted_count'];
}
$series[] = $nioApplied;
$series[] = $nioAccepted;

$series[] = $data;

echo json_encode($series);
?>
