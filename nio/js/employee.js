$(document).ready(function() {

    $("#nio-cal-checkbox").attr('disabled', true).prop('checked', false);  //setting the global checkbox disabled and unchecked
    var aspectRatio;
    aspectRatio = ($(document).width() * 0.73) / ($(document).height() * 0.792);


    var dateObject = [];        //Array that stores the detail of the CURRENT NIO
    var dateObjectHistory=[];   //Array that stotes the details of ALL THE APPLICATIONS
    var index = 0;          //Uniquw Number to access the NIO dates and the events
    var recordNumber = 1;       //Keep track of the number of entries in the table of NIO History
    var dropDown_1 = "";        // 00 to 2330
    var dropDown_2 = "";        // 01 to 2400

    //-------------------COLORS-------------------------

    var NIO_CURR = '#F9C775';       //curretly applying NIO color
    var NIO_APPLIED_APPROVED = 'lightgreen';          //already applied NIO
    var NIO_APPLIED_REJECTED='#F76262';
    var NIO_APPLIED_PENDING='#FFFF00';
    var LEAVE_APPLIED = 'red';           //Leave applied

    //-------------------End Of Colors-----------------
    //-------------------Fetch Employee History of NIO----------------------
    
    function fetchEmployeeHistory(fetchHistoryCallBack){
        $.ajax({
            dataType: 'json',
            url: 'ajax/fetchEmployeeApplicationHistory.php',
            type: 'post',
            data: {
                               
            },
            success: fetchHistoryCallBack
        });
    }
    
    function fetchHistoryCallBack(data){
        var i=0;
        console.log(data);
        var dataLength=data.length;
        while(i<dataLength){
            dateObjectHistory.push({
                'date':data[i]['date'],
                'startTime': data[i]['startTime'],
                'endTime': data[i]['endTime'],
                'status': data[i]['status'],
                'type': data[i]['type']
            });
            if(data[i]['type']===1){
                if(data[i]['status']==1)
                    createEvent(data[i]['startTime'], data[i]['endTime'], data[i]['date'], 'NIO', NIO_APPLIED_APPROVED);
                else if(data[i]['status']==-1)
                    createEvent(data[i]['startTime'], data[i]['endTime'], data[i]['date'], 'NIO', NIO_APPLIED_REJECTED);
                else
                    if(data[i]['status']==0)
                    createEvent(data[i]['startTime'], data[i]['endTime'], data[i]['date'], 'NIO', NIO_APPLIED_PENDING);
            }       
            ++i;
        }
    }
    
    fetchEmployeeHistory(fetchHistoryCallBack);

    //------------End of Employee History----------------
    //
    //-------------------DROP DOWN CREATION---------------------------------
    function minToTimeFormat(time) {
        var min = time % 60;
        var hour = Math.floor(time / 60);
        if (hour < 10)
            hour = "0" + hour;
        if (min < 10)
            min = '0' + min;
        time = hour + ":" + min;
        return time;
    }
    //--------------------------DECLARATION OF NIO CALENDAR-----------------------------------------------
    $('#nio-calendar').fullCalendar({
        theme: true,
        firstDay: 0,
        aspectRatio: aspectRatio,
        header: {
            center: 'title',
            right: 'today next nextYear',
            left: 'prevYear prev'
        },
        weekMode: 'liquid',
        selectable: true,
        select: function(start, end, jsEvent, view) {
            $("#nio-cal-checkbox").attr('disabled', false);
            dropDown_1 = "";
            dropDown_2 = "";
            var endDate = end;
            var i = start;
            var startTime = 0;
            var endTime = 24 * 60 -1;
            var period = 30;
            var j = startTime;

            while (j < endTime) {           //setting options
                dropDown_1 += "<option value=" + minToTimeFormat(j) + ">" + minToTimeFormat(j) + "</option>";
                j += period;
            }
            j = startTime + 60;
            while (j <= endTime) {          //setting options
                dropDown_2 += "<option value=" + minToTimeFormat(j) + ">" + minToTimeFormat(j) + "</option>";
                j += period;
            }
            dropDown_2 += "<option value=" + minToTimeFormat(endTime) + ">" + minToTimeFormat(endTime) + "</option>";
            dropDown_1 = dropDown_1 + "</select>";
            dropDown_2 = dropDown_2 + "</select>";

            var temp;       //to check the entry of a date
            while (i < endDate) {       //Making a list of all the dates selected
                temp = i;
                dateObject.push({
                    'id': index,
                    'date': temp.unix() * 1000,
                    'startTime': '09:00',
                    'endTime': '17:00',
                    'status': 0
                });
                index++;

                i.add('days', 1);
            }
            $('.nio-apply-dates').empty();
            i = 0;
            var date;

            dateObject.sort(function(a, b) {
                return parseInt(a.date) - parseInt(b.date)
            });

            while (i < dateObject.length) {
                date = moment(parseInt(dateObject[i].date)).format("YYYY-MM-DD ddd");
                $('.nio-apply-dates').append("<tr class='nio-row-date' id=" + dateObject[i].id + ">" +
                    "<td><input style='margin-left: 1%;float: right' type='checkbox'/></td>" +
                    "<td style='text-align: left;padding: 2%'>" + date + "</td>" +
                    "<td>" + "<select class='nio-starttime-drop' >" + dropDown_1 + " to " + "<select class='nio-endtime-drop'>" + dropDown_2 + "</td>" +
                    "<td class='nio-date-alert'><img class='nio-cal-alert' src='images/exclamation18.png'/></td>" +
                    "<td class='nio-date-remove'><img class='nio-cal-cross' src='images/close_graph_black.png'/></td>" +
                    "</tr>");
                $('.nio-row-date').each(function() {
                    if ($(this).attr('id') == dateObject[i].id) {
                        $(this).find('.nio-starttime-drop').val(dateObject[i].startTime);
                        $(this).find('.nio-endtime-drop').val(dateObject[i].endTime);
                        if (parseInt(dateObject[i].status) == 1) {
                            $(this).find('input').prop('checked', true);
                            $(this).find('.nio-starttime-drop').attr('disabled', true);
                            $(this).find('.nio-endtime-drop').attr('disabled', true);
                        }
                        else
                            $(this).find('input').prop('checked', false);


                        //if the date has status 1 means it is already validated no need to worry!
                        if (dateObject[i].status == 0 && !dateValidation(dateObject[i].date, dateObject[i].startTime, dateObject[i].endTime)) {
                            $(this).find('.nio-cal-alert').css({
                                'display': 'block'
                            });
                        }
                    }
                });
                i++;
            }
            if (dateObject.length == 0)
                $("#nio-cal-checkbox").attr('disabled', true).prop('checked', false);
            else
                $("#nio-cal-checkbox").prop('checked', false);
        }
    });
    //---------------------------------VALIDATION-----------------------------------

    function dateValidation(date, startTime, endTime) {
        startTime += ":00";
        endTime += ":00";
        date = moment(parseInt(date)).format("YYYY-MM-DD");
        startTime = moment(date + "T" + startTime).unix();
        endTime = moment(date + "T" + endTime).unix();

        if (startTime > endTime)           //Simple validation check startTime endTIme
            return false;

        console.log(endTime - startTime);
        if ((endTime - startTime < 60 * 60)) {
            return false;
        }


        /*
         Now check for dates that user adds date are conflicting for a day.
         eg : 2014-01-01         startTime: 9:00         endTime: 17:00
         2014-01-01          startTime: 16:00           endTIme: 18:00
         */
        var flag = 1;            /// flag=1          Means its a validate entry
        var temp;
        $.each(dateObject, function(j) {  //function to remove object from the array
            console.log(date);
            console.log(moment(parseInt(dateObject[j].date)).format("YYYY-MM-DD"));
            temp = dateObject[j].date;
            if (moment(parseInt(temp)).format("YYYY-MM-DD") === date) {
                if (dateObject[j].status == 1) {  //Only check with cases that are added as events else not required
                    console.log(dateObject[j].id);
                    validatedStartTime = dateObject[j].startTime + ":00";
                    validatedEndTime = dateObject[j].endTime + ":00";

                    validatedStartTime = moment(date + "T" + validatedStartTime).unix();
                    validatedEndTime = moment(date + "T" + validatedEndTime).unix();

                    if ((startTime < validatedEndTime && startTime > validatedStartTime) || (endTime < validatedEndTime && endTime > validatedStartTime)) {
                        flag = 0;
                    }
                    if ((validatedStartTime < endTime && startTime < validatedStartTime) || (validatedEndTime < endTime && startTime < validatedEndTime))
                        flag = 0;

                    if ((endTime === validatedEndTime && startTime === validatedStartTime)) {
                        flag = 0;
                    }

                }
            }
        });
        if (!flag)               //False for the validation of date entries in NIOs
            return false;
        //------end of conflicting day formating---//

        //------------Validating with the existing date entry from database--------------------------//
        $.each(dateObjectHistory, function(j) {  //function to remove object from the array
            console.log(date);
            temp = dateObjectHistory[j].date;
            if (moment(temp).format('YYYY-MM-DD') === date) {
                validatedStartTime = dateObjectHistory[j].startTime;
                validatedEndTime = dateObjectHistory[j].endTime;

                validatedStartTime = moment(date + "T" + validatedStartTime).unix();
                validatedEndTime = moment(date + "T" + validatedEndTime).unix();

                if ((startTime < validatedEndTime && startTime > validatedStartTime) || (endTime < validatedEndTime && endTime > validatedStartTime)) {
                    flag = 0;
                }
                if ((validatedStartTime < endTime && startTime < validatedStartTime) || (validatedEndTime < endTime && startTime < validatedEndTime))
                    flag = 0;

                if ((endTime == validatedEndTime && startTime === validatedStartTime)) {
                    flag = 0;
                }

            }
            
        });
        if (!flag)               //False for the validation of date entries in NIOs
            return false;



        return true;

    }


    //------------------------END OF VALIDATION----------------------------------------

    //-------------------------------------DROPDOWN(endTime)---------------------------

    $('body').delegate('.nio-row-date .nio-endtime-drop', 'change', function() {        //onchange of endtime
        var endTime = $(this).val();
        j = 0;
        var id = $(this).parent('td').parent('tr').attr('id');
        $.each(dateObject, function(j) {     //function to remove object from the array
            if (dateObject[j].id == parseInt(id)) {
                dateObject[j].endTime = endTime;
                temp = j;
                return false;
            }
        });

    });

    //-----------------------------------START DROPDOWN----------------------------------

    $('body').delegate('.nio-row-date .nio-starttime-drop', 'change', function() {      //onchange of starttime
        var startTime = $(this).val();
        var id = $(this).parent('td').parent('tr').attr('id');
        j = 0;
        var temp;
        $.each(dateObject, function(j) {     //function to remove object from the array
            if (dateObject[j].id == parseInt(id)) {
                dateObject[j].startTime = startTime;
                temp = j;
                return false;
            }
        });
    });

    //-------------------------------------CHECK BOX ON EACH ROW-----------------------------------------

    $('body').delegate('.nio-row-date td input', 'change', function() {        //Change of checkbox of a single date
        var checkObj = $(this);
        if (checkObj.prop('checked')) {
            var id = checkObj.parent('td').parent('tr').attr('id');
            var startTime;
            var endTime;
            var date;
            $.each(dateObject, function(j) {     //function to remove object from the array
                if (dateObject[j].id == parseInt(id)) {
                    startTime = dateObject[j].startTime;
                    endTime = dateObject[j].endTime;
                    date = dateObject[j].date;
                    if (dateValidation(date, startTime, endTime)) {
                        checkObj.parent('td').parent('tr').find('.nio-endtime-drop').attr('disabled', true);
                        checkObj.parent('td').parent('tr').find('.nio-starttime-drop').attr('disabled', true);
                        createEvent(startTime, endTime, date, id, NIO_CURR);
                        dateObject[j].status = 1;
                        checkObj.parent('td').parent('tr').find('.nio-cal-alert').css({
                            'display': 'none'
                        });
                    }
                    else {
                        checkObj.prop('checked', false);
                        checkObj.parent('td').parent('tr').find('.nio-cal-alert').css({
                            'display': 'block'
                        });
                    }

                    return false;
                }
            });
        } else {
            checkObj.parent('td').parent('tr').find('.nio-endtime-drop').attr('disabled', false);
            checkObj.parent('td').parent('tr').find('.nio-starttime-drop').attr('disabled', false);
            var id = checkObj.parent('td').parent('tr').attr('id');
            $('#nio-calendar').fullCalendar('removeEvents', id);
            $.each(dateObject, function(j) {     //function to remove object from the array
                if (dateObject[j].id == parseInt(id)) {
                    dateObject[j].status = 0;
                }
            });
        }
    });

    //-------------------------------REMOVE BUTTON-------------------------------

    $("#nio-cal-removeButton").click(function() {       //click on remove button
        var i = 1;
        var id;
        var input;
        var row = $('.nio-apply-dates tr:nth-child(' + i + ')');
        while (row.length > 0) {
            input = row.find('input');
            if (input.prop('checked')) {
                id = row.attr('id');
                $('#nio-calendar').fullCalendar('removeEvents', id);
                j = 0;
                $.each(dateObject, function(j) {     //function to remove object from the array
                    if (dateObject[j].id === parseInt(id)) {
                        dateObject.splice(j, 1);
                        return false;
                    }
                });
                row.remove();
            }
            else
                ++i;
            row = $('.nio-apply-dates tr:nth-child(' + i + ')');
        }
        if (dateObject.length == 0)
            $("#nio-cal-checkbox").attr('disabled', true).prop('checked', false);
        else
            $("#nio-cal-checkbox").prop('checked', false);
    });


    //------------------------GLOBAL CHECKBOX-------------------------------------

    $("#nio-cal-checkbox").click(function() {                   //click on global checkbox
        if (!$('#nio-cal-checkbox').prop('checked')) {
            $('.nio-apply-dates input').prop('checked', false);
            $('#nio-cal-checkbox').prop('checked', false);
            $('.nio-starttime-drop').attr('disabled', false);
            $('.nio-endtime-drop').attr('disabled', false);

            var i = 1;
            var id;
            var row = $('.nio-apply-dates tr:nth-child(' + i + ')');
            while (row.length > 0) {
                id = row.attr('id');

                $.each(dateObject, function(j) {     //function to remove object from the array
                    if (dateObject[j].id == parseInt(id)) {
                        dateObject[j].status = 0;
                        return false;
                    }
                });

                $('#nio-calendar').fullCalendar('removeEvents', id);
                ++i;
                row = $('.nio-apply-dates tr:nth-child(' + i + ')');
            }
        }

        else {
            i = 1;
            var startTime;
            var endTime;
            var date;
            var input;
            row = $('.nio-apply-dates tr:nth-child(' + i + ')');
            while (row.length > 0) {
                id = row.attr('id');

                startTime = row.find('.nio-starttime-drop').val();
                endTime = row.find('.nio-endtime-drop').val();
                $.each(dateObject, function(j) {     //function to remove object from the array
                    if (dateObject[j].id === parseInt(id) &&dateObject[j].status==0) {
                        date = dateObject[j].date;
                        startTime = dateObject[j].startTime;
                        endTime = dateObject[j].endTime;
                        if (dateValidation(date, startTime, endTime)) {
                            row.find('.nio-endtime-drop').attr('disabled', true);
                            row.find('.nio-starttime-drop').attr('disabled', true);
                            createEvent(startTime, endTime, date, id, NIO_CURR);
                            dateObject[j].status = 1;
                            row.find('.nio-cal-alert').css({
                                'display': 'none'
                            });
                            row.find('input').prop('checked', true);
                        }
                        else {
                            row.find('.nio-cal-alert').css({
                                'display': 'block'
                            });
                            row.find('.nio-apply-dates input').prop('checked', false);

                        }
                        return false;
                    }
                });
                input = row.find('input');
                ++i;
                row = $('.nio-apply-dates tr:nth-child(' + i + ')');
            }
        }

    });

    
    //------------------Apply for NIO pops the details of the NIO in table----------------
    function applyForNIO() {
        var title = "NIO APPLICATION";
        $("#popup-nio-apply").dialog({
            position: {
                my: "center",
                at: "center",
                of: window
            },
            modal: true,
            draggable: false,
            title: title,
            closeText: "hide",
            dialogClass: 'no-close success-dialog',
            width: 700,
            height: 550,
            buttons: [
            {
                text: "Apply",
                click: function() {
                    var nioType = 1;
                    $.ajax({
                        url: 'ajax/addNIO.php',
                        type: 'post',
                        data: {
                            data: dateObject,
                            nioType: nioType
                        },
                        success: function(data) {
                            console.log('okay good');
                            document.location = 'applyNIO.php';
                        }
                    });

                //redirect the page to applyNIO.php after the mail has been sent
                        
                }

            },
            {
                text: "Cancel",
                click: function() {
                }

            }
            ],
            open: function(event, ui) {
                $("#popup-nio-apply").empty();
                var nioID = 2734;
                var empID = 1;
                var date = '7-3-2014';
                var empName = "Roshan David";
                var startTime, endTime;
                $("#popup-nio-apply").append("<table style='width: 100%'>" +
                    "<tr><td style='text-align: left'><b>NIO ID: </b></td><td style='text-align: left'>" + nioID + "</td><td style='text-align: left'><b>Date: </b></td><td style='text-align: left'>" + date + "</td></tr>" +
                    "<tr><td style='text-align: left'><b>Employee Name: </b></td><td style='text-align: left'>" + empName + "</td><td style='text-align: left'><b>Employee ID: </b></td><td style='text-align: left'>" + empID + "</td></tr>" +
                    "</table>");

                $("#popup-nio-apply").append("<table style='width: 100%'>" +
                    "<tr><td style='text-align: left'><b>Reason: </b></td><td style='text-align: left'>" + nioID + "</td></tr></table>");

                $("#popup-nio-apply").append("<table style='width: 100%'>" +
                    "<tr><td style='text-align: left'><b>Application: </b></td></tr></table>");
                $("#popup-nio-apply").append('<table class="flatTable-heading template-lightBack">' +
                    '<tr class="headingTr template-lightBack"><td>Date</td><td>From</td><td>To</td><td>Duration</td></tr>');
                $("#popup-nio-apply").append('</table>');


                $.each(dateObject, function(j) {
                    if (dateObject[j].status == 1) {
                        date = dateObject[j].date;
                        startTime = dateObject[j].startTime;
                        endTime = dateObject[j].endTime;
                        date = moment(parseInt(date)).format('YYYY-MM-DD');
                        duration = 8;

                        $("#popup-nio-apply").append('<table class="flatTable table-row-noStatusTable">' +
                            '<tr class="table-row-selectable">' +
                            ' <td>' + date + '</td>' +
                            ' <td>' + startTime + '</td>' +
                            ' <td>' + endTime + '</td>' +
                            ' <td>' + duration + '</td>' +
                            ' </tr>' +
                            '</table>');

                    }
                });

            }
        });
    }

    //------------------------This pops the description field--------

    $("#nio-cal-applyButton").click(function() {
        $("#popup-nio-description").dialog({
            position: {
                my: "center",
                at: "center",
                of: window
            },
            modal: true,
            draggable: false,
            title: "Description NIO..",
            width: 700,
            height: 550,
            buttons: [
            {
                text: "Proceed",
                click: function() {
                    applyForNIO();
                }

            },
            {
                text: "Cancel",
                click: function() {

                }

            }
            ]
        });
    });

    //---------------------Press on cancel button one goes to history page----

    $('#nio-cal-cancelButton').click(function() {
        var title = "NIO APPLICATION";
        $("#popup-nio-apply").dialog({
            position: {
                my: "center",
                at: "center",
                of: window
            },
            modal: true,
            draggable: false,
            title: title,
            closeText: "hide",
            dialogClass: 'no-close success-dialog',
            width: 300,
            height: 150,
            buttons: [
            {
                text: "Yes",
                click: function() {
                    $(this).dialog("close");
                    window.location = 'index.php';
                }
            },
            {
                text: "No",
                click: function() {
                    $(this).dialog("close");
                }
            }
            ],
            open: function(event, ui) {
                $("#popup-nio-apply").empty();
                $("#popup-nio-apply").append("Cancel Application?");
            }
        });

    });

    //-------------------------------click on the X button--------------

    $("body").delegate(".nio-apply-dates .nio-date-remove", "click", function() {
        var id = $(this).parent('tr').attr('id');
        $('#nio-calendar').fullCalendar('removeEvents', id);
        $.each(dateObject, function(j) {     //function to remove object from the array
            if (dateObject[j].id === parseInt(id)) {
                dateObject.splice(j, 1);

                return false;
            }
        });
        $(this).parent('tr').remove();

    });

    ///-----------------Function to add the event to Calendar----------

    function createEvent(startTime, endTime, date, id, color) {
        date = moment(parseInt(date)).format("YYYY-MM-DD");
        var start = date + "T" + startTime;
        var end = date + "T" + endTime;
        var eventObject = {
            id: id,
            title: startTime + " to " + endTime,
            start: start,
            end: end,
            color: color,
            textColor: 'black'
        };
        $('#nio-calendar').fullCalendar('renderEvent', eventObject, true);
    }

    //-------------------Employee NIO History--------------------------

    function populateNIOHistoryTable(callBackNIOHistoryTable) {
        $.ajax({
            type: "POST",
            url: "ajax/nioHistoryTable.php",
            dataType: 'json',
            data: {
                record: recordNumber
            },
            success: callBackNIOHistoryTable
        });
    }

    function callBackNIOHistoryTable(data) {
        var i = 0;
        while (data[i]) {
            $(".table-row-nioHistoryTable").append(" <tr class=\"table-row-selectable\" nioID=" + data[i]['nioID'] + "><td>" +
                data[i]['nioID'] + "</td><td>" +
                data[i]['reason'] + "</td><td>" + data[i]['appDate'] +
                "</td><td>" + data[i]['status'] + "</td> <td>" + parseInt(data[i]['duration']/60)+"h "+(data[i]['duration'])%60+"min" + "</td></tr>");
            ++i;
            recordNumber++;
        }
        $(".admin-table-container").mCustomScrollbar("update");
        $(".admin-table-container").mCustomScrollbar("scrollTo", "h2:last", {
            scrollEasing: "easeInOutQuad"
        });
    }


    function onLoad() {
        populateNIOHistoryTable(callBackNIOHistoryTable);
    }


    onLoad();
    
    $('body').delegate('.table-row-selectable','click',function (){
        var nioID=$(this).attr('nioID');
        $("#niohistory-popup").dialog({
            position: {
                my: "center",
                at: "center",
                of: window
            },
            modal: true,
            draggable: false,
            title: "NIO DETAILS",
            closeText: "hide",
            dialogClass: 'no-close success-dialog',
            width: 700,
            height: 600,
            buttons: [
            {
                text: "Cancel Application",
                click: function() {
                    $.ajax({
                        type: "POST",
                        url: "ajax/changeNioStatus.php",
                        dataType: 'json',
                        data: {
                            nioID: nioID,
                            status: -2
                        },
                        success : function(data){
                            console.log(data);
                            alert("Cancelled");           
                        }
                    });
                    $(this).dialog("close");
                }
            },
            {
                text: "Send Reminder",
                click: function() {
                    $(this).dialog("close");
                }
            }
            ],
            open: function(event, ui) {
                $("#niohistory-popup").empty();
                
                var description="Okay I am off";
                var date='12-12-1992';
                
                $.ajax({
                    url: 'ajax/nioDetails.php',
                    dataType: 'json',
                    type: 'post',
                    data:{
                        nioID: nioID
                    }, 
                    success: function(data){
                      
                        date=data['genDetails']['dateApplied'];
                        $("#niohistory-popup").append("<table style='width: 100%'>"+
                            "<tr><td style='text-align: left'><b>NIO ID: </b> "+nioID+"</td><td style='text-align: right'><b>Date: </b>"+date+"</td></tr>"+               
                            "</table>"); 
                       
                        $("#niohistory-popup").append("<table style='width: 100%'>"+
                            "<tr><td style='text-align: left'><b>Message: </b></td></tr></table>"); 
                        $("#popUp-noStatus").append("<textarea rows='4' style='resize:none;width: 95%; padding: 3px; margin: 10px 2.5% 10px 2%'>"+description+"</textarea>");
                             
                             
                        $("#niohistory-popup").append("<table style='width: 100%'>"+
                            "<tr><td style='text-align: left'><b>Login Details: </b></td></tr></table>"); 
                        $("#niohistory-popup").append('<table class="flatTable-heading template-lightBack">'+
                            '<tr class="headingTr template-lightBack"><td>Date</td><td>Start Time</td><td>End Time</td><td>Duration</td></tr>');
                        $("#niohistory-popup").append('</table>');
                        
                        var i=0;
                        while(data[i]){
                            $("#niohistory-popup").append('<table class="flatTable table-row-noStatusTable">'+
                                '<tr class="table-row-selectable">'+
                                ' <td>'+data[i]['date']+'</td>'+
                                ' <td>'+data[i]['startTime']+'</td>'+
                                ' <td>'+data[i]['endTime']+'</td>'+
                                ' <td>'+data[i]['duration']+'</td>'+
                                ' </tr>'+
                                '</table>');
                            ++i;
                        }
                        if(i==0){
                            $("#niohistory-popup").append('<table class="flatTable table-row-noStatusTable">'+
                                '<tr class="table-row-selectable">'+
                                ' <td>'+'Did not show up for work'+'</td>'+
                                ' </tr>'+
                                '</table>');
                        
                        }
                    }
                });
            }
        });
        
    });

});
