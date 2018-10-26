let chai = require("chai");
let expect = chai.expect;
let should = chai.should();
let assert = chai.assert;

let htModel = require("../../app/models/hotel.model");

describe("Validation Of Hotel Model File Using BDD", () => {
    let hotel = new htModel({
        name: "The Grand Multiplex Hotel",
        stars: 5,
        description: "This Hotel Has All The Facilities To Stay",
        currency: "200$",
        location: { address: "Nampally,Hyderabad" },
        reviews: [{
            name: "Rajesh",
            review: "The Hotel Is Awesome",
            rating: 4
        }, {
            name: "Ahmed",
            review: "The Hotel Is Amazing",
            rating: 5
        }]
    });
    it("Testing the Type Of Properties in Database Object", () => {
        "hotel.name".should.be.string;
        hotel.stars.should.be.a("number");
        "hotel.description".should.be.string;
        "hotel.currency".should.be.string;
        "hotel.location.address".should.be.string;
        hotel.reviews.should.be.a("array");
        for (let index = 0; index < hotel.reviews.length; index++) {
            "hotel.reviews[index].name".should.be.string;
            "hotel.reviews[index].review".should.be.string;
            hotel.reviews[index].rating.should.be.a("number");
        }
    });
    it("Testing The Values Of Properties In Database Object", ()=>{
        assert.equal(hotel.name, "The Grand Multiplex Hotel");
        assert.equal(hotel.stars, 5);
        assert.equal(hotel.description, "This Hotel Has All The Facilities To Stay");
        assert.equal(hotel.currency, "200$");
        assert.equal(hotel.location.address, "Nampally,Hyderabad");
    });
});