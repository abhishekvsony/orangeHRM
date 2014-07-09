<?php

include 'dbConnection.php';

//This file to save the given niotypes into database

function checkDepartment($deptID, $nioTypeID) {
    include 'dbConnection.php';
    $query = "SELECT * FROM hs_hr_nio_department WHERE nio_type_id='$nioTypeID' AND dept_id='$deptID'";
    $result = mysqli_query($nio_conn, $query);

    if ($row = mysqli_fetch_array($result)) {
        $query = "UPDATE hs_hr_nio_department SET flag=1 WHERE nio_type_id='$nioTypeID' AND dept_id='$deptID' ";
        $result = mysqli_query($nio_conn, $query);
        return true;
    }
    else
        return false;           //flase if it doesnt exist
}

function checkEmployee($empID, $nioTypeID) {
    include 'dbConnection.php';
    $query = "SELECT * FROM hs_hr_nio_type_employee WHERE nio_type_id=$nioTypeID AND emp_id='$empID'";
    $result = mysqli_query($nio_conn, $query);

    if ($row = mysqli_fetch_array($result)) {
        $query = "UPDATE hs_hr_nio_type_employee SET flag=1 WHERE nio_type_id=$nioTypeID AND emp_id='$empID' ";
        $result = mysqli_query($nio_conn, $query);
        return true;
    }
    else
        return false;           //flase if it doesnt exist
}

$data = $_POST['data'];

$query = "UPDATE hs_hr_nio_types SET flag=0";
$result = mysqli_query($nio_conn, $query);

$query = "UPDATE hs_hr_nio_type_employee SET flag=0";
$result = mysqli_query($nio_conn, $query);

$query = "UPDATE hs_hr_nio_department SET flag=0";
$result = mysqli_query($nio_conn, $query);

$i = 0;
while (!empty($data[$i])) {
    $nioName = $data[$i]['nioName'];
    $nioType = $data[$i]['id'];

    if ($data[$i]['id'] < 0) {
        $query = "INSERT INTO hs_hr_nio_types (flag,nio_type_name) VALUES (1,'$nioName')";
        $result = mysqli_query($nio_conn, $query);

        $query = "SELECT MAX(nio_type_id) FROM hs_hr_nio_types";
        $result = mysqli_query($nio_conn, $query);
        $row = mysqli_fetch_array($result);
        $nioType = $row[0];
    } else {
        $query = "UPDATE hs_hr_nio_types SET flag=1 WHERE nio_type_id=$nioType";
        $result = mysqli_query($nio_conn, $query);
    }


    $j = 0;
    if (count($data[$i]['nioDepartment']) > 0) {
        while ($j < count($data[$i]['nioDepartment'])) {
            $dept = $data[$i]['nioDepartment'][$j];
            if (!checkDepartment($dept, $nioType)) {
                $query = "INSERT INTO hs_hr_nio_department(flag,nio_type_id,dept_id) VALUES (1,'$nioType','$dept')";
                $result = mysqli_query($nio_conn, $query);
            }
            $j++;
        }
    } else {
        $query = "SELECT * FROM hs_hr_job_title";
        $result = mysqli_query($hrm_conn, $query);

        while ($row = mysqli_fetch_array($result)) {
            $dept = $row['jobtit_code'];
            if (!checkDepartment($dept, $nioType)) {
                $query = "INSERT INTO hs_hr_nio_department(flag,nio_type_id,dept_id) VALUES (1,'$nioType','$dept')";
                $flag = mysqli_query($nio_conn, $query);
            }
        }
    }
    $j = 0;
    while ($j < count($data[$i]['nioEmployee'])) {
        $empID = $data[$i]['nioEmployee'][$j];
        if (!checkEmployee($empID, $nioType)) {
            $query = "INSERT INTO hs_hr_nio_type_employee(flag,nio_type_id,emp_id) VALUES (1,'$nioType','$empID')";
            $result = mysqli_query($nio_conn, $query);
        }
        $j++;
    }
    $i++;
}
?>
