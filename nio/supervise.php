<!DOCTYPE">
<html>
    <head>
        <title>NIO-Supervise</title>
        <link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.4.css"/>
        <link rel="stylesheet" type="text/css"  href="fonts/custom_fonts.css"/>
        <link rel="stylesheet" type="text/css"  href="css/jquery.mCustomScrollbar.css"/>
        <link rel="stylesheet" type="text/css" href="css/colorCombo.css"/>
        <link rel="stylesheet" type="text/css" href="css/magnific-popup.css"/>
        <link rel="stylesheet" type="text/css"  href="css/buttons.css"/>
        <link rel="stylesheet" type="text/css" href="css/MetroJs.css"/>
        <link rel="stylesheet" href="css/template.css" type="text/css" />
        <link rel="stylesheet" type="text/css"  href="css/admin.css"/> 
        <link rel="stylesheet" type="text/css"  href="css/adminTables.css"/> 
    </head>
    <body class="template-bg">
        <?php
        require_once("header.php");
        ?>
        <div class="template-wrapper template-contents">

            <ul class="admin-flip-container template-tile-back">
                <li>
                    <div class="admin-flip live-tile" id='leaveCount'>
                        <div class="admin-flip-part1 template-tile">
                            <img src="./images/leave_black.png"/>
                            <span>Leave Applications Pending</span>
                        </div>
                        <div class="admin-flip-part2 template-tile"><h1 style="font-size : 50; text-align: center;padding-top: 30px">0</h1></div>
                    </div>
                </li>
                <li>
                    <div class="admin-flip live-tile" id="nioCount">
                        <div class="admin-flip-part1 template-tile">
                            <img src="./images/nio_black.png"/>
                            <span>NIO Applications Pending</span>
                        </div>
                        <div class="admin-flip-part2 template-tile"><h1 style="font-size : 50; text-align: center;padding-top: 30px">0</h1></div>
                    </div>
                </li>
            </ul>
            <div class="admin-container" id="admin-main-menu">
                <div class="admin-graph-controlShow">CHART</div>
                <div class="admin-graph-box">

                    <div class="admin-graph-controller template-darkBack" id="adminGraphController">
                        <table class="adminTable-menu">
                            <tr class="titleTr-graph template-lightBack">
                                <td class="titleTd-chart" id="nav-leave-chart" chartNumber=1>Leave Chart</td>
                                <td class="titleTd-chart" id="nav-nio-chart" chartNumber=2>NIO Chart</td>
                            </tr>
                        </table>
                        <div id="closeGraph">
                            <img src="images/close_graph_black.png" title="This is my tooltip">
                        </div>
                    </div>
                    <div class="admin-graph-container"></div>
                    <div id="admin-graph-left"><img src="images/left_arrow.png"></div>
                    <div id="admin-graph-right"><img src="images/right_arrow.png"></div>
                </div>

                <div class="admin-data-container">
                    <table class="adminTable-menu">
                        <tr class="titleTr template-lightBack">
                            <td class="titleTd" id="table-noStatus">NIO or Leave not applied</td>
                            <td class="titleTd" id="table-unapproved">Unapproved NIOs</td>
                            <td class="titleTd" id="table-approved">Approved NIOs</td>
                        </tr>
                    </table>

                    <div class="admin-table-div" id="table-noStatusTable" tableNumber="1">
                        <table class="flatTable-heading template-lightBack"  tableNumber=1>
                            <tr class="headingTr template-lightBack">
                                <td>CASE ID</td>
                                <td>EMPLOYEE ID</td>
                                <td>EMPLOYEE NAME</td>
                                <td>DATE</td>
                                <td>IN OFFICE</td>
                            </tr>
                        </table>
                        <div class="admin-table-container">
                            <table class="flatTable table-row-noStatusTable">
                                
                            </table>
                        </div>
                    </div>

                    <div class="admin-table-div" id="table-unapprovedTable" tableNumber=2>
                        <table class="flatTable-heading template-lightBack"  tableNumber=2>
                            <tr class="headingTr template-lightBack">
                                <td>EMPLOYEE ID</td>
                                <td>EMPLOYEE NAME</td>
                                <td>REASON</td>
                                <td>START DATE</td>
                                <td>END DATE</td>
                                <td>DURATION</td>
                            </tr>
                        </table>
                        <div class="admin-table-container">
                            <table class="flatTable table-row-unapprovedTable">

                            </table>
                        </div>
                    </div>

                    <div class="admin-table-div" id="table-approvedTable" tableNumber=3>
                        <table class="flatTable-heading template-lightBack" tableNumber=3>
                            <tr class="headingTr template-lightBack">
                                <td>EMPLOYEE ID</td>
                                <td>EMPLOYEE NAME</td>
                                <td>REASON</td>
                                <td>START DATE</td>
                                <td>END DATE</td>
                                <td>DURATION</td>
                            </tr>
                        </table>
                        <div class="admin-table-container">
                            <table class="flatTable table-row-approvedTable">

                            </table>
                        </div>
                    </div>
                </div>
            </div><!--END OF ADMIN CONTAINER-->
            <div id="popUp-noStatus">

            </div>
            <div id="popUp-unapproved">

            </div>
            <div id="popUp-approved">

            </div>
        </div><!--END OF CONTENTS-->


        <script src="js/jquery-1.10.2.js"></script>
        <script src="js/jquery-ui-1.10.4.js"></script>
        <script src="js/MetroJs.js"></script>
        <script src="js/jquery.sticky.js"></script>
        <script src="js/jquery.mCustomScrollbar.js"></script>
        <script src="js/highcharts.js"></script>
        <script language="javascript" type="text/javascript" src="js/supervisor.js"></script>
    </body>
</html>