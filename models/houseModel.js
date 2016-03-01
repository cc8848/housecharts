var mongoose = require ('mongoose');

var houseSchema = mongoose.Schema({
    
	'MLS Number' : String,
	'Type' : String,
	'Status' : String,
	'List Price' : Number,
	'Street #' : String,
	'Street Dir' : String,
	'Street Name' : String,
	'Street Type' : String,
	'Unit #' : String,
	'Building #' : String,
	'City' : String,
	'State' : String,
	'Zip Code' : Number,
	'County' : String,
	'Parcel Number' : String,
	'Locale' : String,
	'Complex Name' : String,
	'Total Baths' : Number,
	'Total Bedrooms' : Number,
	'Bathrooms Total Basement' : Number,
	'Bathrooms Total Lower' : Number,
	'Bathrooms Total Main' : Number,
	'Bathrooms Total Upper' : Number,
	'Bedrooms Total Basement' : Number,
	'Bedrooms Total Lower' : Number,
	'Bedrooms Total Main' : Number,
	'Bedrooms Total Upper' : Number,
	'SqFt Above' : Number,
	'SqFt Finished' : Number,
	'SqFt Total' : Number,
	'PSF Total' : Number,
	'PSF Finished' : Number,
	'PSF Above Grade' : Number,
	'Total Parking Spaces' : Number,
	'Interior Features' : String,
	'Appliances' : String,
	'# Fireplaces' : Number,
	'Basement Size' : String,
	'Basement Finished' : Boolean,
	'SqFt Basement' : Number,
	'SqFt Main' : Number,
	'SqFt Upper' : Number,
	'Style' : String,
	'Year Built' : Number,
	'Elementary School' : String,
	'Middle School' : String,
	'High School' : String,
	'School District' : String,
	'HOA Y/N' : Boolean,
	'Latitude' : Number,
	'Longitude' : Number
    
})

module.exports = mongoose.model('homes',houseSchema);