let mongoose = require("mongoose");
let chai = require("chai");
let htModel = require("../../app/models/hotel.model");
// let htCtrl = require("../../app/controllers/hotel.controller");
let expect = chai.expect;
let should = chai.should();
let chaiHttp = require("chai-http");
let server = require('../../server');
let htRoutes = require("../../app/routes/hotel.routes");

chai.use(chaiHttp);

describe("GET Hotels Data Test", ()=>{
    it("It is Expected to get the data of all the Hotels", ()=>{
        chai.request("http://127.0.0.1:3030/api")
        .get("/hotels")
        .end((error, res)=>{
            expect(res).to.be.json;
            expect(res.body).to.be.a("array");
            expect(res.type).to.equal("application/json");
            expect(res.body[0]).to.have.property("name");
            expect(res.body[0]).to.have.property("stars");
            expect(res.body).to.not.have.property("institu");
            expect(res.body[0]).to.have.property("description");
            expect(res.body[0]).to.have.property("currency");
            expect(res.body[0]).to.have.property("location");
        }); 
    });
    it("It is expected to get one hotel data", ()=>{
        chai.request("http://127.0.0.1:3030/api")
        .get("/hotel/5bbdebe2718140f05da8c538")
        .end((error, res)=>{
            // console.log("res====",res);
            // expect(res).to.be.json;
            // expect(res.type).to.equal("application/json");
            expect(res.body).to.be.a("object");
            // console.log(res.body);
            expect(res.body).to.have.property("name");
            expect(res.body).to.have.property("stars");
            expect(res.body).to.not.have.property("institu");
            expect(res.body).to.have.property("description");
            expect(res.body).to.have.property("currency");
            expect(res.body).to.have.property("location");
        });
    });
    it("It is expected for successful addition of hotel in database", ()=>{
        expect()
    });
});
