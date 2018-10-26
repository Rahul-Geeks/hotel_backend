let should = require("chai").should();
let op = require("./op");

describe("Validation for Values Using Should Method in Chai Module", () => {
    it("Value Hello Should be a String Happy Flow", () => {
        op.getData("Hello").should.be.string;
    });
    it("Value 24 Should Be a Number Happy Flow", () => {
        op.getData(24).should.be.a("number");
    });
    it("The Given Array Should Be Array Happy Flow", () => {
        op.getData(["Haley", 46, false]).should.be.a("array");
    });
    it("The Length Of Haley In the Given Array Should Be 5 Happy Flow", () => {
        op.getData(["Haley", 46, false]).should.contains("Haley");
    });
});