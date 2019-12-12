const assert = require("assert");
const { Line } = require("./../src/line.js");

describe("line", function() {
  let line = new Line(1, 2, 3, 4);
  describe("toString", function() {
    it("should give 'something' to indicate the class is working", function() {
      assert.strictEqual(line.toString(), "working");
    });
  });
  describe("isEqualTo", function() {
    it("should give true if the line parameters and required parameters are equal", function() {
      assert.strictEqual(line.isEqualTo(1, 2, 3, 4), true);
    });
  });
});
