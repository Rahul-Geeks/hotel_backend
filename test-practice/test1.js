let assert = require('chai').assert;
let op = require("./op");

//Testing Done Using "Assert" Library

// let a = 2;
// // assert.fail(3,a,"The value of a is not equal to 3");
// assert(20<30);
// assert.equal(a,2);
// assert.notEqual(a,4);
// assert.strictEqual(a,2);
// assert.equal(a,2);
// assert.equal(op.isNull(null), true);
// assert.equal(op.isEmpty(""), true);
// assert.equal(op.isUndefined(undefined), true);
// assert.equal(op.isString("Some Text"), true);
// assert.equal(op.isNumber(40), true);
// assert.equal(op.isBoolean(false), true);

//Testing Done Using "Chai" Library

describe("Validation For Values", () => {
    it("Checking For Null Value Happy Flow ::", () => {
        assert.equal(op.isNull(null), true);
    });
    it("Checking For Empty Value Happy Flow ::", () => {
        assert.equal(op.isEmpty(""), true);
    });
    it("Checking For Undefined Value Happy Flow ::", () => {
        assert.equal(op.isUndefined(undefined), true);
    });
    it("Checking For String Value Happy Flow ::", () => {
        assert.equal(op.isString("Text Written"), true);
    });
    it("Checking For Number Value Happy Flow ::", () => {
        assert.equal(op.isNumber(49), true);
    });
    it("Checking For Boolean Value Happy Flow ::", () => {
        assert.equal(op.isBoolean(true), true);
    });
});