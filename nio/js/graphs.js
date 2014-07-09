
$(document).ready(function() {
    $("#daily_graph").css("background-color", "#e77817");
    // var dateForgraph=Date();
    // console.log(dateForgraph);
    /*
     
     //$("#temptime").datepicker({picker: "<img class='picker' align='middle' src='images/cal-month.png' alt=''/>"});
     var date = "2010-02-05";
     var year="2010";
     var month="02";
     // console.log(year);
     $.ajax({
     dataType: 'json',
     url: 'ajax/attendancedaygraph.php',
     type: 'post',
     data: {
     dateselected: date,
     monthselected:month,
     yearselected:year
     
     
     },
     success: function(data) {
     // console.log(data);
     var work_inday = data[0];
     var yettowork_inday = data[1];
     var day =data[2];
     console.log(data);
     //startof day graph
     $('#day').highcharts({
     chart: {
     type: 'bar',
     backgroundColor: '#F9D597',
     borderColor: '#F9D597',
     plotBorderColor: '#F9D597'
     
     },
     title: {
     text: 'Daily Analysis chart'
     },
     xAxis: {
     categories: day
     },
     yAxis: {
     min: 0,
     title: {
     text: 'Working Hours'
     
     }
     },
     legend: {
     reversed: true
     },
     tooltip: {
     pointFormat: '{series.name}: <b>{point.y}</b><br/>',
     valueSuffix: ' hr',
     shared: true
     },
     plotOptions: {
     series: {
     stacking: 'normal',
     animation: false
     
     }
     },
     series: [{
     name: 'Yet to work ',
     data: yettowork_inday
     }, {
     name: 'Work',
     data: work_inday
     }], colors: ['#E77817', '#fcb334']
     });
     
     
     //end of day graph 
     
     //start of week graph 
     $('#week').highcharts({
     chart: {
     type: 'bar',
     backgroundColor: '#F9D597',
     borderColor: '#F9D597',
     plotBorderColor: '#F9D597'
     },
     title: {
     text: 'Weekly Analysis chart'
     },
     xAxis: {
     categories: ['Week1', 'Week2', 'Week3', 'Week4']
     },
     yAxis: {
     min: 0,
     title: {
     text: 'Working Hours'
     }
     },
     legend: {
     reversed: true
     },
     tooltip: {
     pointFormat: '{series.name}: <b>{point.y}</b><br/>',
     valueSuffix: ' hr',
     shared: true
     },
     plotOptions: {
     series: {
     stacking: 'normal',
     animation: true
     }
     },
     series: [{
     name: 'Yet to work ',
     data: [4, 24, 2, 10]
     }, {
     name: 'Work',
     data: [40, 20, 42, 34]
     }], colors: ['#E77817', '#fcb334']
     });
     
     //end of week graph
     
     
     
     //start of month graph
     $('#month').highcharts({
     chart: {
     type: 'bar',
     backgroundColor: '#F9D597',
     borderColor: '#F9D597',
     plotBorderColor: '#F9D597'
     },
     title: {
     text: 'Monthly Analysis chart'
     },
     xAxis: {
     categories: [' January', 'February ', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octobar', 'November', 'December']
     },
     yAxis: {
     min: 0,
     title: {
     text: 'Working Hours'
     }
     },
     legend: {
     reversed: true
     },
     tooltip: {
     pointFormat: '{series.name}: <b>{point.y}</b><br/>',
     valueSuffix: ' hr',
     shared: true
     },
     plotOptions: {
     series: {
     stacking: 'normal',
     animation: true
     }
     },
     series: [{
     name: 'Yet to work ',
     data: [22, 41, 62, 13, 3, 23, 69, 8, 35, 71, 4, 32]
     }, {
     name: 'Work',
     data: [162, 143, 122, 171, 181, 161, 115, 176, 149, 113, 180, 152]
     }], colors: ['#E77817', '#fcb334']
     });
     
     //end of month graph
     
     
     }
     });
     
     */

    $('#week').hide();
    $('#month').hide();
    //   $('#day').show();









































    /*
     
     
     
     
     $('#day').highcharts({
     chart: {
     type: 'bar',
     backgroundColor: '#F9D597',
     borderColor: '#F9D597',
     plotBorderColor: '#F9D597'
     
     },
     title: {
     text: 'Daily Analysis chart'
     },
     xAxis: {
     categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
     },
     yAxis: {
     min: 0,
     title: {
     text: 'Working Hours'
     
     }
     },
     legend: {
     reversed: true
     },
     tooltip: {
     pointFormat: '{series.name}: <b>{point.y}</b><br/>',
     valueSuffix: ' hr',
     shared: true
     },
     plotOptions: {
     series: {
     stacking: 'normal',
     animation: false
     
     }
     },
     series: [{
     name: 'Yet to work ',
     data: [0, 2.75, 1.25, 4, 3.75, .05, 0]
     }, {
     name: 'Work',
     data: [0, 6, 7.5, 4.75, 5, 8.7, 0]
     }], colors: ['#E77817', '#fcb334']
     });
     
     
     
     */

    /*
     
     $('#week').highcharts({
     chart: {
     type: 'bar',
     backgroundColor: '#F9D597',
     borderColor: '#F9D597',
     plotBorderColor: '#F9D597'
     },
     title: {
     text: 'Weekly Analysis chart'
     },
     xAxis: {
     categories: ['Week1', 'Week2', 'Week3', 'Week4']
     },
     yAxis: {
     min: 0,
     title: {
     text: 'Working Hours'
     }
     },
     legend: {
     reversed: true
     },
     tooltip: {
     pointFormat: '{series.name}: <b>{point.y}</b><br/>',
     valueSuffix: ' hr',
     shared: true
     },
     plotOptions: {
     series: {
     stacking: 'normal',
     animation: true
     }
     },
     series: [{
     name: 'Yet to work ',
     data: [4, 24, 2, 10]
     }, {
     name: 'Work',
     data: [40, 20, 42, 34]
     }], colors: ['#E77817', '#fcb334']
     });
     
     
     
     
     */




    /*
     
     $('#month').highcharts({
     chart: {
     type: 'bar',
     backgroundColor: '#F9D597',
     borderColor: '#F9D597',
     plotBorderColor: '#F9D597'
     },
     title: {
     text: 'Monthly Analysis chart'
     },
     xAxis: {
     categories: [' January', 'February ', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octobar', 'November', 'December']
     },
     yAxis: {
     min: 0,
     title: {
     text: 'Working Hours'
     }
     },
     legend: {
     reversed: true
     },
     tooltip: {
     pointFormat: '{series.name}: <b>{point.y}</b><br/>',
     valueSuffix: ' hr',
     shared: true
     },
     plotOptions: {
     series: {
     stacking: 'normal',
     animation: true
     }
     },
     series: [{
     name: 'Yet to work ',
     data: [22, 41, 62, 13, 3, 23, 69, 8, 35, 71, 4, 32]
     }, {
     name: 'Work',
     data: [162, 143, 122, 171, 181, 161, 115, 176, 149, 113, 180, 152]
     }], colors: ['#E77817', '#fcb334']
     });
     
     
     
     
     
     */


//daily chart
    //    var date=$('#datepicker').val();
    //  alert(date);




    $('#monthchoose').hide();
    $('#yearchoose').hide();
    $('#datechoose').show();


    //var date = Date();
//for present default day
    var d = new Date();

    var curr_date = d.getDate();

    var curr_month = d.getMonth();

    var curr_year = d.getFullYear();

    var datetoday = (curr_year + "-" + curr_month + "-" + curr_date);

   // console.log(datetoday);


    $.ajax({
        dataType: 'json',
        url: 'ajax/attendancedaygraph.php',
        type: 'post',
        data: {
            dateselected: datetoday,
        },
        success: function(data) {
            var work_inday = data[0];
            var yettowork_inday = data[1];
            var day = data[2];
            // console.log(day);
            //startof day graph
            $('#day').highcharts({
                chart: {
                    type: 'bar',
                    backgroundColor: '#F9D597',
                    borderColor: '#F9D597',
                    plotBorderColor: '#F9D597'

                },
                title: {
                    text: 'Daily Analysis chart'
                },
                xAxis: {
                    categories: day


                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Working Hours'

                    }
                },
                legend: {
                    reversed: true
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                    valueSuffix: ' hr',
                    shared: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        animation: false

                    }
                },
                series: [{
                        name: 'Yet to work ',
                        data: yettowork_inday
                    }, {
                        name: 'Work',
                        data: work_inday
                    }], colors: ['#E77817', '#fcb334']
            });

        }


    });

//

// for day from date box 
    $('#datepicker').change(function() {
        var date1 = ($(this).val());

      //  console.log(date1);


        $.ajax({
            dataType: 'json',
            url: 'ajax/attendancedaygraph.php',
            type: 'post',
            data: {
                dateselected: date1
            },
            success: function(data) {
                var work_inday = data[0];
                var yettowork_inday = data[1];
                var day = data[2];
                //console.log(data);
                //startof day graph
                $('#day').highcharts({
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F9D597',
                        borderColor: '#F9D597',
                        plotBorderColor: '#F9D597'

                    },
                    title: {
                        text: 'Daily Analysis chart'
                    },
                    xAxis: {
                        categories: day
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Working Hours'

                        }
                    },
                    legend: {
                        reversed: true
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                        valueSuffix: ' hr',
                        shared: true
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal',
                            animation: false

                        }
                    },
                    series: [{
                            name: 'Yet to work ',
                            data: yettowork_inday
                        }, {
                            name: 'Work',
                            data: work_inday
                        }], colors: ['#E77817', '#fcb334']
                });
            }


        });






    });




//for week graph dynamic
    $('#monthpicker').change(function() {
        var month = ($(this).val());

      //  console.log(month);
        $.ajax({
            dataType: 'json',
            url: 'ajax/attendanceweekgraph.php',
            type: 'post',
            data: {
                monthselected: month,
            },
            success: function(data) {
                var workinweek = data[0];
                var yettoworkinweek = data[1];
                var week = data[2];
                // console.log(data);
             //   console.log(workinweek);
             //   console.log(yettoworkinweek);
            //    console.log(workinweek);


                $('#week').highcharts({
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F9D597',
                        borderColor: '#F9D597',
                        plotBorderColor: '#F9D597'

                    },
                    title: {
                        text: 'Weekly Analysis chart'
                    },
                    xAxis: {
                        categories: week


                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Working Hours'

                        }
                    },
                    legend: {
                        reversed: true
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                        valueSuffix: ' hr',
                        shared: true
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal',
                            animation: false

                        }
                    },
                    series: [{
                            name: 'Yet to work ',
                            data: yettoworkinweek
                        }, {
                            name: 'Work',
                            data: workinweek
                        }], colors: ['#E77817', '#fcb334']
                });

            }


        });



    });

//for year graph dynaimc 
    $('#yearpicker').change(function() {
        var year = ($(this).val());
     //   console.log(year);
        $.ajax({
            dataType: 'json',
            url: 'ajax/attendancemonthgraph.php',
            type: 'post',
            data: {
                yearselected: year,
            },
            success: function(data) {
                var work = data[0];
                var yettowork = data[1];
                var month = data[2];
               console.log(data);
                //startof day graph
                $('#month').highcharts({
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F9D597',
                        borderColor: '#F9D597',
                        plotBorderColor: '#F9D597'

                    },
                    title: {
                        text: 'Daily Analysis chart'
                    },
                    xAxis: {
                        categories: month


                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Working Hours'

                        }
                    },
                    legend: {
                        reversed: true
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                        valueSuffix: ' hr',
                        shared: true
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal',
                            animation: false

                        }
                    },
                    series: [{
                            name: 'Yet to work ',
                            data: yettowork
                        }, {
                            name: 'Work',
                            data: work
                        }], colors: ['#E77817', '#fcb334']
                });

            }


        });




    });


    $("#daily_graph").click(function() {
        $('#day').show();
        $('#week').hide();
        $('#month').hide();
        $('#datechoose').show();
        $('#monthchoose').hide();
        $('#yearchoose').hide();

        $(this).css("background-color", "#e77817");
        $("#weekly_graph").css("background-color", "orange");
        $("#monthly_graph").css("background-color", "orange");







    });



//weekly chart
    $("#weekly_graph").click(function() {
        $('#month').hide();
        $('#day').hide();
        $('#week').show();
        $(this).css("background-color", "#e77817");
        $("#monthly_graph").css("background-color", "orange");
        $("#daily_graph").css("background-color", "orange");
        $('#datechoose').hide();
        $('#monthchoose').show();
        $('#yearchoose').hide();


        //on click default week grpah
        var d = new Date();

        var curr_date = d.getDate();

        var curr_month = d.getMonth();

        var curr_year = d.getFullYear();

        var datetoday = (curr_year + "/" + curr_month + "/" + curr_date);

        //console.log(datetoday);
         $.ajax({
            dataType: 'json',
            url: 'ajax/attendanceweekgraph.php',
            type: 'post',
            data: {
                monthselected: datetoday
            },
            success: function(data) {
                var workinweek = data[0];
                var yettoworkinweek = data[1];
                var week = data[2];
                // console.log(data);
                //console.log(workinweek);
              //  console.log(yettoworkinweek);
              //  console.log(workinweek);


                $('#week').highcharts({
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F9D597',
                        borderColor: '#F9D597',
                        plotBorderColor: '#F9D597'

                    },
                    title: {
                        text: 'Weekly Analysis chart'
                    },
                    xAxis: {
                        categories: week


                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Working Hours'

                        }
                    },
                    legend: {
                        reversed: true
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                        valueSuffix: ' hr',
                        shared: true
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal',
                            animation: false

                        }
                    },
                    series: [{
                            name: 'Yet to work ',
                            data: yettoworkinweek
                        }, {
                            name: 'Work',
                            data: workinweek
                        }], colors: ['#E77817', '#fcb334']
                });

            }


        });



    });



//yearly chart
    $("#monthly_graph").click(function() {
        $('#month').show();
        $('#day').hide();
        $('#week').hide();
        $(this).css("background-color", "#e77817");
        $("#daily_graph").css("background-color", "orange");
        $("#weekly_graph").css("background-color", "orange");
        $('#datechoose').hide();
        $('#monthchoose').hide();
        $('#yearchoose').show();
        
        
        var d = new Date();

        var curr_date = d.getDate();

        var curr_month = d.getMonth();

        var curr_year = d.getFullYear();

        var datetoday = (curr_year + "/" + curr_month + "/" + curr_date);
          $.ajax({
            dataType: 'json',
            url: 'ajax/attendancemonthgraph.php',
            type: 'post',
            data: {
                yearselected: datetoday,
            },
            success: function(data) {
                var work = data[0];
                var yettowork = data[1];
                var month = data[2];
               console.log(data);
                //startof day graph
                $('#month').highcharts({
                    chart: {
                        type: 'bar',
                        backgroundColor: '#F9D597',
                        borderColor: '#F9D597',
                        plotBorderColor: '#F9D597'

                    },
                    title: {
                        text: 'Daily Analysis chart'
                    },
                    xAxis: {
                        categories: month


                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Working Hours'

                        }
                    },
                    legend: {
                        reversed: true
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                        valueSuffix: ' hr',
                        shared: true
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal',
                            animation: false

                        }
                    },
                    series: [{
                            name: 'Yet to work ',
                            data: yettowork
                        }, {
                            name: 'Work',
                            data: work
                        }], colors: ['#E77817', '#fcb334']
                });

            }


        });

    });

});

