const assert = require("chai").assert;
const Point = require("./../src/point");

describe("class", function() {
  describe("toString", function() {
    it("should give string representation of the point", function() {
      const point = new Point(2, 3);
      assert.strictEqual(point.toString(), "[Point @(2,3)]");
    });
  });
  describe("visit", function() {
    it("should give the sum of the coordinates", function() {
      const point = new Point(2, 3);
      assert.strictEqual(
        point.visit((x, y) => x + y),
        5
      );
    });
    it("should give the product of the coordinates", function() {
      const point = new Point(2, 3);
      assert.strictEqual(
        point.visit((x, y) => x * y),
        6
      );
    });
  });
});
