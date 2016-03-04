var myApp = angular.module("myApp",[]);
    myApp.controller('myAppController',['$scope', '$http', function($scope,$http){
	var s = $scope; 
    var plot = [] 
    s.min = []
    s.max = []
    s.houses=[];
    s.ranges = []
    s.averages = []
    s.myPriceArray=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    s.myArray = [];

//----------------------------- final output format ----------------------------
    //s.ranges = [
    //         [100000, 4, 6],
    //     ];
    // s.averages = [
    //         [50000, 1],
    //     ];
    
//------------------------- requst for info ------------------------------------------

    s.getYearBuilt = function(){
    $http.post('/api/getYearBuilt')
        .then(function(array){
            s.newArray = array.data;
            console.log('s.newarry', s.newArray)
            // yearBuilt(s.newArray);
            // var yearArray = 
            // //pass the obj through - do I need to make it an array of arrays first?
            // buildScatterChart(scatterArray);
            $(function () {
        $('#containerYear').highcharts({
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Square Footage vs Year Built'
            },
            subtitle: {
                text: 'Source: MLS'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Year Built'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true,
                max:2016,
            },
            yAxis: {
                title: {
                    text: 'Square Feet',
                },
                max:7000,
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 3,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x}, {point.y}'
                    }
                }
            },
            series: [{
                name: 'House',
                color: 'rgba(223, 83, 83, .5)',
                data: s.newArray
            }]
        });
    });
        })
   }
   s.getYearBuilt();

   s.manySearch = function(){
        $http.post('/api/manySearch')
            .then(function(returnData){
                s.houses = spliceTop(returnData.data);//cuts out the top price values
                console.log(s.houses.length)
                var houseGroups = _.groupBy(s.houses, function(obj){return 50000*Math.ceil((obj['List Price'])/50000)})
                // console.log(houseGroups)
                s.range1 = (Object.keys(houseGroups))
                for(var index in houseGroups){
                    // console.log(houseGroups[index])
                    var temp = houseGroups[index]
                    var beds = []
                    for(var i=0;i<temp.length; i++){
                        beds.push(temp[i]['Total Bedrooms'])
                    }
                    s.max.push(_.max(beds))
                    s.min.push(_.min(beds))
                }
                // console.log(s.ranges)
                // console.log(s.min)
                // console.log(s.max)
                for(var i = 0; i < s.range1.length; i++){
                    s.ranges.push([s.range1[i],s.max[i],s.min[i]])
                    s.averages.push([s.range1[i],s.max[i]])
                }
                // console.log(s.ranges)
                // console.log(s.averages)

                $(function () {
                $('#containerRange').highcharts({

                    title: {
                        text: 'House Rooms per Price Category'
                    },

                    xAxis: {
                        title:{
                            text: 'Price category'
                        },
                        categories: ['100k','150k','200k','250k','300k','350k','400k','450k','500k','550k','600k','650k','700k','750k','800k','850k','900k','950k','1mil','1.05mil','1.1mil','1.15mil','1.2mil',]
                    },

                    yAxis: {
                        title: {
                            text: 'Number of Rooms'
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true,
                    },
                    legend: {
                    },
                    series: [{
                        name: 'Range',
                        data: s.ranges,
                        type: 'arearange',
                        lineWidth: 0,
                        linkedTo: ':previous',
                        color: Highcharts.getOptions().colors[2],
                        fillOpacity: 0.5,
                        zIndex: 0
                    }]
                });
            });
        });
}() //calling this function




   // s.getPrices = function(){
   //  $http.post('/api/getAllPrices')
   //      .then(function(array){
   //          s.myArray = array.data;
   //          groupPrices(s.myArray);
   //          console.log("do we ever return here?? ");
   //          var scatterArray = groupPricesScatter(s.myArray);
   //          //pass the obj through - do I need to make it an array of arrays first?
   //          buildScatterChart(scatterArray);
   //      })
   // }

   // s.getPrices();

   //called by getPrices function to group them into graphable form

 
//--------------------------------- helper functions ----------------------

    //pushes all used data point into new array
    function spliceTop(arr){
        for(var obj in arr){
            if(arr[obj]['List Price'] < 1200000){
                // console.log(arr[obj]['List Price'])
                plot.push(arr[obj])
            }
        }
        // console.log(plot)
        return plot
    }   


    function groupPrices(myArray){
        for (var arraySpot=0;arraySpot<20;arraySpot++){
            console.log("arrayspot outer loop pos ",arraySpot);


            for (var i=0;i<myArray.length;i++){
                var price = myArray[i];


                if (price<((arraySpot+1)*50000) && price>((arraySpot)*50000)){
                    
                    s.myPriceArray[arraySpot]+=1;

                };

        };


//------------------------------------------------
    

}}}])

