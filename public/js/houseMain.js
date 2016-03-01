var myApp = angular.module("myApp",[]);

myApp.controller('myAppController',['$scope', '$http', function($scope,$http){
	var s = $scope;
	
	s.house={};
    s.houses=[];
    s.myPriceArray=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    s.myArray = [];

    console.log("IS IT WORKING");


    s.getPricesAndSF = function(){
        $http.post('/api/getPricesAndSF')
            .then(function(returnedData){
                console.log("in return of post get prices and SF,does this work? obj of arrays? ",returnedData);
                buildScatterChartSF(returnedData.data);

            })
    }




   s.getPrices = function(){
    $http.post('/api/getAllPrices')
        .then(function(array){
            s.myArray = array.data;
            groupPrices(s.myArray);
            console.log("do we ever return here?? ");
            var scatterArray = groupPricesScatter(s.myArray);
            //pass the obj through - do I need to make it an array of arrays first?
            console.log("do we return again to the getPrices function?? ");
            buildScatterChart(scatterArray);
            console.log("do we return even without an explicit return?? ");
        })
   }

   s.getPrices();

   //called by getPrices function to group them into graphable form

   function groupPrices(myArray){
        for (var arraySpot=0;arraySpot<20;arraySpot++){
           


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
                    max:14,
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
                            pointFormat: '{point.x}k, {point.y} houses'
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


}

//-------------------------------------------------

function buildScatterChartSF(scatterArraySF){

        $(function () {
            $('#containerScatter2').highcharts({
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Prices and total SF of new listings in Denver'
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
                    showLastLabel: true,
                    max:2000000
                },
                yAxis: {
                    title: {
                        text: 'Square Footage',
                    },
                     max:10000,
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
                            pointFormat: '${point.x}, {point.y} SF'
                        }
                    }
                },
                series: [{
                    name: 'Houses',
                    color: 'rgba(223, 83, 83, .5)',
                    data: scatterArraySF

                }]
            });
        });


}


//-------------------------------------------------



	s.findHouse = function (){
        s.houses = [];
        console.log("we are in the find house click event. ")
		console.log(s.search.MLSNumber);
		$http.post('/api/houseFind',s.search)
			.then (function(data){
				console.log("we are in the return of the post ",data);
				s.house = data.data;
                s.search = {};
			});
	}
    
    s.findHouseMaxPrice = function (){
        
        console.log("we are in the find house MAX click event. ")
		console.log(s.search.MLSNumber);
        s.house={};
        $http.post('/api/houseFind/Max',s.search)
			.then (function(data){
				console.log("we are in the return of the post ",data);
			s.houses = [];	
            s.houses = data.data;
            s.search = {};

            
			});
        
        
    }
    
    s.manySearch = function(){
        console.log("we are in teh angular s.manySearch function", s.multiSearch)
        $http.post('/api/manySearch',s.multiSearch)
            .then(function(data){
                console.log("we're back in the response of many criteria search, " ,data.data.length," spots in array");
                s.houses=data.data;
            });
    }


    


}]);