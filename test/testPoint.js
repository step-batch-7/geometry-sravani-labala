"use strict";

const assert = require("chai").assert;
const Point = require("./../src/point");
const Line = require("./../src/line");
const Circle = require("./../src/circle");

describe("point", function() {
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
    it("should give the distance when one point is origin", function() {
      const point1 = new Point(1, 1);
      const point2 = new Point(0, 0);
      assert.approximately(point1.findDistanceTo(point2), 1, 0.5);
    });
    it("should give the distance as 0 when both the points are equal", () => {
      const point1 = new Point(1, 2);
      const point2 = new Point(1, 2);
      assert.strictEqual(point1.findDistanceTo(point2), 0);
    });
    it("should give NaN when the other point is not the instance of the point class", function() {
      const point1 = new Point(1, 1);
      const point2 = { x: 2, y: 4 };
      assert.isNaN(point1.findDistanceTo(point2));
    });
  });

  describe("isOn", function() {
    it("should validate if the point is on the line", function() {
      const point = new Point(2, 2);
      const line = new Line({ x: 5, y: 5 }, { x: 1, y: 1 });
      assert.isTrue(point.isOn(line));
    });
    it("should invalidate if the point is not on the line", function() {
      const point = new Point(2, 2);
      const line = new Line({ x: 5, y: 5 }, { x: 7, y: 1 });
      assert.isFalse(point.isOn(line));
    });
    it("should validate if the point is on the circle", function() {
      const circle = new Circle({ x: 0, y: 0 }, 7);
      const point = new Point(0, 7);
      assert.isTrue(point.isOn(circle));
    });
    it("should give false if the point is present in the circumference", function() {
      const circle = new Circle({ x: 3, y: 3 }, 7);
      const point = new Point(3, 3);
      assert.isFalse(point.isOn(circle));
    });
  });
});
