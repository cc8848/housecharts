var myApp = angular.module("myApp",[]);

myApp.controller('myAppController',['$scope', '$http', function($scope,$http){
	var s = $scope; 
    var plot = [] 
    s.min = []
    s.max = []
    s.houses=[];
//----------------------------- final output format ----------------------------
    s.averages = [
            [50000, 1],
            [100000, 2],
            [150000, 2],
            [200000, 3],
            [250000, 4],
            [300000, 5],
            [350000, 6],
        ];
    
//------------------------- requst for info ------------------------------------------

   s.manySearch = function(){
        $http.post('/api/manySearch')
            .then(function(returnData){
                s.houses = spliceTop(returnData.data);//cuts out the top price values
                console.log(s.houses.length)
                var houseGroups = _.groupBy(s.houses, function(obj){return 50000*Math.ceil((obj['List Price'])/50000)})
                // console.log(houseGroups)
                s.ranges = (Object.keys(houseGroups))
                
                // for(var i = 0; i <s.houses.length; i++){
                //    if(s.houses[i]['List Price'] < 50000){
                //     cat1.push(s.houses[i])
                //    // } else if(s.houses[i]['List Price'] < 150000){
                //    //  cat2.push(s.houses[i])
                   
                //    //  obj3.push(s.houses[i])
                //    }
                // }
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
                console.log(s.ranges)
                console.log(s.min)
                console.log(s.max)
                
            });

    }

    s.manySearch()
    

//--------------------------------- helper functions ----------------------
    function spliceTop(arr){
        for(var obj in arr){
            if(arr[obj]['List Price'] < 1200000){
                // console.log(arr[obj]['List Price'])
                plot.push(arr[obj])
            }
        }
        console.log(plot)
        return plot
    }

    function addTo(arr, arr2){
        for(var i = 0; i < arr.length; i++){
            arr.push(arr2[i])
        }
        console.log(arr)
    }













    // function pullNumbers(arr){
    //     for(var j=0; j < s.ranges.length; j++){
    //         s.ranges[j].push(max value in values array for each priceCat)
    //         s.ranges[j].push(_.min(arr50k[j]))
    //         // console.log(firstArr)
    //         arr50k = []
    //     }
    //     console.log(s.ranges)
    // }
//------------------------------------ parameters for range chart -------------------------
    $(function () {
        $('#containerRange').highcharts({

            title: {
                text: 'Number of rooms based on price'
            },

            xAxis: {
                // categories: ['50k','100k','150k','200k','250k','300k','350k','400k','450k','500k','550k','600k','650k','700k','750k','800k','850k','900k','950k','1000k']
                //does not work
            },

            yAxis: {
                title: {
                    text: 'Room Number'
                }
            },

            tooltip: {
                crosshairs: true,
                shared: true,
            },

            legend: {
            },

            series: [{
                name: 'price point',
                data: s.averages,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[0]
                }
            }, {
                name: 'Range',
                data: s.ranges,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: Highcharts.getOptions().colors[0],
                fillOpacity: 0.3,
                zIndex: 0
            }]
        });
    });
}]);