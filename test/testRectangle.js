"use strict";

const assert = require("chai").assert;
const Rectangle = require("./../src/rectangle");
const Point = require("./../src/point");

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
    it("should give true if both rectangles have equal diagonal in reverse also", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const other = new Rectangle({ x: 5, y: 4 }, { x: 1, y: 1 });
      assert.isTrue(rectangle.isEqualTo(other));
    });
    it("should give false if given rectangles doesn't have equal diagonal", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const other = new Rectangle({ x: 6, y: 6 }, { x: 5, y: 4 });
      assert.isFalse(rectangle.isEqualTo(other));
    });
    it("should give false if the rectangle doesn't belong to the rectangle class", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const other = { endA: { x: 1, y: 1 }, endB: { x: 5, y: 4 } };
      assert.isFalse(rectangle.isEqualTo(other));
    });
    it("should give true if the rectangles are same but diagonals are given in opposite direction", function() {
      const rectangle1 = new Rectangle({ x: 1, y: 1 }, { x: 4, y: 5 });
      const other = new Rectangle({ x: 4, y: 5 }, { x: 1, y: 1 });
      assert.isTrue(rectangle1.isEqualTo(other));
    });
  });

  describe("hasPoint", function() {
    it("should give true if the point is on the rectangle", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      let point = new Point(1, 3);
      assert.isTrue(rectangle.hasPoint(point));
      point = new Point(2, 4);
      assert.isTrue(rectangle.hasPoint(point));
    });
    it("should give false if the point is not on the rectangle", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const point = new Point(4, 3);
      assert.isFalse(rectangle.hasPoint(point));
    });
    it("should give false if the instance is not the point", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const point = { x: 2, y: 2 };
      assert.isFalse(rectangle.hasPoint(point));
    });
  });

  describe("covers", function() {
    it("should give true is the point lies inside the rectangle", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const point = new Point(4, 3);
      assert.isTrue(rectangle.covers(point));
    });
    it("should give false if point is not inside the rectangle", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const point = new Point(7, 7);
      assert.isFalse(rectangle.covers(point));
    });
    it("should give false if point is on the perimeter of the rectangle", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const point = new Point(1, 3);
      assert.isFalse(rectangle.covers(point));
    });
    it("should give false is not the instance of the point class", function() {
      const rectangle = new Rectangle({ x: 1, y: 1 }, { x: 5, y: 4 });
      const point = { x: 2, y: 3 };
      assert.isFalse(rectangle.covers(point));
    });
  });
});
