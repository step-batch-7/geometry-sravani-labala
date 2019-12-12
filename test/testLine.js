const assert = require("assert");
const Line = require("./../src/line.js");

describe("line", function() {
  describe("toString", function() {
    it("should give 'working' to indicate the class is working", function() {
      let line = new Line(1, 2, 3, 4);
      assert.strictEqual(line.toString(), "Line (1,2) (3,4)");
    });
  });
});
