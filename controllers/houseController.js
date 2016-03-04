var mongoose = require('mongoose');
var model = require('../models/houseModel.js');

//need to add a functionthat takes min and max price, # baths, # beds, and type
//so it can return a subset of house objects

var getHouseByMLS = function(req,res){
    
    console.log("We are in the controller, getHouseByMLS ",req.body.MLSNumber);
    
    model.findOne({'MLS Number':req.body.MLSNumber},function(err,doc){
		if (err){
			console.log(err);
			res.send(err);
		}else{
			res.send(doc);
		}
	})
    
    
    
};


var getPricesAndSF = function(req,res){
	
	console.log("GETTING ALL PRICE AND SF NUMBERS FOR ALL HOUSES ");

	var priceSFArray = [];
	//returns an array of arrays, [price,sf]
	model.find({},function(err,docs){
		for (var i=0;i<docs.length;i++){
			priceSFArray.push([docs[i]["List Price"],
							   docs[i]["SqFt Total"]
								]);	
		}		
		res.send(priceSFArray);
	})
}
//to send back key value objects vs mini arrays
// priceSFArray.push({'List Price':docs[i]["List Price"],
// 							   'SqFt Total':docs[i]["SqFt Total"],
// 								});	


var getAllPrices = function (req,res){

	console.log("GETTING ALL HOUSE OBJECTS BY PRICE");
	
	var r=req.body;
	
	var priceArray = [];
	model.find({}, function(err,docs){
		for (var i=0;i<docs.length;i++){
			priceArray.push(docs[i]['List Price']);
		}
		res.send(priceArray);
	});
}

/*
var getManyHouses = function(req,res){
	console.log("We are in the controller, getManyHouses", req.body);
	
	var r = req.body;

	model.find({$and :[
		
		{'List Price':{$gte:r.MinPrice, $lte:r.MaxPrice}},
		{'Total Bedrooms':{$gte:r.Beds}},
		{'Total Baths':{$gte:r.Baths}},
		{'SqFt Total':{$gte:r.minSF}}]}, function(err,docs){
			if (err){
				console.log(err);
				res.send(err);
			}else{
				console.log("returning # of results in an array, ",docs.length);
				res.send(docs);
			}
		});
}
*/


var getManyHouses = function(req,res){
	console.log("We are in the controller, getManyHouses", req.body);
	
	var r = req.body;

	model.find({$and :[
		
		{'List Price':{$gte:r.minPrice, $lte:r.maxPrice}},
		{'Total Bedrooms':{$gte:r.bedrooms}},
		{'Total Baths':{$gte:r.bathrooms}},
		{'Status':'Active'},
		{'SqFt Total':{$gte:r.minSF}}]}, function(err,docs){
			if (err){
				console.log(err);
				res.send(err);
			}else{
				console.log("returning # of results in an array, ",docs.length);
				//res.send(docs);
				//turn the docs array into an object of objects?
				var houseHash = {};
				for (var i = 0;i<docs.length;i++){
					var h = docs[i];

					houseHash[h["MLS Number"]]=h;
				}
				console.log("DID WE MAKE A HASH :",houseHash);
				res.send(houseHash);
			}
		});
	}//end getmanyhouses

var getHouseByMaxPrice = function(req,res){
    console.log("We are in teh controller, getHouseByMaxPrice ", req.body.MaxPrice);
    
    model.find({'List Price':{$lte:req.body.MaxPrice}},function(err,docs){
        
        if (err){
			console.log(err);
			res.send(err);
		}else{
            console.log("is the return data in an array? :",Array.isArray(docs));
			res.send(docs);
		}
    });             
};


module.exports = {
	getHouseByMLS:getHouseByMLS,
    getHouseByMaxPrice:getHouseByMaxPrice,
    getAllPrices:getAllPrices,
    getManyHouses:getManyHouses,
    getPricesAndSF:getPricesAndSF,
}