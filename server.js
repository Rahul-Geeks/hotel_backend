require("./app/models/db.conn");
const express = require("express");
let app = express();
const hotelRoutes = require("./app/routes/hotel.routes");
const bodyParser = require("body-parser");

const CONFIG = require("./app/config");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({type:"application/json"}));
app.use("/api", hotelRoutes);

app.listen(CONFIG.PORT, CONFIG.HOST, function (error, data) {
    if (error) {
        console.log("Error while connecting with mongoDB "+error);
    } else {
        console.log(`Server is running at ${CONFIG.HOST}`);
    }
});   