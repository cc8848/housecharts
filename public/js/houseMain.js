var myApp = angular.module("myApp",[]);

myApp.controller('myAppController',['$scope', '$http', function($scope,$http){
	var s = $scope;
	
	s.house={};
    s.houses=[];
    s.myPriceArray=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    s.myArray = [];

    console.log("IS IT WORKING");



s.getYearBuilt = function(){
    $http.post('/api/getYearBuilt')
        .then(function(array){
            s.newArray = array.data;
            console.log(s.newArray)
            // yearBuilt(s.newArray);
            // var yearArray = 
            // //pass the obj through - do I need to make it an array of arrays first?
            // buildScatterChart(scatterArray);
        })
   }
   s.getYearBuilt();


   s.getPrices = function(){
    $http.post('/api/getAllPrices')
        .then(function(array){
            s.myArray = array.data;
            groupPrices(s.myArray);
            console.log("do we ever return here?? ");
            var scatterArray = groupPricesScatter(s.myArray);
            //pass the obj through - do I need to make it an array of arrays first?
            buildScatterChart(scatterArray);
        })
   }

   s.getPrices();

   //called by getPrices function to group them into graphable form

   function groupPrices(myArray){
        for (var arraySpot=0;arraySpot<20;arraySpot++){
            console.log("arrayspot outer loop pos ",arraySpot);


            for (var i=0;i<myArray.length;i++){
                var price = myArray[i];


                if (price<((arraySpot+1)*50000) && price>((arraySpot)*50000)){
                    
                    s.myPriceArray[arraySpot]+=1;
                }
                
            }


        }
        console.log("num houses at price array ",s.myPriceArray);
        buildBarChart();

        return ("coming back from groupPrices");

   }


   function groupPricesScatter (myArray){
        //use myArray
        var scatterObj = {};
        for (var i = 0;i<myArray.length;i++){
            var price = myArray[i];
            if (scatterObj[price]==undefined){
                scatterObj[price]=1;
            }   else {
                scatterObj[price]+=1;
            }
        }

        //this object will have a key for every unique price point, and the value is the # of houses at that point
        //console.log("scatterObj ",scatterObj);
        //convert this stupid shit to an array
        var scatterArray = [];
        for (field in scatterObj){
            scatterArray.push([field,scatterObj[field]]);
        }
        //console.log("did this turn into an array? ",scatterArray);
        return (scatterArray);

   }



//-------------------------------------------------------------------

function buildBarChart (scatterObj){


        $(function () { 
           $('#container').highcharts({
               chart: {
                   type: 'bar'
               },
               title: {
                   text: 'Home Prices'
               },
               xAxis: {
                   categories: ['50k','100k','150k','200k','250k','300k','350k','400k','450k','500k','550k','600k','650k','700k','750k','800k','850k','900k','950k','1000k']
               },
               yAxis: {
                   title: {
                       text: 'Number of Houses'
                   }
               },
              series: [{
               data: s.myPriceArray
             }]
           });
        });

    return ("ok");

}
//--------------------------------------------------
function buildScatterChart(scatterArray){

        $(function () {
            $('#containerScatter').highcharts({
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Prices of houses in Denver'
                },
                subtitle: {
                    text: 'Source: MLS'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Price Point'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Number of Houses',
                    },
                    max:15,
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 100,
                    y: 60,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                    borderWidth: 1
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
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
                            pointFormat: '{point.x} k, {point.y} houses'
                        }
                    }
                },
                series: [{
                    name: 'Houses',
                    color: 'rgba(223, 83, 83, .5)',
                    data: scatterArray

                }]
            });

        });


//------------------------------------------------
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



// $(function () {
//     $('#containerYear').highcharts({
//         xAxis: {
//             min: -0.5,
//             max: 5.5
//         },
//         yAxis: {
//             min: 0
//         },
//         title: {
//             text: 'Scatter plot with regression line'
//         },
//         series: [{
//             type: 'line',
//             name: 'Regression Line',
//             data: s.newArray,
//             marker: {
//                 enabled: false
//             },
//             states: {
//                 hover: {
//                     lineWidth: 0
//                 }
//             },
//             enableMouseTracking: false
//         }, {
//             type: 'scatter',
//             name: 'Observations',
//             data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
//             marker: {
//                 radius: 4
//             }
//         }]
//     });
// });

}}])
