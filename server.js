require("./app/models/db.conn");
const express = require("express");
let app = express();
const log4js = require("log4js");
const hotelRoutes = require("./app/routes/hotel.routes");
const userRoutes = require("./app/routes/user.routes");
const bodyParser = require("body-parser");

const CONFIG = require("./app/config");
log4js.configure("./app/config/log.json");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type:"application/json"}));
app.use("/api", hotelRoutes);
app.use("/api", userRoutes);

app.listen(CONFIG.PORT, CONFIG.HOST, function (error, data) {
    if (error) {
        console.log("Error while connecting with mongoDB "+error);
    } else {
        console.log(`Server is running at ${CONFIG.HOST}`);
    }
});   