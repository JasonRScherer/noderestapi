$(function(){
    $.getJSON('/api/temperatures', function(dataFound){
        var tempsFound = [];
        for(var i = 0; i<dataFound.length; i++){
            tempsFound[i] = dataFound[i].temp_l;
            alert(Date(dataFound[i].date));
        }
        var options = {
            chart: {
                renderTo: 'chart',
            },
            series: [{
                data:tempsFound
            }],
            rangeSelector: {
                buttons: [{
                count:1,
                type:'minute',
                text: '1M'
                },{
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false,
                selected:0
            }
        };
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        var chart = new Highcharts.StockChart(options);
    });
});
