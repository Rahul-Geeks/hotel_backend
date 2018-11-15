const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let roomsSchema = new Schema({
    type: String,
    number: Number,
    description: String,
    photos: [String],
    price: String,
});

let locationSchema = new Schema({
    address: String,
    coordinates: [Number]
});

let reviewsShema = new Schema({
    name: String,
    review: String,
    rating: Number
});

let hotelsSchema = new Schema({
    name: String,
    stars: Number,
    description: String,
    photos: [String],
    currency: String,
    rooms: [roomsSchema],
    location: locationSchema,
    reviews: [reviewsShema],
    services: [String],
    password: String,
});

module.exports = mongoose.model("Hotel", hotelsSchema, "hotel.hoteldata");