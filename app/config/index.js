//server
let host = "127.0.0.1";
let port = 3030;

//mongodb
// let dbUrl = "mongodb://192.168.1.20:27017/hotel";
// let dbUsr = "Rahul";
// let dbPwd = "password";
// let dbName = "hotel";
// let dbAuthSrc = "admin";
//mlab
// mongodb://<dbuser>:<dbpassword>@ds263493.mlab.com:63493/hotel_data
let dbUrl = "mongodb://@ds263493.mlab.com:63493/hotel_data";
let dbUsr = "rahul12";
let dbPwd = "rahul123";
let dbName = "hotel_data";
let authSource = "hotel_data";

let scrtKey = "Thisisrahulchouhanjwt";

module.exports = {
    HOST: host,
    PORT: port,
    DBURL: dbUrl,
    DBUSR: dbUsr,
    DBPWD: dbPwd,
    DBNAME: dbName,
    authSource: authSource,
    SCRTKEY: scrtKey
};