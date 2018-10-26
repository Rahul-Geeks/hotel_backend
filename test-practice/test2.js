let expect = require("chai").expect;
let op = require("./op");

describe("Validation For Values", () => {
    it("Expecting The Null Value", () => {
        expect(op.getData(null)).to.be.a("null");
    });
    it("Expecting The last name as Chouhan", () => {
        expect(op.getData({
            firstName: "Rahul",
            lastName: "Chouhan",
            year: 4
        })).to.have.property("lastName");
    });
    it("Expecting The Hello Value to be a string Happy Flow", () => {
        expect(op.getData("Hello")).to.be.string;
    });
    it("Expecting The Length Of Chouhan Value in nested Object to be 7 Happy Flow", () => {
        expect(op.getData(["Chouhan", 45, true])).contains("Chouhan").which.have.lengthOf(3);
    });
    it("Expecting The Length of Hello String to be 5 Happy Flow", () => {
        expect(op.getData("Hello")).to.have.lengthOf(5);
    });
    it("Expecting The Length Value Of array to be 3 Happy Flow", () => {
        expect(op.getData(["Chouhan", 45, true])).to.have.lengthOf(3);
    });
});