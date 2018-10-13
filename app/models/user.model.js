const mongoose = require("mongoose");

let bookedHotelSchema = mongoose.Schema({
    hotelId: String,
    hotelName:String,
    hotelAddress:String,
    price:Number,
    checkIn:Date,
    checkOut:Date
});
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: Number,
    role: {
        type: String,
        "default": "user"
    },
    description: String,
    gender: String,
    bookHistory: [bookedHotelSchema],
    password:{
        type:String,
        required:true
    }
});

mongoose.model("User", userSchema, "hotel.userdata");