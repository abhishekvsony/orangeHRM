<!DOCTYPE">
<html>
    <head>
        <title>NIO</title>

        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">

        <link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.4.css"/>
        <link rel="stylesheet" type="text/css" href="css/colorCombo.css"/>
        <link rel="stylesheet" href="css/template.css" type="text/css" />
        <link rel="stylesheet" href="css/adminTables.css" type="text/css" />
        <link rel="stylesheet" href="css/fullcalendar.css" type="text/css" />
        <link rel="stylesheet" href="css/applyNIO.css" type="text/css" />
        <!-- from the Calender page -->
        <!--  End of calender page scripts  -->
    </head>
    <body style="overflow-y:visible;" class="template-darkBack template-height" >

        <?php
        require_once 'header.php';
        ?>
        <div class="nio-cal-contents">
            <div id="nio-calendar"></div>
            <div class="nio-selected-contents">
                <div class="nio-cal-info"></div>
                <div class="nio-apply-form">
                    <div class="nio-apply-general">
                        <select id="nio-apply-reason">
                            <option>Forgot ID</option>
                            <option>Business Trip</option>
                            <option>Work from home</option>
                            <option>Meeting with Client</option>
                        </select>
                    </div>
                    <table class="nio-cal-control">    
                        <tr>
                            <td style='margin-left: 0%; padding-left: 0%;;width: 10%;'><input type="checkbox" id="nio-cal-checkbox"/></td>
                            <td><button id="nio-cal-removeButton" class="nio-cal-button">REMOVE</button></td>
                            <td><button id="nio-cal-cancelButton" class='nio-cal-button'>Cancel</button></td>
                            <td><button id="nio-cal-applyButton" class="nio-cal-button">Apply</button></td></tr>
                    </table>
                    <table class="nio-apply-dates"></table>
                </div>
            </div>
        </div>
        <div id="popup-nio-apply"></div>
        <div id="popup-nio-description" style="display: none"><textarea></textarea></div>
        <script src="js/jquery-1.10.2.js"></script>
        <script src="js/jquery-ui-1.10.4.js"></script>
        <script src="js/jquery.mCustomScrollbar.js"></script>
        <script src="js/moment.min.js"></script>
        <script src="js/fullcalendar.min.js"></script>
        <script src="js/employee.js"></script>
    </body>
</html>