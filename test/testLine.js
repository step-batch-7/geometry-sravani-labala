"use strict";

const assert = require("chai").assert;
const Line = require("./../src/line.js");
const Point = require("./../src/point");

describe("Line", function() {
  describe("toString", function() {
    it("should give string representation of the line ", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
      assert.strictEqual(line.toString(), "[Line (1,2) to (2,3)]");
    });
  });

  describe("isEqualTo", function() {
    it("should give true if both lines are similar", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const other = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.isTrue(line.isEqualTo(other));
    });
    it("should give false if both lines are not similar", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const other = new Line({ x: 1, y: 2 }, { x: 3, y: 3 });
      assert.isFalse(line.isEqualTo(other));
    });
    it("should give false if both instances are not same", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const other = { endA: { x: 1, y: 2 }, endB: { x: 3, y: 4 } };
      assert.isFalse(line.isEqualTo(other));
    });
    it("should give true if same line is given", function() {
      const line = new Line({ x: 3, y: 3 }, { x: 6, y: 7 });
      assert.isTrue(line.isEqualTo(line));
    });
  });

  describe("length", function() {
    it("should give the length of the line of having all the positive coordinates", function() {
      const line = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
      assert.strictEqual(line.length, 5);
    });
    it("should give the length of the line of having all the negative coordinates", function() {
      const line = new Line({ x: -2, y: -1 }, { x: -6, y: -4 });
      assert.strictEqual(line.length, 5);
    });
    it("should give the length of the line of having both positive and negative coordinates", function() {
      const line = new Line({ x: -2, y: 1 }, { x: 6, y: -4 });
      assert.approximately(line.length, 9, 0.5);
    });
    it("should give the length of the line of having one end point as origin", function() {
      const line = new Line({ x: 1, y: 1 }, { x: 0, y: 0 });
      assert.approximately(line.length, 1, 0.5);
    });
  });

  describe("slope", function() {
    it("should give the positive slope when coordinates of one end is greater than the other", function() {
      const line = new Line({ x: 1, y: 1 }, { x: 0, y: 0 });
      assert.strictEqual(line.slope, 1);
    });
    it("should give the negative slope if only the endB ordinate is less than endA ordinate", function() {
      const line = new Line({ x: 0, y: 1 }, { x: 1, y: 0 });
      assert.strictEqual(line.slope, -1);
    });
    it("should give the negative slope if only the endB abscissa is less than endA abscissa", function() {
      const line = new Line({ x: 1, y: 0 }, { x: 0, y: 1 });
      assert.strictEqual(line.slope, -1);
    });
    it("should give the +infinity if the x coordinates are the same and endA ordinate is less than endB ordinate", function() {
      const line = new Line({ x: 1, y: 0 }, { x: 1, y: 5 });
      assert.strictEqual(line.slope, Infinity);
    });
    it("should give the -infinity if the x coordinates are the same and endB ordinate is less than endA ordinate", function() {
      const line = new Line({ x: 1, y: 5 }, { x: 1, y: 0 });
      assert.strictEqual(line.slope, -Infinity);
    });
    it("should give zero if the ordinates are equal", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 1, y: 5 });
      assert.strictEqual(line.slope, 0);
    });
    it("should give NAN if differences between the ends is zero", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 2, y: 5 });
      assert.isNaN(line.slope);
    });
  });

  describe("isParallelTo", function() {
    it("should give false if the two lines are same", function() {
      const lineA = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const lineB = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.isFalse(lineA.isParallelTo(lineB));
    });
    it("should give false if the two lines are not parallel", function() {
      const lineA = new Line({ x: 1, y: 3 }, { x: 3, y: 4 });
      const lineB = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      assert.isFalse(lineA.isParallelTo(lineB));
    });
    it("should give true if the two lines are parallel", function() {
      const lineA = new Line({ x: 1, y: 2 }, { x: 2, y: 3 });
      const lineB = new Line({ x: 1, y: 1 }, { x: 2, y: 2 });
      assert.isTrue(lineA.isParallelTo(lineB));
    });
    it("should give false if instance of Line is not passed", function() {
      const lineA = new Line({ x: 10, y: 15 }, { x: 40, y: 31 });
      const lineB = { endA: { x: 1, y: 2 }, endB: { x: 2, y: 3 } };
      assert.isFalse(lineA.isParallelTo(lineB));
    });
    it("should give false for the overlapping lines", function() {
      let lineA = new Line({ x: 0, y: 0 }, { x: 4, y: 0 });
      let lineB = new Line({ x: 1, y: 0 }, { x: 3, y: 0 });
      assert.isFalse(lineA.isParallelTo(lineB));
      lineA = new Line({ x: 0, y: 0 }, { x: 0, y: 4 });
      lineB = new Line({ x: 0, y: 1 }, { x: 0, y: 3 });
      assert.isFalse(lineA.isParallelTo(lineB));
    });
    it("should give false if two lines have same slope but are collinear", function() {
      const lineA = new Line({ x: 2, y: 2 }, { x: 5, y: 2 });
      const lineB = new Line({ x: 7, y: 2 }, { x: 12, y: 2 });
      assert.isFalse(lineA.isParallelTo(lineB));
    });
  });

  describe("findY", function() {
    it("should give the y coordinate if the line has positive coordinates ", function() {
      const line = new Line({ x: 2, y: 1 }, { x: 1, y: 2 });
      assert.strictEqual(line.findY(1), 2);
    });
    it("should give the y coordinate if the line has negative coordinates ", function() {
      const line = new Line({ x: -5, y: -1 }, { x: -1, y: -2 });
      assert.strictEqual(line.findY(-4), -1.25);
    });
    it("should give the NaN if the point doesn't belong to the line segment", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 8, y: 10 });
      assert.isNaN(line.findY(11));
    });
    it("should give first point x when y-coordinates of given point and first end are equal", function() {
      const line = new Line({ x: 5, y: 2 }, { x: 1, y: 5 });
      assert.strictEqual(line.findY(2), 4.25);
    });
    it("should give second point x when y-coordinates of given point and second end are equal", function() {
      const line = new Line({ x: 5, y: 2 }, { x: 1, y: 5 });
      assert.strictEqual(line.findY(5), 2);
    });
    it("should give first point y when the x-coordinates of both ends are equal", function() {
      const line = new Line({ x: 2, y: 4 }, { x: 2, y: 6 });
      assert.strictEqual(line.findY(2), 4);
    });
  });

  describe("findX", function() {
    it("should give the x coordinate if the line has positive coordinates", function() {
      const line = new Line({ x: 2, y: 6 }, { x: 1, y: 2 });
      assert.strictEqual(line.findX(4), 1.5);
    });
    it("should give the x coordinate if the line has negative coordinates", function() {
      const line = new Line({ x: -2, y: -4 }, { x: -1, y: -2 });
      assert.strictEqual(line.findX(-3), -1.5);
    });
    it("should give the NaN if the point doesn't belong to the line segment", function() {
      const line = new Line({ x: 2, y: 5 }, { x: 8, y: 10 });
      assert.isNaN(line.findX(11));
    });
    it("should give first end x when y-coordinates of given point and first end are equal", function() {
      const line = new Line({ x: 5, y: 2 }, { x: 1, y: 5 });
      assert.strictEqual(line.findX(2), 5);
    });
    it("should give second end x when y-coordinates of given point and second end are equal", function() {
      const line = new Line({ x: 5, y: 2 }, { x: 1, y: 5 });
      assert.strictEqual(line.findX(5), 1);
    });
    it("should give first end x when the y-coordinates of both ends are equal", function() {
      const line = new Line({ x: 4, y: 2 }, { x: 6, y: 2 });
      assert.strictEqual(line.findX(2), 4);
    });
  });

  describe("split", function() {
    it("should give 2 half lines split from center having positive coordinates", function() {
      const line = new Line({ x: 5, y: 5 }, { x: 1, y: 1 });
      const firstHalfLine = new Line({ x: 5, y: 5 }, { x: 3, y: 3 });
      const secondHalfLine = new Line({ x: 3, y: 3 }, { x: 1, y: 1 });
      const expected = [firstHalfLine, secondHalfLine];
      assert.deepStrictEqual(line.split(), expected);
    });
    it("should give 2 half lines split from center having negative coordinates", function() {
      const line = new Line({ x: -2, y: -2 }, { x: -8, y: -2 });
      const firstHalfLine = new Line({ x: -2, y: -2 }, { x: -5, y: -2 });
      const secondHalfLine = new Line({ x: -5, y: -2 }, { x: -8, y: -2 });
      const expected = [firstHalfLine, secondHalfLine];
      assert.deepStrictEqual(line.split(), expected);
    });
    it("should give 2 half lines split from center having odd coordinates", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 8, y: 8 });
      const firstHalfLine = new Line({ x: 3, y: 4 }, { x: 5.5, y: 6 });
      const secondHalfLine = new Line({ x: 5.5, y: 6 }, { x: 8, y: 8 });
      const expected = [firstHalfLine, secondHalfLine];
      assert.deepStrictEqual(line.split(), expected);
    });
  });

  describe("hasPoint", function() {
    it("should validate if the point is on the line", function() {
      const point = new Point(2, 2);
      const line = new Line({ x: 5, y: 5 }, { x: 1, y: 1 });
      assert.isTrue(line.hasPoint(point));
    });
    it("should invalidate if the point is not on the line", function() {
      const point = new Point(2, 2);
      const line = new Line({ x: 5, y: 5 }, { x: 7, y: 1 });
      assert.isFalse(line.hasPoint(point));
    });
    it("should invalidate if the point doesn't belong to the point class", function() {
      const point = { x: 2, y: 2 };
      const line = new Line({ x: 5, y: 5 }, { x: 7, y: 1 });
      assert.isFalse(line.hasPoint(point));
    });
  });

  describe("findPointFromStart", function() {
    it("should give the point of the certain distance from the start of the line if it exists on the line segment", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 6, y: 4 });
      const point = new Point(5, 4);
      assert.deepStrictEqual(line.findPointFromStart(2), point);
    });
    it("should give null if the distance is greater than the line distance", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 6, y: 4 });
      assert.isNull(line.findPointFromStart(10));
    });
    it("should give null if the distance given is not a number", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 6, y: 4 });
      assert.isNull(line.findPointFromStart("number"));
    });
  });

  describe("findPointFromEnd", function() {
    it("should give the point of the certain distance from the end of the line if it exists on the line segment", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 6, y: 4 });
      const point = new Point(3, 4);
      assert.deepStrictEqual(line.findPointFromEnd(3), point);
    });
    it("should give null if the distance is greater than the line distance", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 6, y: 4 });
      assert.isNull(line.findPointFromEnd(10));
    });
    it("should give null if the distance given is not a number", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 6, y: 4 });
      assert.isNull(line.findPointFromStart("number"));
    });
  });
});
