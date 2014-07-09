<?php

include("dbConnection.php");
$monthselected = $_POST['monthselected'];
$monthstr = strtotime($monthselected);
$monthname=date('m',$monthstr);
$year=date('Y',$monthstr);
$monthstart= firstDay($monthname, $year);
//for first day of the month
    function firstDay($monthname, $year) {
        if (empty($month)) {
            $month = date('m');
        }
        if (empty($year)) {
            $year = date('Y');
        }
        $result = strtotime("{$year}-{$month}-01");
        return date('Y-m-d', $result);
    }
    
    $monthstart=strtotime($monthstart);
 //$monthdate=date('Y-m-d',$monthstart);
$monthdate = date('Y-m-d', $monthstr);
//$monthname=date("m", $monthstr);
$minimum_working_hours_in_a_week = 60;
$series = array();
$workinweek = array();
$yettoworkinweek = array();
$week = array();
//$monthselected=date('Y-m-d',$monthselected);
$i = 0;
$nextweekstart = strtotime(date("Y-m-d", strtotime($monthselected)) . " +7 days");
$nextweek = date('Y-m-d', $nextweekstart);
for ($i = 0; $i < 4; $i++) {
    //to get next 7 days
    // $monthincremented = date('Y-m-d', $monthselected);
    $query = "SELECT SUM(duration) AS duration FROM hs_hr_nio_attendance WHERE emp_id=1 AND date BETWEEN '$monthdate' AND  '$nextweek'";
    // $query = " SELECT * FROM hs_hr_nio_attendance WHERE emp_id=1 AND date='$weekincremented'";
    $result = mysqli_query($nio_conn, $query);
    $row = mysqli_fetch_array($result);
    $workinweek[] = $row[0] / 60;
    $yettoworkinweek[] = $minimum_working_hours_in_a_week - ($row['duration'] / 60);
    $from=date('W-M/Y',strtotime($monthdate));
     $to=date('W-M/Y',strtotime($nextweek));
    $week[]='Week:'.$monthdate.'-->'.$nextweek;
    $nextweektime = strtotime(date("Y-m-d", strtotime($nextweek)) . " +7 days");
    $nextweek= date('Y-m-d', $nextweektime);
    $monthdatetime = strtotime(date("Y-m-d", strtotime($monthdate)) . " +7 days");
    $monthdate= date('Y-m-d', $monthdatetime );
    //  $day[] = date("d M Y-D", $monthselected);
    //  $monthselected = ($monthselected + 7 * 24 * 3600);
    // $weekincremented = date('y-m-d', $monthselected);
}

$series[] = $workinweek;
$series[] = $yettoworkinweek;
$series[] = $week;
echo json_encode($series);
?>
