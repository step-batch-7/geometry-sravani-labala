"use strict";

const Point = require("./point");
const Line = require("./line");

const isInRange = function(range, value) {
  const [lowerLimit, higherLimit] = [Math.min(...range), Math.max(...range)];
  return lowerLimit <= value && higherLimit >= value;
};

const getLengthAndBreadth = function(endA, endB) {
  const length = Math.abs(endA.x - endB.x);
  const breadth = Math.abs(endA.y - endB.y);
  return { length, breadth };
};

class Rectangle {
  constructor(vertexA, vertexC) {
    this.diagonal = new Line(vertexA, vertexC);
  }

  toString() {
    const { endA, endB } = this.diagonal;
    return `[Rectangle (${endA.x},${endA.y}) to (${endB.x},${endB.y})]`;
  }

  get area() {
    const { length, breadth } = getLengthAndBreadth(
      this.diagonal.endA,
      this.diagonal.endB
    );
    return length * breadth;
  }

  get perimeter() {
    const { length, breadth } = getLengthAndBreadth(
      this.diagonal.endA,
      this.diagonal.endB
    );
    return 2 * (length + breadth);
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    const { endA, endB } = this.diagonal;
    const diagonal2 = new Line(
      { x: endB.x, y: endA.y },
      { x: endA.x, y: endB.y }
    );
    return (
      this.diagonal.isEqualTo(other.diagonal) ||
      diagonal2.isEqualTo(other.diagonal)
    );
  }

  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    const [vertexA, vertexC] = [this.diagonal.endA, this.diagonal.endB];
    const areXsEqual = other.x == vertexA.x || other.x == vertexC.x;
    const areYsEqual = other.y == vertexA.y || other.y == vertexC.y;
    const isXInRange = isInRange([vertexA.x, vertexC.x], other.x);
    const isYInRange = isInRange([vertexA.y, vertexC.y], other.y);
    return (areXsEqual && isYInRange) || (areYsEqual && isXInRange);
  }

  covers(other) {
    if (!(other instanceof Point)) return false;
    const [vertexA, vertexC] = [this.diagonal.endA, this.diagonal.endB];
    const isXInRange = isInRange([vertexA.x, vertexC.x], other.x);
    const isYInRange = isInRange([vertexA.y, vertexC.y], other.y);
    return isYInRange && isXInRange && !this.hasPoint(other);
  }
}

module.exports = Rectangle;
