"use strict";

const assert = require("chai").assert;
const Line = require("./../src/line.js");

describe("Line", function() {
  describe("toString", function() {
    it("should give string representation of the line ", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 2, y: 3 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.toString(), "[Line (1,2) to (2,3)]");
    });
  });

  describe("isEqualTo", function() {
    it("should give true if both lines are similar", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      const otherEndA = { x: 1, y: 2 };
      const otherEndB = { x: 3, y: 4 };
      const other = new Line(otherEndA, otherEndB);
      assert.isTrue(line.isEqualTo(other));
    });

    it("should give false if both lines are not similar", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      const otherEndA = { x: 1, y: 2 };
      const otherEndB = { x: 3, y: 3 };
      const other = new Line(otherEndA, otherEndB);
      assert.isFalse(line.isEqualTo(other));
    });

    it("should give false if the type of 'other' doesn't belongs to the class Line", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      const other = { endA: { x: 1, y: 2 }, endB: { x: 3, y: 4 } };
      assert.isFalse(line.isEqualTo(other));
    });
  });

  describe("length", function() {
    it("should give the length of the line of having all the positive coordinates", function() {
      const endA = { x: 2, y: 1 };
      const endB = { x: 6, y: 4 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.length, 5);
    });
    it("should give the length of the line of having all the negative coordinates", function() {
      const endA = { x: -2, y: -1 };
      const endB = { x: -6, y: -4 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.length, 5);
    });
    it("should give the length of the line of having both positive and negative coordinates", function() {
      const endA = { x: -2, y: 1 };
      const endB = { x: 6, y: -4 };
      const line = new Line(endA, endB);
      assert.approximately(line.length, 9, 0.5);
    });
    it("should give the square root of the sum of the one end point if the other end point is origin", function() {
      const endA = { x: 1, y: 1 };
      const endB = { x: 0, y: 0 };
      const line = new Line(endA, endB);
      assert.approximately(line.length, 1, 0.5);
    });
  });

  describe("slope", function() {
    it("should give the positive slope when x and y coordinates of one end is greater than the other", function() {
      const endA = { x: 1, y: 1 };
      const endB = { x: 0, y: 0 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.slope, 1);
    });
    it("should give the negative slope if only the endB ordinate is less than endA ordinate", function() {
      const endA = { x: 0, y: 1 };
      const endB = { x: 1, y: 0 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.slope, -1);
    });
    it("should give the negative slope if only the endB abscissa is less than endA abscissa", function() {
      const endA = { x: 1, y: 0 };
      const endB = { x: 0, y: 1 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.slope, -1);
    });
    it("should give the positive infinity if the x coordinates are the same and endA ordinate is less than endB ordinate", function() {
      const endA = { x: 1, y: 0 };
      const endB = { x: 1, y: 5 };
      const line = new Line(endA, endB);
      const expected = Infinity;
      assert.strictEqual(line.slope, expected);
    });
    it("should give the negative infinity if the x coordinates are the same and endB ordinate is less than endA ordinate", function() {
      const endA = { x: 1, y: 5 };
      const endB = { x: 1, y: 0 };
      const line = new Line(endA, endB);
      const expected = -Infinity;
      assert.strictEqual(line.slope, expected);
    });
    it("should give zero if the ordinates are equal", function() {
      const endA = { x: 2, y: 5 };
      const endB = { x: 1, y: 5 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.slope, 0);
    });
    it("should give NAN if differences between the ends is zero", function() {
      const endA = { x: 2, y: 5 };
      const endB = { x: 2, y: 5 };
      const line = new Line(endA, endB);
      assert.isNaN(line.slope);
    });
  });

  describe("isParallelTo", function() {
    it("should invalidate if the two lines are same", function() {
      const lineAEndA = { x: 1, y: 2 };
      const lineAEndB = { x: 3, y: 4 };
      const lineA = new Line(lineAEndA, lineAEndB);
      const lineB = new Line(lineAEndA, lineAEndB);
      assert.isFalse(lineA.isParallelTo(lineB));
    });
    it("should invalidate if the two lines are not parallel", function() {
      const lineAEndA = { x: 1, y: 3 };
      const lineAEndB = { x: 3, y: 4 };
      const lineA = new Line(lineAEndA, lineAEndB);
      const lineBEndA = { x: 1, y: 2 };
      const lineBEndB = { x: 3, y: 4 };
      const lineB = new Line(lineBEndA, lineBEndB);
      assert.isFalse(lineA.isParallelTo(lineB));
    });
    it("should validate if the two lines are parallel", function() {
      const lineAEndA = { x: 1, y: 2 };
      const lineAEndB = { x: 2, y: 3 };
      const lineA = new Line(lineAEndA, lineAEndB);
      const lineBEndA = { x: 3, y: 4 };
      const lineBEndB = { x: 4, y: 5 };
      const lineB = new Line(lineBEndA, lineBEndB);
      assert.isTrue(lineA.isParallelTo(lineB));
    });
  });

  describe("findY", function() {
    it("should give the y value if x is given", function() {
      const endA = { x: 2, y: 1 };
      const endB = { x: 1, y: 2 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.findY(1), 2);
    });
  });

  describe("findX", function() {
    it("should give the x value if y is given", function() {
      const endA = { x: 2, y: 1 };
      const endB = { x: 1, y: 2 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.findX(1), 2);
    });
  });

  describe("split", function() {
    it("should give 2 lines splitted exactly at the centre of line", function() {
      const endA = { x: 5, y: 5 };
      const endB = { x: 1, y: 1 };
      const midPoint = { x: 3, y: 3 };
      const line = new Line(endA, endB);
      const firstHalfLine = new Line(endA, midPoint);
      const secondHalfLine = new Line(midPoint, endB);
      const expected = [firstHalfLine, secondHalfLine];
      assert.deepStrictEqual(line.split(), expected);
    });
  });
});
