const assert = require("chai").assert;
const Rectangle = require("./../src/rectangle");

describe("Rectangle", function() {
  describe("toString", function() {
    it("should give the string representation of the rectangle", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      assert.strictEqual(rectangle.toString(), "[Rectangle (1,1) to (5,4)]");
    });
  });

  describe("area", function() {
    it("should give the area of the rectangle when diagonal coordinates are given", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      assert.strictEqual(rectangle.area, 12);
    });
  });

  describe("perimeter", function() {
    it("should give the perimeter of the rectangle when the diagonal coordinates are given", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      assert.strictEqual(rectangle.perimeter, 14);
    });
  });

  describe("isEqualTo", function() {
    it("should give true if both rectangles have equal diagonal", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const other = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      assert.isTrue(rectangle.isEqualTo(other));
    });
  });
});
