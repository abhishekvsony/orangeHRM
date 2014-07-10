<?php
ob_start();
session_start();
if (!isset($_SESSION['fname'])) {
    header("Location: ../login.php");
    exit();
}
if (isset($_GET['ACT']) && $_GET['ACT'] == 'logout') {
    session_destroy();
    setcookie('Loggedin', '', time() - 3600, '/');
    header("Location: ../login.php");
    exit();
}
$empID = $_SESSION['empID'];
$SUPERVISOR = false;
include 'ajax/getLoginDetails.php';

if ($_SESSION['isAdmin'] != 'Yes') {
    if ($NIO_STAT == false)
        header("Location: requestForNIO.php");
    else {
        if ($_SESSION['isSupervisor'])
            $SUPERVISOR = true;
    }
} else {
    $ADMIN_STAT = true;
    $SUPERVISOR = true;
}
?>

<div class="template-wrapper template-top template-lightBack">
    <span id="template-login-info" class='template-darkBack'>Welcome <?php echo $loginName; ?></span>
    <div id="template-header">
        <h1 class="template-titleColor" id="title"><a href='index.php'>NIO</a></h1>
        <p class="template-titleSloganColor">Not in Office</p>
        <div class="template-line"></div>
        <div id="template-navigation" class="template-darkBack">
            <div class="template-quicknav">
                <ul>
                    <a href="applyNIO.php"> <li class="template-navList">Apply For NIO </li></a>
                    <a href="index.php"> <li class="template-navList">NIO History</li> </a>
                    <?php
                    if ($SUPERVISOR)
                        echo " <a href='summary.php'> <li class='template-navList'>Work Summary</li></a>";
                    else
                        echo "<a href='summary.php' class='last'> <li class='template-navList'>Work Summary</li></a>";
                    ?>


                    <?php
                    if ($ADMIN_STAT == false && $SUPER_ADMIN_STAT == false && $SUPERVISOR == true)
                        echo " <a href='supervise.php' class='last'> <li class='template-navList'>Supervise</li></a>";
                    ?>


                    <?php
                    if ($ADMIN_STAT == true || $SUPER_ADMIN_STAT == true)
                        echo " <a href='supervise.php'> <li class='template-navList'>Supervise</li></a>";
                    ?>


                    <?php
                    if ($ADMIN_STAT == true || $SUPER_ADMIN_STAT == true)
                        echo " <a href='admin.php' class='last'> <li class='template-navList'>Admin</li></a>";
                    ?>
                </ul>
            </div>
        </div>
    </div>
</div>
