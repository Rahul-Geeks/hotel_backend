const mongoose = require("mongoose");
let User = mongoose.model("User");

const bcrypt = require("bcrypt");

module.exports.registration = (req, res, next) => {
    let saltRounds = 10;

    if (req.body && req.body.name && req.body.email && req.body.phoneNumber
        && req.body.password) {

        bcrypt.genSalt(saltRounds, function (error, salt) {
            bcrypt.hash(req.body.password, salt, function (error, hashPass) {
                let newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    phoneNumber: req.body.phoneNumber,
                    password: hashPass,
                    role: req.body.role,
                    gender: req.body.gender,
                    description: req.body.description
                });
                newUser
                    .save((error, user) => {
                        if (error) {
                            res
                                .status(500)
                                .set("apllication/json")
                                .json({
                                    message: "User Not Saved || Internal Server Error"
                                });
                        } else {
                            res
                                .status(200)
                                .set("apllication/json")
                                .json({
                                    message: "User Registered Successfully",
                                    user: user
                                });
                        }
                    });

            //     if (error) {
            //         res
            //             .status(500)
            //             .set("application/json")
            //             .json({
            //                 message: "Password Is Not Encrypted Due To Some Internal Server Error",
            //                 error: error
            //             });
            //     } else {
            //         res
            //             .status(200)
            //             // .set("application/json")
            //             .json({
            //                 message: "Password Is Encrypted Successfully"
            //             });
            //     }
            });
            // if (error) {
            //     res
            //         .status(500)
            //         // .set("application/json")
            //         .json({
            //             message: "Salt Is Not Generated Due To Some Internal Server Error",
            //             error: error
            //         });
            // } else {
            //     res
            //         .status(200)
            //         // .set("application/json")
            //         .json({
            //             message: "Salt Is Generated Successfully"
            //         });
            // }
        })
    } else {
        res
            .status(400)
            .set("apllication/json")
            .json({
                message: "Required fields are not passed"
            });
    }
};

module.exports.login = (req, res, next) => {
    if (req.body && req.body.email && req.body.password) {
        let email = req.body.email;
        let password = req.body.password;
        User
            .findOne({ "email": email })
            .exec((error, user) => {
                if (error) {
                    res
                        .status(500)
                        .set("apllication/json")
                        .json({
                            message: "User Not Found || internal Server Error",
                            error: error
                        });
                } else {
                    if (!user) {
                        res
                            .status(404)
                            .set("apllication/json")
                            .json({
                                message: "User Not Found"
                            });
                    } else {
                        // console.log(user.password);
                        // console.log(user.length);
                        // console.log(user);
                        bcrypt.compare(req.body.password, user.password, function(error, ans){
                            if(!error){
                                res
                                    .status(200)
                                    .set("apllication/json")
                                    .json({
                                        message: "Login Successful"
                                    });
                            } else {
                                res
                                    .status(404)
                                    .set("apllication/json")
                                    .json({
                                        message: "Entered Incorrect Password"
                                    });
                            }
                        }) 
                    }
                }
            });
    } else {
        res
            .status(400)
            .set("apllication/json")
            .json({
                message: "Required fields are not passed"
            });
    }
};