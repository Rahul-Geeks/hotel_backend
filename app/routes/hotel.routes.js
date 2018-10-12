const express = require("express");
let router = express.Router();
const hotelCtrl = require("../controllers/hotel.controller");

router
    .route("/hotels")
    .get(hotelCtrl.getHotels);

router
    .route("/hotel/:hotelId")
    .get(hotelCtrl.getOneHotel);

router
    .route("/hotel/new")
    .post(hotelCtrl.addOneHotel);

router
    .route("/hotel/:hotelId")
    .put(hotelCtrl.updateOneHotel);

router
    .route("/hotel/:hotelId/reviews/:reviewId")
    .get(hotelCtrl.oneReviewOneHotel);

module.exports = router;