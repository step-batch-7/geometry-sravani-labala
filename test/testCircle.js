"use strict";

const assert = require("chai").assert;
const Circle = require("./../src/circle");
const Point = require("./../src/point");

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

  describe("hasPoint", function() {
    it("should give true if the point is present in the circumference", function() {
      const circle = new Circle({ x: 0, y: 0 }, 7);
      const point = new Point(0, 7);
      assert.isTrue(circle.hasPoint(point));
    });
    it("should give false if the point is not present in the circumference", function() {
      const circle = new Circle({ x: 3, y: 3 }, 7);
      const point = new Point(3, 3);
      assert.isFalse(circle.hasPoint(point));
    });
    it("should give false if the point doesn't belong to the point class", function() {
      const circle = new Circle({ x: 0, y: 0 }, 7);
      const point = { x: 0, y: 7 };
      assert.isFalse(circle.hasPoint(point));
    });
  });

  describe("moveTo", function() {
    it("should create a new circle of the same dimensions at the given center", function() {
      const circle = new Circle({ x: 0, y: 0 }, 7);
      const center = { x: 1, y: 1 };
      const expected = new Circle({ x: 1, y: 1 }, 7);
      assert.deepStrictEqual(circle.moveTo(center), expected);
    });
  });
});
