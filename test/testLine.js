"use strict";

const assert = require("chai").assert;
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
      const expected = 5;
      assert.strictEqual(line.length, expected);
    });
  });
});
