require("./app/models/db.conn");
const express = require("express");
let app = express();
const log4js = require("log4js");
const hotelRoutes = require("./app/routes/hotel.routes");
const userRoutes = require("./app/routes/user.routes");
const bodyParser = require("body-parser");
const fs = require("fs");

const CONFIG = require("./app/config");
// log4js.configure("./app/config/log.json");
let startupLogger = log4js.getLogger("startup");
let errorLogger = log4js.getLogger("errorFile");

try {
    fs.mkdirSync("./log");
} catch (error) {
    if(error.code != "EEXIST"){
        console.log("Could not setup log directory", error);
        process.exit(1);
    }
}
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-access-token, Content-Type, Accept");
    next();
  });
  
  

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type:"application/json"}));
app.use("/api", hotelRoutes);
app.use("/api", userRoutes);

app.listen(CONFIG.PORT, CONFIG.HOST, function (error, data) {
    if (error) {
        errorLogger.error("Error while connecting with mongoDB "+error);
    } else {
        startupLogger.info(`Server is running at ${CONFIG.HOST}`);
    }
});   