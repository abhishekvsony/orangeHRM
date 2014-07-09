<!DOCTYPE">
<html>
    <head>
        <title>NIO</title>
        <link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.4.css"/>
        <link rel="stylesheet" type="text/css" href="css/colorCombo.css"/>
        <link rel="stylesheet" href="css/template.css" type="text/css" />
        <link rel="stylesheet" type="text/css"  href="css/adminTables.css"/> 
        <link rel="stylesheet" type="text/css"  href="css/admin.css"/> 
    </head>
    <body class="template-bg" >
        <?php
        require_once 'header.php';
        ?>
        <div <div class="admin-container2">
                <div class="admin-table-div" id="table-nioHistoryTable">
                    <table class="flatTable-heading template-lightBack">
                        <tr class="headingTr template-lightBack">
                            <td>NIO ID</td>
                            <td>REASON</td>
                            <td>APPLIED ON</td>
                            <td>STATUS</td>
                            <td>DURATION</td>
                        </tr>
                    </table>
                    <div class="admin-table-container">
                        <table class="flatTable table-row-nioHistoryTable">
                        </table>
                    </div>
                </div>
            </div>
            <div id="niohistory-popup"></div>
            <script src="js/jquery-1.10.2.js"></script>
            <script src="js/jquery-ui-1.10.4.js"></script>
            <script src="js/jquery.mCustomScrollbar.js"></script>
            <script src="js/moment.min.js"></script>
            <script src="js/fullcalendar.min.js"></script>
            <script src="js/employee.js"></script>
    </body>
</html>