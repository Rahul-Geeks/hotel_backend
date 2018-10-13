const mongoose = require("mongoose");
let User = mongoose.model("User");

module.exports.registration = (req, res, next) => {
    if (req.body && req.body.name && req.body.email && req.body.phoneNumber
        && req.body.password) {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
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
                            message: "User Registered Successfully"
                        });
                }
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
            .find({"email":email})
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
                        if (password === user.password) {
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