$(document).ready(function() {
    
    var nio=[];         //This is a complex array that is below.
    var selectedNIO=0;      //This refers to the Grey section ID
    var nioID=1;            //This ID holds no relation with the exsiting NIO IDs
    var empList=[];         //Names of employee
    var designationList=[]; //This has the IDs as well as the names of the designations
    var desigIDs=[];            //This has the IDS of all the designations
    
    var tableSelected=1;        //1 for admin 2 for superAdmin  3 for Non NIO
    
    var admin=[];       //List of emp with admin
    var superAdmin=[];  //List of admin with 
    var noNIO=[];       //List of emp with no access to NIO
    //--------------------To DO ON LOAD---------------------
    
    function validateAdminPrivilege(empID){
        var flag=1;
        switch(tableSelected){
            case 1:
                $.each(admin,function(j){       //Check if the employee is already in the list
                    if(admin[j]==empID)
                        flag=0;
                });
                if(flag){
                    $.each(noNIO,function(j){   //If In noNIO status then you cant add that employee to admin
                        if(noNIO[j]==empID)
                            flag=0;
                    });
                }
                break;
            case 2:
                $.each(superAdmin,function(j){   //Check if the employee is already in the list
                    if(superAdmin[j]==empID)
                        flag=0;
                });
                if(flag){
                    $.each(noNIO,function(j){    //If In noNIO status then you cant add that employee to super admin
                        if(noNIO[j]==empID)
                            flag=0;
                    });
                }
                break;
            case 3:
                $.each(noNIO,function(j){        //Check if the employee is already in the list
                    if(noNIO[j]==empID)
                        flag=0;
                });
                $.each(superAdmin,function(j){   //If In superAdmin status then you cant add that employee to noNIO
                    if(superAdmin[j]==empID)
                        flag=0;
                });  
                $.each(admin,function(j){        //If In admin status then you cant add that employee to noNIO
                    if(admin[j]==empID)
                        flag=0;
                });
                break;
        }
        if(flag)
            return true;
        else
            return false;
    }
    
    function changeEmployeeStatus(empID,status){
        $.ajax({
            type: 'post',
            url: 'ajax/assignPrivilege.php',
            data:{
                empID: empID,
                status:status,
                table: tableSelected
            }
        });
    }
    
    function callBackGetList(data){
        
        empList=data['empName'];
        designationList=data['designations'];
        var designationID;
        $.each(designationList,function(i){
            designationID=designationList[i].value;
            desigIDs.push(designationID);    
        });
        
        var i=0;
        while(data['nio'][i]){
            selectedNIO=1;
            nio.push(data['nio'][i]);
            if($(data['nio'][i]['nioDepartment']).not(desigIDs).length == 0 && $(desigIDs).not(data['nio'][i]['nioDepartment']).length == 0)
                data['nio'][i]['nioDepartment']=[];
            nioID++;
            ++i;
        }
        console.log(nio);
        loadDepartment(selectedNIO);
        loadEmployee(selectedNIO);
        
        $.each(nio,function(j){
            var nioID=nio[j].nioID;
            var nioReason=nio[j].nioName;
            $("#nio-reason-type ul").append("<li class=\"nio-reason-type\" id="+nioID+"><table><tr><td class='niotype-clickable' style=\"width: 75%\">"+nioReason+"</td><td><img src=\"images/close_graph_black.png\"></td></tr></table></li>");
            $(".nio-reasons-box").mCustomScrollbar("update");
            $(".nio-reasons-box").mCustomScrollbar("scrollTo","h2:last",{       
                theme:"dark"
            });
            if(j==0){
                $("#"+nioID+' table tr td').css({
                    'background-color':'lightgrey'
                }); 
            }
        });
         
        $('#nio-employee-to-add').autocomplete({
            source: empList,
            appendTo: "",
            minLength: 0,
            select: function( event, ui ) { 
                var employeeID=ui.item.value;
                var employeeName=ui.item.label;
                if(nio.length>0&&validateEmployee(employeeID)){
                   
                    $("#nio-reason-employee ul").append("<li class=\"nio-reason-employee\" employeeID="+employeeID+"><table><tr><td style=\"width: 75%\">"+employeeName+"</td><td><img src=\"images/close_graph_black.png\"></td></tr></table></li>");
                    $(".nio-reasons-box").mCustomScrollbar("update");
                    $(".nio-reasons-box").mCustomScrollbar("scrollTo","h2:last",{       
                        theme:"dark"
                    });
            
                    $.each(nio,function(j){
                        if(nio[j].nioID==selectedNIO){
                            nio[j].nioEmployee.push(employeeID);
                        } 
                    });
                }
                $("#nio-employee-to-add").val("");
                return false;
            }
        });
        
        $("#nio-department-to-add").autocomplete({
            source: designationList,
            select: function(event,ui){
                var designationID=ui.item.value;
                var designationName=ui.item.label;
                if(nio.length>0&&validateDesignation(designationID)){                
                    $("#nio-reason-department ul").append("<li class=\"nio-reason-department\" departmentID="+designationID+"><table><tr><td style=\"width: 75%\">"+designationName+"</td><td><img src=\"images/close_graph_black.png\"></td></tr></table></li>");
                    $(".nio-reasons-box").mCustomScrollbar("update");
                    $(".nio-reasons-box").mCustomScrollbar("scrollTo","h2:last",{       
                        theme:"dark"
                    });
            
                    $.each(nio,function(j){
                        if(nio[j].nioID==selectedNIO){
                            nio[j].nioDepartment.push(designationID);
                        } 
                    });
                }
                $("#nio-department-to-add").val("");
                return false;
            }                  
        }); 
        
        $("#privilege-table-addBox").autocomplete({
            source: empList,
            select: function(event,ui){  
                var employeeID=ui.item.value;
                var employeeName=ui.item.label;
                var jobTitleCode=ui.item.jobTitleCode;
                var jobTitleName;
                $.each(designationList,function(j){
                    if(designationList[j].value==jobTitleCode){
                        jobTitleName=designationList[j].label;
                        return false;
                    } 
                });
                $("#privilege-table-addBox").val(employeeName);
                
                switch(tableSelected){
                    case 1:
                        if(validateAdminPrivilege(employeeID)){
                            $("#table-admin .table-row-adminTable").append(
                                "<tr class='table-row-selectable' empID="+employeeID+">"+
                                "<td>"+employeeID+"</td>"+
                                "<td>"+employeeName+"</td>"+
                                "<td>"+jobTitleName+"</td>"+
                                "<td><img class='cross-admin' src=\"images/close_graph_black.png\"></td>"+                                        
                                "</tr>");
                            admin.push(employeeID);
                            changeEmployeeStatus(employeeID,true);
                        }
                        break;
                    case 2:
                        if(validateAdminPrivilege(employeeID)){
                            $("#table-super-admin .table-row-superAdminTable").append(
                                "<tr class='table-row-selectable' empID="+employeeID+">"+
                                "<td>"+employeeID+"</td>"+
                                "<td>"+employeeName+"</td>"+
                                "<td>"+jobTitleName+"</td>"+
                                "<td><img class='cross-admin' src=\"images/close_graph_black.png\"></td>"+                                        
                                "</tr>");
                            superAdmin.push(employeeID);
                            changeEmployeeStatus(employeeID,true);
                        }
                        break;
                    case 3:
                        if(validateAdminPrivilege(employeeID)){
                            $("#table-non-nio .table-row-nonNIOTable").append(
                                "<tr class='table-row-selectable' empID="+employeeID+">"+
                                "<td>"+employeeID+"</td>"+
                                "<td>"+employeeName+"</td>"+
                                "<td>"+jobTitleName+"</td>"+
                                "<td><img class='cross-admin' src=\"images/close_graph_black.png\"></td>"+                                        
                                "</tr>");
                            noNIO.push(employeeID);
                            changeEmployeeStatus(employeeID,false);     //Dont allow
                        }
                        break;
                }
                return false;
            }                  
        }); 
        
        $("#nio-department-to-add").val("");
        $("#nio-employee-to-add").val("");
        $('.nio-reasons-box').val("");
        
    }
    
    function getList(callBackGetList){
        $.ajax({
            dataType: 'json',
            url: 'ajax/nioTypeJson.php',
            type: 'post',
            success:callBackGetList
        });
    }
    
    getList(callBackGetList);
    
    function callBackEmpStatus(data){
        console.log(data);
        noNIO=data['noAccess'];
        admin=data['admin'];
        superAdmin=data['superAdmin'];
    }
    
    function getEmpStatus(callBackEmpStatus){
        $.ajax({
            dataType: 'json',
            url: 'ajax/empStatus.php',
            type: 'post',
            success:callBackEmpStatus
        });
    }
    
    getEmpStatus(callBackEmpStatus);
    
  
    
    //---------------FRONT END READY-------------------->>>>
    $(".titleTd").click(function() {
        $(".titleTd").addClass('template-darkBack');
        $(".titleTd").removeClass('template-textWhite');
        $(".titleTd").addClass('template-lightColor');
        $(this).removeClass('template-darkBack');
        $(this).addClass('template-lightBack');
        $(this).removeClass('template-lightColor');
        $(this).addClass('template-textWhite');
    });
        
    $("#admin-settings").show();
    $("#settings-general").show();
    $("#settings-privilege").hide();
    $("#settings-nio").hide();
    $("#settings-general").addClass('template-textWhite');
     
    $("#settings-privilege-tab").addClass('template-darkBack');  
    $("#settings-privilege-tab").addClass('template-lightColor');
        
    $("#settings-nio-tab").addClass('template-darkBack');
    $("#settings-nio-tab").addClass('template-lightColor');
       
    $("#settings-general-tab").removeClass('template-lightColor');
    $("#settings-general-tab").removeClass('template-darkBack');
    $("#settings-general-tab").addClass('template-textWhite');
    $("#settings-general-tab").addClass('template-lightBack');  
   
    $("#settings-privilege-tab").click(function(){
        $("#privilege-super-admin-tab").addClass('template-darkBack');
        $("#privilege-super-admin-tab").addClass('template-border');
        $("#privilege-super-admin-tab").addClass('template-lightColor');
       
        $("#privilege-non-nio-tab").addClass('template-darkBack');
        $("#privilege-non-nio-tab").addClass('template-border');
        $("#privilege-non-nio-tab").addClass('template-lightColor');
       
        $("#privilege-admin-tab").removeClass('template-lightColor');
        $("#privilege-admin-tab").addClass('template-textWhite');
        $("#privilege-admin-tab").removeClass('template-darkBack').addClass('template-lightBack');
        $("#privilege-admin-tab").addClass('template-border'); 
        
        $("#table-admin").show();
        $("#table-super-admin").hide();
        $("#table-non-nio").hide();
        
        var employeeID;
        var employeeName;
        var jobTitleCode;
        var jobTitleName;
        $.each(admin,function(j){
            $.each(empList,function(i){
                if(empList[i].value==admin[j]){
                    employeeID=empList[i].value;
                    employeeName=empList[i].label;
                    jobTitleCode=empList[i].jobTitleCode;
                    $.each(designationList,function(j){
                        if(designationList[j].value==jobTitleCode){
                            jobTitleName=designationList[j].label;
                            return false;
                        } 
                    });
                    $("#table-admin .table-row-adminTable").append(
                        "<tr class='table-row-selectable' empID="+employeeID+">"+
                        "<td>"+employeeID+"</td>"+
                        "<td>"+employeeName+"</td>"+
                        "<td>"+jobTitleName+"</td>"+
                        "<td><img class='cross-admin' src=\"images/close_graph_black.png\"></td>"+                                        
                        "</tr>");
                    return false;
                } 
            });
            
        });
        
    });
    
    $("#privilege-admin-tab").click(function(){
        $(".admin-table-div").hide();
        $("#table-admin").show();
        tableSelected=1;
        $("#table-admin .table-row-adminTable").empty();
        var employeeID;
        var employeeName;
        var jobTitleCode;
        var jobTitleName;
        $.each(admin,function(j){
            $.each(empList,function(i){
                if(empList[i].value==admin[j]){
                    employeeID=empList[i].value;
                    employeeName=empList[i].label;
                    jobTitleCode=empList[i].jobTitleCode;
                    $.each(designationList,function(j){
                        if(designationList[j].value==jobTitleCode){
                            jobTitleName=designationList[j].label;
                            return false;
                        } 
                    });
                    $("#table-admin .table-row-adminTable").append(
                        "<tr class='table-row-selectable' empID="+employeeID+">"+
                        "<td>"+employeeID+"</td>"+
                        "<td>"+employeeName+"</td>"+
                        "<td>"+jobTitleName+"</td>"+
                        "<td><img class='cross-admin' src=\"images/close_graph_black.png\"></td>"+                                        
                        "</tr>");
                    return false;
                } 
            });
            
        });
        
    });
    
    $("#privilege-super-admin-tab").click(function(){
        $(".admin-table-div").hide();
        $("#table-super-admin").show();
        tableSelected=2;
        
        var employeeID;
        var employeeName;
        var jobTitleCode;
        var jobTitleName;
        $.each(superAdmin,function(j){
            $.each(empList,function(i){
                if(empList[i].value==superAdmin[j]){
                    employeeID=empList[i].value;
                    employeeName=empList[i].label;
                    jobTitleCode=empList[i].jobTitleCode;
                    $.each(designationList,function(j){
                        if(designationList[j].value==jobTitleCode){
                            jobTitleName=designationList[j].label;
                            return false;
                        } 
                    });
                    $("#table-super-admin .table-row-superAdminTable").empty();
                    $("#table-super-admin .table-row-superAdminTable").append(
                        "<tr class='table-row-selectable' empID="+employeeID+">"+
                        "<td>"+employeeID+"</td>"+
                        "<td>"+employeeName+"</td>"+
                        "<td>"+jobTitleName+"</td>"+
                        "<td><img class='cross-admin' src=\"images/close_graph_black.png\"></td>"+                                        
                        "</tr>");
                    return false;
                } 
            });
            
        });
        
    });
    
    $("#privilege-non-nio-tab").click(function(){
        $(".admin-table-div").hide();
        $("#table-non-nio").show();
        tableSelected=3;
        var employeeID;
        var employeeName;
        var jobTitleCode;
        var jobTitleName;
        $.each(noNIO,function(j){
            $.each(empList,function(i){
                if(empList[i].value==noNIO[j]){
                    employeeID=empList[i].value;
                    employeeName=empList[i].label;
                    jobTitleCode=empList[i].jobTitleCode;
                    $.each(designationList,function(j){
                        if(designationList[j].value==jobTitleCode){
                            jobTitleName=designationList[j].label;
                            return false;
                        } 
                    });
                    $("#table-non-nio .table-row-nonNIOTable").empty();
                    $("#table-non-nio .table-row-nonNIOTable").append(
                        "<tr class='table-row-selectable' empID="+employeeID+">"+
                        "<td>"+employeeID+"</td>"+
                        "<td>"+employeeName+"</td>"+
                        "<td>"+jobTitleName+"</td>"+
                        "<td><img class='cross-admin' src=\"images/close_graph_black.png\"></td>"+                                        
                        "</tr>"); 
                    return false;
                } 
            });
        });
    });
    
    //---------------ADMIN SETTINGS------------------------------------
    
    $("#settings-general-tab").click(function(){
        $(".settings-contents").hide();
        $("#settings-general").show();
    });
    
    $("#settings-privilege-tab").click(function(){
        $(".settings-contents").hide();
        $("#settings-privilege").show();
    }); 
    
    $("#settings-nio-tab").click(function(){
        $(".settings-contents").hide();
        $("#settings-nio").show();
    }); 
    
    $(".navigation-tab").click(function() {
        $(".navigation-tab").addClass('template-darkBack');
        $(".navigation-tab").removeClass('template-textWhite');
        $(".navigation-tab").addClass('template-lightColor');
        $(this).removeClass('template-darkBack');
        $(this).addClass('template-lightBack');
        $(this).removeClass('template-lightColor');
        $(this).addClass('template-textWhite');
    });
 
    $(".cb-enable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-disable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', true);
    });
    $(".cb-disable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-enable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', false);
    });
 
    $(".leave-prio-box").sortable({
        stop: function(e, ui) {
            // gets the new and old index then removes the temporary attribute
            var index = ui.item.index();
            var highestIndex=0;
            $(this).removeAttr('data-previndex');
            $('[flag=1]').each(function() {
                highestIndex=$(this).index();
            });
            $('[flag=0]').each(function() {
                if(highestIndex<$(this).index()){
                    $(this).css({
                        "background-color":"grey"
                    });
                }
                else{
                    $(this).css({
                        "background-color":"#E68A2E"
                    });
                }
                    
            });
        }
    });  
   
    $(".nio-reasons-box").mCustomScrollbar({
        theme:"dark"
    });
    
    //-----------------------------NIO TAB------------------------------------
    //------ structure ---------
    //{
    //nioID             : 1
    //nioName           : "Forgot ID Card"
    //nioDepartment     : []
    //nioEmployee       : []
    //id                : -1            //THIS IS ID IN THE DATABASE 
    //}
    //
    
    //validation of differentFields
    
    //Validation of Reason
    
    function validateReason(reason){
        var flag=1;
        $.each(nio,function(j){
            if(nio[j].nioName.toLowerCase()==reason.toLowerCase())
                flag=0;
        });
        if(flag==0)
            return false;
        
        return true;
    }
    
    function validateEmployee(id){
        var flag=1;
        $.each(nio,function(j){
            if(nio[j].nioID==selectedNIO)
                $.each(nio[j].nioEmployee,function(i){
                    if(nio[j].nioEmployee[i]==id)
                        flag=0;
                });
        });
        if(flag==0)
            return false;
        
        return true;
    }
    
    function validateDesignation(id){
        var flag=1;
        $.each(nio,function(j){
            if(nio[j].nioID==selectedNIO)
                $.each(nio[j].nioDepartment,function(i){
                    if(nio[j].nioDepartment[i]==id)
                        flag=0;
                });
        });
        if(flag==0)
            return false;
        
        return true;
    }
    
    function loadDepartment(nioID){
        var designationName;
        var designationID;
        $.each(nio,function(j){
            if(nio[j].nioID==nioID){
                $("#nio-reason-department ul").empty();
                $.each(nio[j].nioDepartment,function(i){
                    $.each(designationList,function(k){
                        console.log(nio[j].nioDepartment[i]);
                        if(designationList[k].value==nio[j].nioDepartment[i]){
                            designationName=designationList[k].label;
                            designationID=designationList[k].value;
                        } 
                    });
                    $("#nio-reason-department ul").append("<li class=\"nio-reason-department\" departmentID="+designationID+"><table><tr><td style=\"width: 75%\">"+designationName+"</td><td><img src=\"images/close_graph_black.png\"></td></tr></table></li>");
                });
            } 
        });
    }
    
    function loadEmployee(nioID){
        var employeeName;
        var employeeID;
        $.each(nio,function(j){
            if(nio[j].nioID==nioID){
                $("#nio-reason-employee ul").empty();
                $.each(nio[j].nioEmployee,function(i){
                    $.each(empList,function(k){
                        if(empList[k].value==nio[j].nioEmployee[i]){
                            employeeName=empList[k].label;
                            employeeID=empList[k].value;
                        } 
                    });
                    $("#nio-reason-employee ul").append("<li class=\"nio-reason-employee\" employeeID="+employeeID+"><table><tr><td style=\"width: 75%\">"+employeeName+"</td><td><img src=\"images/close_graph_black.png\"></td></tr></table></li>");
                });
            } 
        });
    }
    
    
    $("body").delegate(".nio-reason-type table tr td img","click",function(){       //Removing a reason
        $(this).parent().parent().parent().parent().parent().css({
            "margin":"0px",
            "padding":"0px"
        });
        $("#nio-reason-department ul").empty();
        $("#nio-reason-employee ul").empty();
        var id=$(this).parent().parent().parent().parent().parent().attr('id');
        $.each(nio,function(j){
            if(nio[j].nioID==id){
                nio.splice(j,1);
                return false;
            } 
        });
        $(this).parent().parent().parent().parent().empty();
        if(selectedNIO==id&&nio.length>0){
            $("#"+nio[0]['nioID']+' table tr td').css({
                'background-color':'lightgrey'
            });
            selectedNIO=nio[0].nioID;
            loadDepartment(selectedNIO);
            loadEmployee(selectedNIO);
        }  
    });
    
    $("body").delegate(".nio-reason-employee table tr td img","click",function(){       //Removing a Employee
        $(this).parent().parent().parent().parent().parent().css({
            "margin":"0px",
            "padding":"0px"
        });
        var employeeID=$(this).parents('.nio-reason-employee').attr('employeeID');
        $(this).parent().parent().parent().parent().empty();
        
        $.each(nio,function(j){
            if(nio[j].nioID==selectedNIO){
                $.each(nio[j].nioEmployee,function(i){
                    if(nio[j].nioEmployee[i]==employeeID){
                        nio[j].nioEmployee.splice(i,1);
                        return false;
                    } 
                });
                return false;
            } 
        });      
    });
    
    $("body").delegate(".nio-reason-department table tr td img","click",function(){       //Removing a Department      
        $(this).parent().parent().parent().parent().parent().css({
            "margin":"0px",
            "padding":"0px"
        });
        var departmentID=$(this).parents('.nio-reason-department').attr('departmentID');
        $(this).parent().parent().parent().parent().empty();  
        $.each(nio,function(j){
            if(nio[j].nioID==selectedNIO){
                $.each(nio[j].nioDepartment,function(i){
                    if(nio[j].nioDepartment[i]==departmentID){
                        nio[j].nioDepartment.splice(i,1);
                        return false;
                    } 
                });
                return false;
            } 
        });
    });
 
    //--------------Selecting NIO--------------------
 
    $('body').delegate('.nio-reason-type table tr .niotype-clickable','click',function(){        //Selecting a reason
        $('.nio-reason-type table tr td').css({
            'background-color':'#e68a2e'
        });
        var id=$(this).parent().parent().parent().parent().attr('id');
        $("#"+id+' table tr td').css({
            'background-color':'lightgrey'
        }); 
        selectedNIO=id;
        loadDepartment(id);
        loadEmployee(id);
    });
    
    $('#nio-reason-to-add').keypress(function (e) {            //Adding a reason
       
        var key = e.which;
        if(key == 13)  {
            var nioReason=$("#nio-reason-to-add").val();
            if( nioReason.length&&validateReason(nioReason)){
                nio.push({
                    'nioID':nioID,
                    'nioName':nioReason,
                    'nioDepartment':[],
                    'nioEmployee':[],
                    'id':-1
                });
                $("#nio-reason-to-add").val("");
                $("#nio-reason-type ul").append("<li class=\"nio-reason-type\" id="+nioID+"><table><tr><td class='niotype-clickable' style=\"width: 75%\">"+nioReason+"</td><td><img src=\"images/close_graph_black.png\"></td></tr></table></li>");
                $(".nio-reasons-box").mCustomScrollbar("update");
                $(".nio-reasons-box").mCustomScrollbar("scrollTo","h2:last",{       
                    theme:"dark"
                });
                
                if(nio.length==1){
                    $("#"+nioID+' table tr td').css({
                        'background-color':'lightgrey'
                    }); 
                    selectedNIO=nioID;
                }
                nioID++;
            }
        }
    });
    
    //--------------------Saving NIO-----------------------
    $('#save-nio-type').click(function(){
        if(nio.length>0){
            $.ajax({
                data:{
                    data:nio
                },
                type: 'post',
                url: 'ajax/saveNIO.php',
                success: function(data){
                    alert("Saved");
                    window.location='admin.php';
                }
            });
        }
    });
   
    $('#cancel-nio-type').click(function(){
        window.location='admin.php';
    });
    
    $('body').delegate('.cross-admin','click',function(){
        alert('okay');
        $(this).parents('tr').css({
            'padding':'0px',
            'margin':'0px'
        });
        var empID=$(this).parents('tr').attr('empID');
        $(this).parents('tr').remove();
        console.log(empID);
        var status;
        switch(tableSelected){
            case 1:
                status=false;
                $.each(admin,function(j){
                    if(empID==admin[j])
                        admin.splice(j,1);
                });
                break;
            case 2:
                status=false;
                $.each(superAdmin,function(j){
                    if(empID==superAdmin[j])
                        superAdmin.splice(j,1);
                });
                break;
            case 3:
                 $.each(noNIO,function(j){
                    if(empID==noNIO[j])
                        noNIO.splice(j,1);
                });
                status=true;
                break;
        }
        changeEmployeeStatus(empID,status);
    });

});

//------------------------Deleting Privilege Assignment----------------------


 
