const assert = require("chai").assert;
const Rectangle = require("./../src/rectangle");

describe("Rectangle", function() {
  describe("toString", function() {
    it("should give the string representation of the rectangle", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      assert.strictEqual(rectangle.toString(), "[Rectangle (1,1) to (5,4)]");
    });
  });
});
