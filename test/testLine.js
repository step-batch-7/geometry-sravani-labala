"use strict";

const assert = require("assert");
const Line = require("./../src/line.js");

describe("Line", function() {
  describe("toString", function() {
    it("should give string representation of the line ", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      assert.strictEqual(line.toString(), "Line (1,2) (3,4)");
    });
  });

  describe("isEqualTo", function() {
    it("should give true if both lines are similar", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      const otherLineEndA = { x: 1, y: 2 };
      const otherLineEndB = { x: 3, y: 4 };
      const otherLine = new Line(otherLineEndA, otherLineEndB);
      assert.strictEqual(line.isEqualTo(otherLine), true);
    });

    it("should give false if both lines are not similar", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      const otherLineEndA = { x: 1, y: 2 };
      const otherLineEndB = { x: 3, y: 3 };
      const otherLine = new Line(otherLineEndA, otherLineEndB);
      assert.strictEqual(line.isEqualTo(otherLine), false);
    });

    it("should give false if the type of 'other' doesn't belongs to the class Line", function() {
      const endA = { x: 1, y: 2 };
      const endB = { x: 3, y: 4 };
      const line = new Line(endA, endB);
      const otherLine = { endA: { x: 1, y: 2 }, endB: { x: 3, y: 4 } };
      assert.strictEqual(line.isEqualTo(otherLine), false);
    });
  });
});
