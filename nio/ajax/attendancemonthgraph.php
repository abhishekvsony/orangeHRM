<?php

include("dbConnection.php");
$yearselected = $_POST['yearselected'];

$minimum_working_hours_in_a_week = 40;
$minimum_working_hours_in_a_month = 250;
$series = array();
$work = array();
$yettowork = array();
$month = array();

$yearselected = strtotime($yearselected);
$year = date("Y", $yearselected);
$startdate = date($year + '-01-01');
$startstring = strtotime($startdate);
$start = date('Y/m/d', $startstring);

$i = 0;
//for last datein a month
    function lastday($month = '', $year) {
        if (empty($month)) {
            $month = date('m');
        }
        if (empty($year)) {
            $year = date('Y');
        }
        $result = strtotime("{$year}-{$month}-01");
        $result = strtotime('-1 second', strtotime('+1 month', $result));
        return date('Y-m-d', $result);
    }

//for first day of the month
    function firstDay($month = '', $year) {
        if (empty($month)) {
            $month = date('m');
        }
        if (empty($year)) {
            $year = date('Y');
        }
        $result = strtotime("{$year}-{$month}-01");
        return date('Y-m-d', $result);
    }


for ($i = 1; $i <= 9; $i++) {

    
    $firstdate = firstDay($i, $year);
    $lastdate = lastday($i, $year);
   // $yearincremented = date('Y-m-d', $yearselected);
    $query = "SELECT SUM(duration) AS duration FROM hs_hr_nio_attendance WHERE emp_id=1 AND date BETWEEN '$firstdate' AND  '$lastdate'";
    $result = mysqli_query($nio_conn, $query);
    $row = mysqli_fetch_array($result);
    $work[] = $row['duration'] / 60;
    $yettowork[] = $minimum_working_hours_in_a_month - ($row['duration'] / 60);
    $firstdatestr=strtotime($firstdate);
    $month[$i-1] = date("M-Y",  $firstdatestr);
   
}

$series[] = $work;
$series[] = $yettowork;
$series[] = $month;
echo json_encode($series);
?>

