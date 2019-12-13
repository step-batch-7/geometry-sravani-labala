"use strict";

const assert = require("chai").assert;
const Line = require("./../src/line.js");

describe("line", function() {
  describe("toString", function() {
    it("should give the points of the line ", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.toString(), "Line (1,2) (3,4)");
    });
  });

  describe("isEqualTo", function() {
    it("should give true if both lines are equal", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      const otherLineEndA = { x: 1, y: 2 };
      const otherLineEndB = { x: 3, y: 4 };
      const otherLine = new Line(otherLineEndA, otherLineEndB);
      assert.isTrue(line.isEqualTo(otherLine));
    });

    it("should give false if both lines are not equal", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      const otherLineEndA = { x: 1, y: 2 };
      const otherLineEndB = { x: 3, y: 3 };
      const otherLine = new Line(otherLineEndA, otherLineEndB);
      assert.isFalse(line.isEqualTo(otherLine));
    });

    it("should give false if the type of other line doesn't belongs to the class Line", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      const otherLine = { endA: { x: 1, y: 2 }, endB: { x: 3, y: 4 } };
      assert.isFalse(line.isEqualTo(otherLine));
    });
  });
});
