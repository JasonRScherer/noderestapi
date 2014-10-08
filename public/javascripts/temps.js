var chart;

$(document).ready(function(){
    chart = new Highcharts.Chart({
        chart:{
            renderTo: 'chart',
            type:'column',
            showAxes: true
            },
        title: {
            text:'Temperatures'
            },
        xAxis: {
            title:{
                text: 'Days'
            },
            categories: ['Day 1','Day 2', 'Day 3','Day 4']
        },
        yAxis: {
            title:{
                text: 'Temperatures'
            }
        },
        series: [{
            data:[1,2,4,5]
        }]
    });
});
