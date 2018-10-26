const mongoose = require("mongoose");
let Hotel = mongoose.model("Hotel");
let User = mongoose.model("User");

const log4js = require("log4js");
let errorLogger = log4js.getLogger("errorFile");
let accessLogger = log4js.getLogger("access");
let hotelsLogger = log4js.getLogger("hotels");

module.exports.getHotels = (req, res, next) => {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = req.query.offset;
    }
    if (req.query && req.query.count) { 
        count = req.query.count;
    }
    Hotel
        .find()
        // .skip(offset).limit(count)
        .exec(function (error, hotels) {
            if (error) {
                // console.log(error);
                res
                    .status(404)
                    .json({
                        message: "Hotels Record Not Found",
                        error: error
                    });
                errorLogger.error("Hotels Record Not Found");
            } else {
                res
                    .status(200)
                    .json(hotels);
                accessLogger.info("Hotel Records Are Found");
            }
        });
};

module.exports.getOneHotel = (req, res, next) => {
    if (req.params && req.params.hotelId) {
        Hotel
            .findById({
                _id: req.params.hotelId
            })
            .exec(function (error, hotel) {
                if (error) {
                    console.log(error);
                    res
                        .status(404)
                        .json({
                            message: "Requested Hotel Not Found"
                        });
                    errorLogger.error("Requested Hotel Not Found");
                } else {
                    res
                        .status(200)
                        .json(hotel);
                    accessLogger.info("Requested Hotel Found");
                }
            });
    } else {
        res
            .status(404)
            .json({
                message: "Request params does not contain any hotelId to search for"
            });
        errorLogger.error("Request params does not contain any hotelId to search for");
    }
};

module.exports.addOneHotel = (req, res, next) => {
    if (req.body && req.body.name && req.body.address && req.body.stars) {
        // let bodyReviews = req.body.reviews;
        // let codeReviews = [];
        // for (let index = 0; index < bodyReviews.length; index++) {
        //     codeReviews.push({
        //         name: bodyReviews[index].name,
        //         review: bodyReviews[index].review,
        //         rating: bodyReviews[index].rating
        //     });
        // }
        let newHotel = new Hotel({
            name: req.body.name,
            stars: req.body.stars,
            "location.address": req.body.address,
            reviews: req.body.reviews,
            services: [req.body.services],
            "rooms": [{ price: req.body.price }]
        });
        // newHotel.rooms.push(req.body.price);

        newHotel
            .save((error, response) => {
                if (error) {
                    res
                        .status(500)
                        .json({
                            message: "Internal Server Error",
                            error: error
                        });
                    errorLogger.error("Internal Server Error");
                } else {
                    res
                        .status(200)
                        .json(response);
                    hotelsLogger.info("Hotel Added Successfully");
                }
            });
    } else {
        res
            .status(203)
            .json({
                message: "Required Fields are not passed in request body"
            });
        errorLogger.error("Required Fields are not passed in request body");
    }
};

module.exports.updateOneHotel = (req, res, next) => {
    let hotelId = req.params.hotelId;
    let updateQuery = {
        $set: {
            "name": req.body.name
        }
    };
    // console.log(hotelId);

    Hotel
        .findByIdAndUpdate(hotelId, updateQuery, function (error, response) {
            if (error) {
                // console.log("Update FAILED");
                res
                    .status(404)
                    .json({
                        message: "The hotel document update FAILED",
                        error: error
                    });
                errorLogger.error("The hotel document update FAILED");
            } else {
                res
                    .status(200)
                    .json({
                        message: "The hotel document is updated successfully"
                    });
                hotelsLogger.info("The hotel document is updated successfully");
            }
        });
};

module.exports.allReviewsForOneHotel = (req, res, next) => {
    let hotelId = req.params.hotelId;
    Hotel
        .findById(hotelId)
        .select("reviews")
        .exec(function (error, reviews) {
            // console.log(reviews);
            // console.log(hotelId);
            if (error) {
                res
                    .status(404)
                    .set("application/json")
                    .json({
                        message: "HotelId is not correct",
                        error: error
                    });
                errorLogger.error("HotelId is not correct");
            } else {
                if (reviews === null) {
                    res
                        .status(404)
                        .set("application/json")
                        .json({
                            message: "'Reviews' Field is not present in the given Hotel"
                        });
                    errorLogger.error("'Reviews' Field is not present in the given Hotel");
                } else {
                    let allReviews = [];
                    for (let index = 0; index < reviews.reviews.length; index++) {
                        allReviews.push(reviews.reviews[index].review);
                    }
                    res
                        .status(200)
                        .set("application/json")
                        .json(allReviews);
                    hotelsLogger.info("All reviews for one hotel found successfully");
                }
            }
        });
};

module.exports.oneReviewOneHotel = (req, res, next) => {
    let hotelId = req.params.hotelId;
    Hotel
        .findById(hotelId, { "reviews": true })
        // .select("reviews")
        .exec(function (error, reviews) {
            if (error) {
                res
                    .status(404)
                    .json({
                        message: "Hotel Not Found",
                        error: error
                    });
                errorLogger.error("Hotel Not Found");
            } else {
                let findReview = reviews.reviews.find(function (element) {
                    if (element.id === req.params.reviewId || element._id === req.params.reviewId) {
                        console.log(element.review);
                        return element.review;
                    }
                });

                // let findReview = reviews.reviews.id(req.params.reviewId);
                res
                    .status(200)
                    .json(findReview);
                hotelsLogger.info("One review successfully found for one hotel");
            }
        });
};

module.exports.bookHotel = async function (req, res, next) {

    let userId = req.params.userId;
    let hotelId = req.params.hotelId;
    // let addHotelInUser = {};

    findOneHotel(hotelId).then((data) => {
        let addHotelInUser = {
            $push: {
                "bookHistory": [{
                    hotelId: data._id,
                    hotelName: data.name,
                    hotelAddress: data.location.address,
                    price: data.rooms[0].price,
                    checkIn: Date.now(),
                    checkOut: Date.now()
                }]
            }
        };
        if (userId) {
            User
                .findByIdAndUpdate(userId, addHotelInUser)
                .exec((error, user) => {
                    if (error) {
                        console.log(userId);
                        res
                            .status(500)
                            .set("application/json")
                            .json({
                                message: "User with this user ID not found || Internal Server Error",
                                error: error
                            });
                        errorLogger.error("User with this user ID not found || Internal Server Error");
                    } else {
                        if (!hotelId) {
                            res
                                .status(400)
                                .set("application/json")
                                .json({
                                    message: "Hotel ID not entered"
                                });
                            errorLogger.error("Hotel ID not entered");
                        } else {
                            console.log(addHotelInUser);
                            res
                                .status(200)
                                .set("application/json")
                                .json({
                                    message: "Hotel Booked Successfully",
                                });
                            hotelsLogger.info("Hotel Booked Successfully");
                        }
                    }
                });
        } else {
            res
                .status(400)
                .set("application/json")
                .json({
                    message: "User ID not entered"
                });
            errorLogger.error("User ID not entered");
        }
    });
};

let findOneHotel = async (hotelId) => {
    let hotel = await Hotel
        .findById(hotelId)
    return hotel;
};