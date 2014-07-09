$(document).ready(function() {
    var checkUpdate = 15000;            //check for update in how much time
    var i = 1;      //flips
    var leaveChartPageNumber=1;  //page in leave chart  
    var nioChartPageNumber=1;     //page in nio chart
    var tableNumber=1;
    var chartNumber=1;          //
    var options;                //used in chart
    var textToPass;         // used in chart
    var seriesToPass;       // used in chart
    var dataToPass;         // used in chart
    
    var table= [1,1,1];  //table[0] -> noStatusTableRecord entry  table[1] -> unapprovedTableRecord entry table[2] -> approvedTableRecord entry 
    //--------------------- Template Work----------------------------------   
    
    $("#table-unapproved").addClass('template-darkBack');
    $("#table-approved").addClass('template-darkBack');
    $("#table-unapproved").addClass('template-lightColor');
    $("#table-approved").addClass('template-lightColor');
  
    $("#nav-nio-chart").removeClass("template-lightBack").addClass('template-darkBack');
    $("#nav-nio-chart").addClass('template-lightColor');
    

    $(".titleTd").click(function() {
        $(".titleTd").addClass('template-darkBack');
        $(".titleTd").removeClass('template-textWhite');
        $(".titleTd").addClass('template-lightColor');
        $(this).removeClass('template-darkBack');
        $(this).addClass('template-lightBack');
        $(this).removeClass('template-lightColor');
        $(this).addClass('template-textWhite');
    });
    
    $(".titleTd-chart").click(function(){
        $(".titleTd-chart").addClass('template-darkBack');
        $(".titleTd-chart").removeClass('template-textWhite');
        $(".titleTd-chart").addClass('template-lightColor');
        $(this).removeClass('template-darkBack');
        $(this).addClass('template-lightBack');
        $(this).removeClass('template-lightColor');
        $(this).addClass('template-textWhite');
        chartNumber=$(this).attr('chartNumber');
        if(chartNumber==1){
            //Leave Chart
            textToPass="Total number of leaves";
            seriesToPass=[{
                name: 'Leaves left',
                data: [12, 2, 3, 2, 1, 10, 12, 8]
            }, {
                name: 'Leaves Taken',
                data: [-3, -4, 4, 2, 5, 20, 13, 6]
            }
            ];
            dataToPass=['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8'];
            createGraphLeave(textToPass,seriesToPass,dataToPass);
        }
        else{
            //NIO chart
            nioChartPageNumber=1;
            nioChart(); 
        }
    });
    
    function nioChart(){
        $.ajax({
            dataType: 'json',
            url: 'ajax/nioGraph.php',
            type: 'post',
            data:{
                page: nioChartPageNumber
            },
            success: function(data){
                dataToPass=data[2];
                textToPass="Total number of NIOs";
                var nioApplied=[];
                var nioAccepted=[];
                var i=0;
                while(data[0][i]){
                    nioApplied[i]=parseInt(data[0][i],10);
                    nioAccepted[i]=parseInt(data[1][i],10);
                    ++i;  
                }
                if(i==8)
                    createGraphNIO(textToPass,nioAccepted,nioApplied,dataToPass);
                else
                    decrementNIOChartPage();
            }
        });
    }
    
    
    function decrementNIOChartPage(){
        nioChartPageNumber--;
    }
    
    function leaveChart(){
        $.ajax({
            dataType: 'json',
            url: 'ajax/leaveGraph.php',
            type: 'post',
            data:{
                page: leaveChartPageNumber
            },
            success: function(data){
                console.log(data);   
                textToPass="Total number of leaves";
                seriesToPass=[{
                    name: 'Leaves left',
                    data: data[2]
                }, {
                    name: 'Leaves Taken',
                    data: data[1]
                }
                ];
                dataToPass=data[0];
                
                console.log(data[0].length);
                
                if(data[0].length==8)
                    createGraphLeave(textToPass,seriesToPass,dataToPass);
                else
                    decrementLeaveChartPage();
                
            }
        });
    }
    
    
    function decrementLeaveChartPage(){
        leaveChartPageNumber--;
    }
    
    
    //-------------------Scroll Function-----------------------
    
    $(".admin-table-container").mCustomScrollbar({
        theme:"dark",
        callbacks:{
            onTotalScrollOffset: 400,
            onTotalScroll: function(){
                if($(this).parent().attr('tableNumber')==1)
                    populateNoStatusTable();
                if($(this).parent().attr('tableNumber')==2){
                    populateUnapprovedTable();
                }
                if($(this).parent().attr('tableNumber')==3){
                    populateApprovedTable();
                }
            }
        }
    });
    
    function populateUnapprovedTable(callBackUnapprovedTable){
        // AJAX Data Loading Logic
        $.ajax({
            type: "POST",
            url: "ajax/nioTables.php",
            dataType: 'json',
            data: {
                tableNumber : 2,
                record : table[1]
            },
            success : callBackUnapprovedTable
        });
    }
 
    function callBackUnapprovedTable(data){
        var i=0;
        while(data[i]){
            $(".table-row-unapprovedTable").append(" <tr class=\"table-row-selectable\" tableNumber=2 nio_id="+data[i]['nioID']+"><td>"+
                data[i]['empID']+"</td><td>"+data[i]['empName']+"</td><td>"+
                data[i]['reason']+
                "</td><td>"+data[i]['startDate']+"</td> <td>"+data[i]['endDate']+"</td> <td>"
                +data[i]['duration']+"</td></tr>");  
            ++i;
            table[1]++;
        }
        $(".admin-table-container").mCustomScrollbar("update");
        $(".admin-table-container").mCustomScrollbar("scrollTo","h2:last",{
            scrollEasing:"easeInOutQuad"
        }); 
    }
    
    function populateApprovedTable(callBackApprovedTable){
        // AJAX Data Loading Logic
        $.ajax({
            type: "POST",
            url: "ajax/nioTables.php",
            dataType: 'json',
            data: {
                tableNumber : 3,
                record : table[2]
            },
            success : callBackApprovedTable
        });
    }
 
    function callBackApprovedTable(data){
        var i=0;
        while(data[i]){
            $(".table-row-approvedTable").append(" <tr class=\"table-row-selectable\" tableNumber=3 nio_id="+data[i]['nioID']+"><td>"+
                data[i]['empID']+"</td><td>"+data[i]['empName']+"</td>"+
                "<td>"+data[i]['reason']+
                "</td><td>"+data[i]['startDate']+"</td> <td>"+data[i]['endDate']+"</td> <td>"
                +data[i]['duration']+"</td></tr>");  
            ++i;
            table[2]++;
        }
        $(".admin-table-container").mCustomScrollbar("update");
        $(".admin-table-container").mCustomScrollbar("scrollTo","h2:last",{
            scrollEasing:"easeInOutQuad"
        }); 
    }
 
    
    function populateNoStatusTable(callBackNoStatusTable){
        // AJAX Data Loading Logic
        $.ajax({
            type: "POST",
            url: "ajax/nioTables.php",
            dataType: 'json',
            data: {
                tableNumber : 1,
                record : table[0]
            },
            success : callBackNoStatusTable
        });
       
    }
    
    function callBackNoStatusTable(data){
        var i=0;
        while(data[i]){
            $(".table-row-noStatusTable").append(" <tr class=\"table-row-selectable\" tableNumber=1 attID="+data[i]['attID']+">"+
                "<td>"+data[i]['attID']+"</td><td>"+data[i]['empID']+"</td><td>"+data[i]['empName']+"</td><td>"+
                data[i]['date']+"</td><td>"+data[i]['duration']+
                "</td></tr>");  
            ++i;
            table[0]++;
        }
        $(".admin-table-container").mCustomScrollbar("update");
        $(".admin-table-container").mCustomScrollbar("scrollTo","h2:last",{
            scrollEasing:"easeInOutQuad"
        }); 
    }
    
    
    function onLoad(){
        $.ajax({
            type: "POST",
            url: "ajax/flip.php",
            dataType: 'json',
            data: {
                flip: 2
            },
            success :function( data ) {
                var elem = $("#nioCount").find('.admin-flip-part2');
                elem.html("<h1 style=\"font-size : 50; text-align: center;padding-top: 30px\">" + data[0]['nioCount'] + "</h1>");
            }
        }); 
        
        
        $.ajax({
            type: "POST",
            url: "ajax/flip.php",
            dataType: 'json',
            data: {
                flip: 1
            },
            success :function( data ) {
                var elem = $("#leaveCount").find('.admin-flip-part2');
                elem.html("<h1 style=\"font-size : 50; text-align: center;padding-top: 30px\">" + data[0]['leaveCount'] + "</h1>");
            }
        }); 
      
        leaveChart();
     
        
        $("#table-noStatusTable .table-row-noStatusTable").empty();
        populateNoStatusTable(callBackNoStatusTable);
    }
  
    $(onLoad);
    
    //--------------Tables--------------------------------
    $(".admin-table-div").hide();
    $("#table-noStatusTable").show();

    $("#table-noStatus").click(function() {
        $(".admin-table-div").hide();
        $("#table-noStatusTable").show();
        
        $("#table-noStatusTable .table-row-noStatusTable").empty();
      
        table[0]=1;      //reset to fetch the first record.
             
        populateNoStatusTable(callBackNoStatusTable);
    });

    $("#table-approved").click(function() {
        $(".admin-table-div").hide();
        $("#table-approvedTable").show();
        
        $("#table-approvedTable .table-row-approvedTable").empty();
      
        table[2]=1;      //reset to fetch the first record.
             
        populateApprovedTable(callBackApprovedTable);
    });

    $("#table-unapproved").click(function() {
        $(".admin-table-div").hide();
        $("#table-unapprovedTable").show();
        
        $("#table-unapprovedTable .table-row-unapprovedTable").empty();
      
        table[1]=1;      //reset to fetch the first record.
             
        populateUnapprovedTable(callBackUnapprovedTable);
    });
    //-----------------Approved Table-----------------------

    $("body").delegate(".table-row-selectable","click",function() {
        var nio_id;
        var table = $(this).closest('table');
        var element=$(this);
        console.log(table.attr('tableNumber'));
        tableNumber = parseInt($(this).attr('tableNumber'), 10);
        switch (tableNumber) {
            case 1:
                var caseID=$(this).attr('attID');
                
                $("#popUp-noStatus").dialog({
                    position:{
                        my: "center", 
                        at: "center", 
                        of: window
                    },
                    modal:true,
                    draggable:false,
                    title: "Absent without Notifying [CASE ID:"+caseID+"]",
                    closeText: "hide",
                    dialogClass: 'no-close success-dialog',
                    width: 700,
                    height: 550,
                    buttons:[
                    {
                        text: "Send Reminder",
                        click: function() {
                            $( this ).dialog( "close" );
                        },
                        'class':"orange-button"
                    }
                    ],
                    open: function( event, ui ) {        
                        $("#popUp-noStatus").empty();
                        $.ajax({
                            type: "POST",
                            url: "ajax/noNotify.php",
                            dataType: 'json',
                            data: {
                                caseID: caseID
                            },
                            success : function(data){
                                console.log(data);
                                var empID=data['genDetails']['empID'];
                                var empName=data['genDetails']['empName'];
                                var date=data['genDetails']['date'];
                                
                                var description='Subject: Reminder to apply for NIO or Leave'+
                                "\n\nThis mail is to remind you to apply for NIO or leave, as you did not meet the minimum working hour requirement on "+
                                date+".";
                                
                                $("#popUp-noStatus").append("<table style='width: 100%'>"+
                                    "<tr><td style='text-align: left'><b>CASE ID: </b></td><td style='text-align: left'>"+caseID+"</td><td style='text-align: left'><b>Date: </b></td><td style='text-align: left'>"+date+"</td></tr>"+
                                    "<tr><td style='text-align: left'><b>Employee Name: </b></td><td style='text-align: left'>"+empName+"</td><td style='text-align: left'><b>Employee ID: </b></td><td style='text-align: left'>"+empID+"</td></tr>"+
                                   
                                    "</table>"); 
                       
                                $("#popUp-noStatus").append("<table style='width: 100%'>"+
                                    "<tr><td style='text-align: left'><b>Message: </b></td></tr></table>"); 
                                $("#popUp-noStatus").append("<textarea rows='4' style='resize:none;width: 95%; padding: 3px; margin: 10px 2.5% 10px 2%'>"+description+"</textarea>");
                             
                             
                                $("#popUp-noStatus").append("<table style='width: 100%'>"+
                                    "<tr><td style='text-align: left'><b>Login Details: </b></td></tr></table>"); 
                                $("#popUp-noStatus").append('<table class="flatTable-heading template-lightBack">'+
                                    '<tr class="headingTr template-lightBack"><td>In Time</td><td>Out Time</td><td>Duration</td></tr>');
                                $("#popUp-unapproved").append('</table>');
                                
                                var i=0;
                                while(data[i]){
                                    $("#popUp-noStatus").append('<table class="flatTable table-row-noStatusTable">'+
                                        '<tr class="table-row-selectable">'+
                                        ' <td>'+data[i]['inTime']+'</td>'+
                                        ' <td>'+data[i]['outTime']+'</td>'+
                                        ' <td>'+data[i]['duration']+'</td>'+
                                        ' </tr>'+
                                        '</table>');
                                    ++i;
                                }
                                if(i==0){
                                    $("#popUp-noStatus").append('<table class="flatTable table-row-noStatusTable">'+
                                        '<tr class="table-row-selectable">'+
                                        ' <td>'+'Did not show up for work'+'</td>'+
                                        ' </tr>'+
                                        '</table>');
                                }
                                
                            }
                        });  
                    }
                });
                
                break;
            case 2:
                nio_id = $(this).attr('nio_id');
                console.log(nio_id);
                $("#popUp-unapproved").dialog({
                    position:{
                        my: "center", 
                        at: "center", 
                        of: window
                    },
                    modal:true,
                    draggable:false,
                    title: "Unapproved NIO [NIO ID:"+nio_id+"]",
                    closeText: "hide",
                    dialogClass: 'no-close success-dialog',
                    width: 700,
                    height: 550,
                    buttons:[
                    {
                        text: "Accept",
                        click: function() {
                            $.ajax({
                                type: "POST",
                                url: "ajax/changeNioStatus.php",
                                dataType: 'json',
                                data: {
                                    nioID: nio_id,
                                    status: 1
                                },
                                success : function(data){
                                    console.log(data);
                                    alert("Accepted");
                                    
                                }
                            });
                            element.css({
                                "margin":"0px",
                                "padding":"0px"
                            });
                            element.remove();
                            if(chartNumber==2){
                                nioChartPageNumber=1;
                                nioChart();
                            }
                            $( this ).dialog( "close" );
                        },
                        'class':"button-green"
                    },
                    {
                        text: "Reject",
                        click: function() {
                            $.ajax({
                                type: "POST",
                                url: "ajax/changeNioStatus.php",
                                dataType: 'json',
                                data: {
                                    nioID: nio_id,
                                    status: -1
                                },
                                success : function(data){
                                    console.log(data);
                                    alert("Rejected"); 
                                }
                            });  
                            element.css({
                                "margin":"0px",
                                "padding":"0px"
                            });
                            element.remove();
                            if(chartNumber==2){
                                nioChartPageNumber=1;
                                nioChart();
                            }
                            $( this ).dialog( "close" );
                        },
                        'class':"button-red"
                    }
                    ],
                    open: function( event, ui ) {        
                        $("#popUp-unapproved").empty();
                        $.ajax({
                            type: "POST",
                            url: "ajax/nioDetails.php",
                            dataType: 'json',
                            data: {
                                nioID: nio_id
                            },
                            success : function(data){
                                console.log(data);
                                var empID=data['genDetails']['empID'];
                                var empName=data['genDetails']['empName'];
                                var appDate=data['genDetails']['dateApplied'];
                                var reqID=data['genDetails']['requestID'];
                                var description="On a business trip to Australia";
                                var reason="Business Trip";
                                $("#popUp-unapproved").append("<table style='width: 100%'>"+
                                    "<tr><td style='text-align: left'><b>NIO ID: </b></td><td style='text-align: left'>"+nio_id+"</td><td style='text-align: left'><b>Applied On: </b></td><td style='text-align: left'>"+appDate+"</td></tr>"+
                                    "<tr><td style='text-align: left'><b>Employee Name: </b></td><td style='text-align: left'>"+empName+"</td><td style='text-align: left'><b>Employee ID: </b></td><td style='text-align: left'>"+empID+"</td></tr>"+
                                    "<tr><td style='text-align: left'><b>Reason: </b></td><td style='text-align: left'>"+reason+"</td><td style='text-align: left'><b>Request ID: </b></td><td style='text-align: left'>"+reqID+"</td></tr>"+
                                    "</table>"); 
                       
                                $("#popUp-unapproved").append("<table style='width: 100%'>"+
                                    "<tr><td style='text-align: left'><b>Description: </b></td></tr></table>"); 
                                $("#popUp-unapproved").append("<textarea rows='4' style='resize:none;width: 95%; padding: 3px; margin: 10px 2.5% 10px 2%' disabled>"+description+"</textarea>");
                                
                                $("#popUp-unapproved").append('<table class="flatTable-heading template-lightBack">'+
                                    '<tr class="headingTr template-lightBack"><td>Date</td><td>Start Time</td><td>End Time</td><td>Duration</td></tr>');
                                $("#popUp-unapproved").append('</table>');
                                
                                var i=0;
                                while(data[i]){
                                    $("#popUp-unapproved").append('<table class="flatTable table-row-approvedTable">'+
                                        '<tr class="table-row-selectable">'+
                                        ' <td>'+data[i]['date']+'</td>'+
                                        ' <td>'+data[i]['startTime']+'</td>'+
                                        ' <td>'+data[i]['endTime']+'</td>'+
                                        ' <td>'+data[i]['duration']+'</td>'+
                                        ' </tr>'+
                                        '</table>');
                                    ++i;
                                }
                                
                            }
                        });  
                    }
                });
                break;
            case 3:
                nio_id = $(this).attr('nio_id');
                console.log(nio_id);
                $("#popUp-approved").dialog({
                    position:{
                        my: "center", 
                        at: "center", 
                        of: window
                    },
                    modal:true,
                    draggable:false,
                    title: "Approved NIO [NIO ID:"+nio_id+"]",
                    closeText: "hide",
                    dialogClass: 'no-close success-dialog',
                    width: 700,
                    height: 550,
                    buttons:[
                    {
                        text: "Pending",
                        click: function() {
                            $.ajax({
                                type: "POST",
                                url: "ajax/changeNioStatus.php",
                                dataType: 'json',
                                data: {
                                    nioID: nio_id,
                                    status: 0
                                },
                                success : function(data){
                                    console.log(data);
                                    alert("Pending");
                                }
                            });  
                            element.css({
                                "margin":"0px",
                                "padding":"0px"
                            });
                            element.remove();
                            if(chartNumber==2){
                                nioChartPageNumber=1;
                                nioChart();
                            }
                            $( this ).dialog( "close" );
                        },
                        'class':"button-green"
                    },
                    {
                        text: "Reject",
                        click: function() {
                            $.ajax({
                                type: "POST",
                                url: "ajax/changeNioStatus.php",
                                dataType: 'json',
                                data: {
                                    nioID: nio_id,
                                    status: -1
                                },
                                success : function(data){
                                    console.log(data);
                                    alert("Rejected");
                                }
                            }); 
                            element.css({
                                "margin":"0px",
                                "padding":"0px"
                            });
                            element.remove();
                            if(chartNumber==2){
                                nioChartPageNumber=1;
                                nioChart();
                            }
                            $( this ).dialog( "close" );
                        },
                        'class':"button-red"
                    }
                    ],
                    open: function( event, ui ) {        
                        $("#popUp-approved").empty();
                        $.ajax({
                            type: "POST",
                            url: "ajax/nioDetails.php",
                            dataType: 'json',
                            data: {
                                nioID: nio_id
                            },
                            success : function(data){
                                console.log(data);
                                var empID=data['genDetails']['empID'];
                                var empName=data['genDetails']['empName'];
                                var appDate=data['genDetails']['dateApplied'];
                                var reqID=data['genDetails']['requestID'];
                                var description="On a business trip to Australia";
                                var reason="Business Trip";
                                $("#popUp-approved").append("<table style='width: 100%'>"+
                                    "<tr><td style='text-align: left'><b>NIO ID: </b></td><td style='text-align: left'>"+nio_id+"</td><td style='text-align: left'><b>Applied On: </b></td><td style='text-align: left'>"+appDate+"</td></tr>"+
                                    "<tr><td style='text-align: left'><b>Employee Name: </b></td><td style='text-align: left'>"+empName+"</td><td style='text-align: left'><b>Employee ID: </b></td><td style='text-align: left'>"+empID+"</td></tr>"+
                                    "<tr><td style='text-align: left'><b>Reason: </b></td><td style='text-align: left'>"+reason+"</td><td style='text-align: left'><b>Request ID: </b></td><td style='text-align: left'>"+reqID+"</td></tr>"+
                                    "</table>"); 
                       
                                $("#popUp-approved").append("<table style='width: 100%'>"+
                                    "<tr><td style='text-align: left'><b>Description: </b></td></tr></table>"); 
                                $("#popUp-approved").append("<textarea rows='4' style='resize:none;width: 95%; padding: 3px; margin: 10px 2.5% 10px 2%' disabled>"+description+"</textarea>");
                                
                                $("#popUp-approved").append('<table class="flatTable-heading template-lightBack">'+
                                    '<tr class="headingTr template-lightBack"><td>Date</td><td>Start Time</td><td>End Time</td><td>Duration</td></tr>');
                                $("#popUp-approved").append('</table>');
                                
                                var i=0;
                                while(data[i]){
                                    $("#popUp-approved").append('<table class="flatTable table-row-approvedTable">'+
                                        '<tr class="table-row-selectable">'+
                                        ' <td>'+data[i]['date']+'</td>'+
                                        ' <td>'+data[i]['startTime']+'</td>'+
                                        ' <td>'+data[i]['endTime']+'</td>'+
                                        ' <td>'+data[i]['duration']+'</td>'+
                                        ' </tr>'+
                                        '</table>');
                                    ++i;
                                }
                            }
                        });  
                    }
                });
                break;
        }
    });
    
    //--------------------------Hide And Show Graph     --------------------------------
    $(".admin-graph-controlShow" ).tooltip({
        content: "Show Graph"
    });
    $("#closeGraph img" ).tooltip({
        content: "Close Graph"
    });
    
    $(".searchBox input" ).tooltip({
        content: "Employee Name"
    });
    
    $(".searchBox select" ).tooltip({
        content: "Select Employee Designation"
    });
    
    
    $(".admin-graph-controlShow").hide();
   
    $("#closeGraph img").click(function() {
        $(".admin-graph-box").slideToggle(1000);
        $(".admin-graph-controlShow").slideToggle(500);
    });
    
    $(".admin-graph-controlShow").click(function() {
        $(".admin-graph-box").slideToggle(1000);
        $(".admin-graph-controlShow").slideToggle(500);
    });
     
    //--------------------Graph Pagination-----------------------
    $("#admin-graph-left").click(function(){
        if(chartNumber==1){
            leaveChartPageNumber--;
            if(leaveChartPageNumber==0){
                ++leaveChartPageNumber;
            }else{ 
                leaveChart();
            }
        }
        else{
            nioChartPageNumber--;
            if(nioChartPageNumber==0){
                ++nioChartPageNumber;
            }else{ 
                nioChart();
            }
        }
    });

    $("#admin-graph-right").click(function(){
        if(chartNumber==1){
            leaveChartPageNumber++;
            leaveChart();
        }
        else{
            nioChartPageNumber++;
            nioChart();
        }
    });
    
    //----------------------------STICKY----------------
    $(".admin-flip-container").sticky({
        topSpacing: 0
    });
    
    //---------------Live Tile-----------------------------

    $('.admin-flip').liveTile({
        mode: 'flip',
        delay: -1
    });

    window.setInterval(function() {
        ++i;
        
        $.ajax({
            type: "POST",
            url: "ajax/flip.php",
            dataType: 'json',
            data: {
                flip: 1
            },
            success :function( data ) {
                var elem = $("#leaveCount").find('.admin-flip-part2');
                elem.html("<h1 style=\"font-size : 50; text-align: center;padding-top: 30px\">" + data[0]['leaveCount'] + "</h1>");
            }
        }); 
    }, checkUpdate);

    window.setInterval(function() {
        $.ajax({
            type: "POST",
            url: "ajax/flip.php",
            dataType: 'json',
            data: {
                flip: 2
            },
            success :function( data ) {
                var elem = $("#nioCount").find('.admin-flip-part2');
                elem.html("<h1 style=\"font-size : 50; text-align: center;padding-top: 30px\">" + data[0]['nioCount'] + "</h1>");
            }
        }); 
    }, checkUpdate);

    //------------------------------CLICK OF FLIP----------------------
    
    $("#nioCount").click(function(){
        $(".titleTd").addClass('template-darkBack');
        $(".titleTd").removeClass('template-textWhite');
        $(".titleTd").addClass('template-lightColor');
        $("#table-unapproved").removeClass('template-darkBack');
        $("#table-unapproved").addClass('template-lightBack');
        $("#table-unapproved").removeClass('template-lightColor');
        $("#table-unapproved").addClass('template-textWhite');
        $(".admin-table-div").hide();
        $("#table-unapprovedTable").show();
        
        $("#table-unapprovedTable .table-row-unapprovedTable").empty();
      
        table[1]=1;      //reset to fetch the first record.
             
        populateUnapprovedTable(callBackUnapprovedTable);
    });
 
 
    function createGraphLeave(text,series,data){        //Creation of Leave Graph
     
        //data means the names on x axis
        //text means the y axis name
        //series is the data of the two columns and their respective names.
     
        options={
            colors: ['#E77817', '#fcb334'],
            chart: {
                backgroundColor : '#F9D597',
                type: 'column',
                renderTo: 'admin-graph-container',
                borderColor: '#F9D597',
                plotBorderColor: '#F9D597'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: data
            },
            yAxis: {
                min: 0,
                title: {
                    text: text
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: 'gray'
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: '#f6f3f7',
                        style: {
                            textShadow: '0 0 3px black, 0 0 3px black'
                        }
                    }
                },
                series:{
                    animation: false,
                    borderColor :'#F9D597' 
                }
            },
            series: series,
            column: {
                borderColor: '#F9D597'
            }
        }
        $('.admin-graph-container').highcharts(options);
    }
    
    function createGraphNIO(text,nioAccepted,nioApplied,names){         //Creation of NIO Graph
     
        //data means the names on x axis
        //text means the y axis name
        //series is the data of the two columns and their respective names.
     
        options={
            colors: ['#E77817', '#fcb334'],
            chart: {
                backgroundColor : '#F9D597',
                type: 'column',
                renderTo: 'admin-graph-container',
                borderColor: '#F9D597',
                plotBorderColor: '#F9D597'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: names
            },
            yAxis: {
                min: 0,
                title: {
                    text: text
                }
            },
            tooltip: {
                headerFormat: '<span>{point.key}</span><table style="font-size:10px;font-family: Segoe UI;font-weight:bold">',
                pointFormat: '<tr><td style="=font-size:10px;font-family: Segoe UI;color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="font-size:10px;font-family: Segoe UI;padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                },
                series:{
                    animation: false,
                    borderColor :'#F9D597' 
                }
            },
            column: {
                borderColor: '#F9D597'
            },
            series: [ {
                name: 'NIO Applied',
                data: nioApplied
    
            },{
                name: 'NIO Accepted',
                data: nioAccepted
    
            }
            ]
        }
        $('.admin-graph-container').highcharts(options);
    }
});
    
//---------------------------------------------------------------