"use strict";

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
    it("should give the result of the operation", function() {
      const point = new Point(2, 3);
      assert.strictEqual(
        point.visit((x, y) => x + y),
        5
      );
      assert.strictEqual(
        point.visit((x, y) => x * y),
        6
      );
    });
  });

  describe("isEqualTo", function() {
    it("should give true if both points are similar", function() {
      const point = new Point(2, 3);
      const other = new Point(2, 3);
      assert.isTrue(point.isEqualTo(other));
    });

    it("should give false if both points are not similar", function() {
      const point = new Point(2, 3);
      const other = new Point(1, 3);
      assert.isFalse(point.isEqualTo(other));
    });

    it("should give false if the instance of 'other' doesn't belongs to the class Point", function() {
      const point = new Point(2, 3);
      const other = { x: 2, y: 3 };
      assert.isFalse(point.isEqualTo(other));
    });
  });

  describe("clone", function() {
    it("should give the exact copy of the given point", function() {
      const point = new Point(2, 3);
      assert.deepStrictEqual(point.clone(), point);
    });
  });

  describe("findDistanceTo", function() {
    it("should give the distance between the positive points", function() {
      const point1 = new Point(2, 1);
      const point2 = new Point(6, 4);
      assert.strictEqual(point1.findDistanceTo(point2), 5);
    });
    it("should give the distance between the negative points", function() {
      const point1 = new Point(-2, -1);
      const point2 = new Point(-6, -4);
      assert.strictEqual(point1.findDistanceTo(point2), 5);
    });
    it("should give the distance between both positive and negative points", function() {
      const point1 = new Point(-2, 1);
      const point2 = new Point(6, -4);
      assert.approximately(point1.findDistanceTo(point2), 9, 0.5);
    });
    it("should give the distance when one point1 is origin", function() {
      const point1 = new Point(1, 1);
      const point2 = new Point(0, 0);
      assert.approximately(point1.findDistanceTo(point2), 1, 0.5);
    });
    it("should give NaN when the other point is not the instance of the point class", function() {
      const point1 = new Point(1, 1);
      const point2 = { x: 2, y: 4 };
      assert.isNaN(point1.findDistanceTo(point2));
    });
  });
});
