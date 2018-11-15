const mongoose = require("mongoose");
let User = mongoose.model("User");

module.exports.getUsers = (req, res, next) => {
    User
        .find()
        .exec((error, users) => {
            if (error) {  
                res
                    .status(500)
                    .set("application/json")
                    .res({
                        message: "Internal Server Error",
                        error: error
                    });
            } else {
                // console.log(users);
                res
                    .status(200)
                    .set("application/json")
                    .json({
                        message: "Get Query SuccessFull",
                        users: users
                    });
            }
        });
};

module.exports.getOneUser = (req, res, next) => {
    let userId = req.params.userId;
    if (userId) {
        User
            .findById(userId)
            .exec((error, user) => {
                if (error) {
                    res
                        .status(500)
                        .set("application/json")
                        .json({
                            message: "User ID Not Found || Internal Server Error",
                            error: error
                        });
                } else {
                    // console.log(user);
                    res
                        .status(200)
                        .set("application/json")
                        .json(user);
                }
            });
    } else {
        res
            .status(400)
            .set("application/json")
            .json({
                message: "User ID Not Entered",
            });
    }
};