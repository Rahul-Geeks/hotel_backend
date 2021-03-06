const express = require("express");
let router = express.Router();
const hotelCtrl = require("../controllers/hotel.controller");
const authCtrl = require("../controllers/auth.controller");
router
    .route("/hotels")
    .get(authCtrl.tokenValidator, hotelCtrl.getHotels);

router
    .route("/hotels/filterhotelswithrating")
    .get(hotelCtrl.filterHotelsWithRating);

router
    .route("/hotel/:hotelId")
    .get(hotelCtrl.getOneHotel);

router
    .route("/hotel/new")
    .post(authCtrl.tokenValidator, hotelCtrl.addOneHotel);

router
    .route("/hotel/:hotelId")
    .put(hotelCtrl.updateOneHotel);

router
    .route("/hotel/:hotelId/reviews")
    .get(hotelCtrl.allReviewsForOneHotel);

router
    .route("/hotel/:hotelId/reviews/:reviewId")
    .get(hotelCtrl.oneReviewOneHotel);

router
    .route("/bookhotel/:userId/:hotelId")
    .post(authCtrl.tokenValidator, hotelCtrl.bookHotel);

module.exports = router;