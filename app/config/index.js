//server
let host = "127.0.0.1";
let port = 3030;

//mongodb
let dbUrl = "mongodb://192.168.1.120:27017/hotel";
let dbUsr = "Rahul";
let dbPwd = "password";
let dbName = "hotel";
let dbAuthSrc = "admin";

let scrtKey = "Thisisrahulchouhanjwt";

module.exports = {
    HOST: host,
    PORT: port,
    DBURL: dbUrl,
    DBUSR: dbUsr,
    DBPWD: dbPwd,
    DBNAME: dbName,
    DBAUTHSRC: dbAuthSrc,
    SCRTKEY: scrtKey
};