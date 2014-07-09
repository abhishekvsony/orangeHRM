<?php

include("dbConnection.php");
$dateselected = $_POST['dateselected'];
    
//$monthselected = $_POST['monthselected'];
//$yearselected = $_POST['yearselected'];
$number_of_days_in_week = 7;
$minimum_working_hours_in_a_day = 10;
$number_of_weeks_in_a_month = 5;
$number_of_months_in_a_year = 12;
$minimum_working_hours_in_a_week = 40;
$minimum_working_hours_in_a_month = 160;
//echo '$dateselected';

$series = array();
$work_inday = array();
$yettowork_inday = array();
$day = array();





$dateselected = strtotime($dateselected);
$dateselected = date('Y-m-d', strtotime('this week last monday', $dateselected));
$dateselected = strtotime($dateselected);
$i = 0;
for ($i = 0; $i < $number_of_days_in_week; $i++) {

    $dateincremented = date('Y-m-d', $dateselected);
    $query = " SELECT * FROM hs_hr_nio_attendance WHERE emp_id=1 AND date='$dateincremented'";
    $result = mysqli_query($nio_conn, $query);
    $row = mysqli_fetch_array($result);
    $work_inday[] = $row['duration'] / 60;
    $yettowork_inday[] = $minimum_working_hours_in_a_day - ($row['duration'] / 60);
       $day[] = date("d M Y-D", $dateselected);
    $dateselected = ($dateselected + 24 * 3600);
    $dateincremented = date('y-m-d', $dateselected);
}

$series[] = $work_inday;
$series[] = $yettowork_inday;
$series[] = $day;
echo json_encode($series);
?>
