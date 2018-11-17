const mongoose = require("mongoose");
const CONFIG = require("../config/index");
require("./hotel.model");
require("./user.model");

let options = {
    user: CONFIG.DBUSR,
    pass: CONFIG.DBPWD,
    authSource: CONFIG.authSource,
    useNewUrlParser: true
};

mongoose.connect(CONFIG.DBURL, options);
let _conn = mongoose.connection;

_conn.on("error", function (error) {
    console.log("Connection With MongoDB is Failed");
    console.log("Error is " + error);
});

_conn.once("open", function () {
    console.log("The Connection is successfully Established with mongoDB");
});

function graceFullShutDown(signal, callback) {
    mongoose.connection.close();
    console.log("Mongoose connetion object closed");
    console.log("App termination due to " + signal);
    callback();
}

process.on("SIGINT", function () {
    graceFullShutDown("SIGINT", function () {
        process.exit(0);
    });
});

process.on("SIGTERM", function () {
    graceFullShutDown("SIGTERM", function () {
        process.exit(0);
    });
});

process.on("SIGQUIT", function () {
    graceFullShutDown("SIGQUIT", function () {
        process.exit(0);
    });
});