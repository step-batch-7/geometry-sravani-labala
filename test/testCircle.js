"use strict";

const assert = require("chai").assert;
const Circle = require("./../src/circle");

describe("Circle", function() {
  describe("toString", function() {
    it("should give string representation of the circle", function() {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      assert.strictEqual(circle.toString(), "[Circle @(1,2) radius 5]");
    });
  });

  describe("isEqualTo", function() {
    it("should give true if both circle's radius and center are same", function() {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      const other = new Circle({ x: 1, y: 2 }, 5);
      assert.isTrue(circle.isEqualTo(other));
    });
    it("should give false if the radius are not same", function() {
      const circle = new Circle({ x: 1, y: 2 }, 3);
      const other = new Circle({ x: 1, y: 2 }, 2);
      assert.isFalse(circle.isEqualTo(other));
    });
    it("should give false if the center's are not same", function() {
      const circle = new Circle({ x: 1, y: 3 }, 3);
      const other = new Circle({ x: 1, y: 2 }, 3);
      assert.isFalse(circle.isEqualTo(other));
    });
    it("should give false if both instances are not same", function() {
      const circle = new Circle({ x: 1, y: 2 }, 4);
      const other = { center: { x: 1, y: 2 }, radius: 4 };
      assert.isFalse(circle.isEqualTo(other));
    });
    it("should give true if same circle is given", function() {
      const circle = new Circle({ x: 3, y: 3 }, 5);
      assert.isTrue(circle.isEqualTo(circle));
    });
  });

  describe("area", function() {
    it("should give the area of the circle of the given radius", function() {
      const circle = new Circle({ x: 3, y: 3 }, 7);
      assert.approximately(circle.area, 154, 0.5);
    });
    it("should give zero as the area of the circle when the radius is zero ", function() {
      const circle = new Circle({ x: 3, y: 3 }, 0);
      assert.strictEqual(circle.area, 0);
    });
  });

  describe("perimeter", function() {
    it("should give the perimeter of the circle of the given radius", function() {
      const circle = new Circle({ x: 3, y: 3 }, 7);
      assert.approximately(circle.perimeter, 44, 0.5);
    });
    it("should give zero as the perimeter of the circle when the radius is zero ", function() {
      const circle = new Circle({ x: 3, y: 3 }, 0);
      assert.strictEqual(circle.perimeter, 0);
    });
  });
});
