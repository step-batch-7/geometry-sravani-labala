const assert = require("assert");
const { Line } = require("./../src/line.js");

describe("line", function() {
  describe("toString", function() {
    it("should give 'working' to indicate the class is working", function() {
      let line = new Line();
      assert.strictEqual(line.toString(), "working");
    });
  });

  describe("isEqualTo", function() {
    it("should give true if the line parameters and required parameters are equal", function() {
      let line = new Line(1, 2, 3, 4);
      assert.strictEqual(line.isEqualTo(1, line.x1), true);
      assert.strictEqual(line.isEqualTo(2, line.y1), true);
      assert.strictEqual(line.isEqualTo(3, line.x2), true);
      assert.strictEqual(line.isEqualTo(4, line.y2), true);
    });
  });
});
