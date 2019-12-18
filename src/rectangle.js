"use strict";

const Point = require("./point");
const Line = require("./line");

const isInRange = function(range, value) {
  const [lowerLimit, higherLimit] = [Math.min(...range), Math.max(...range)];
  return lowerLimit <= value && higherLimit >= value;
};

class Rectangle {
  constructor(vertexA, vertexC) {
    this.vertexA = new Point(vertexA.x, vertexA.y);
    this.vertexC = new Point(vertexC.x, vertexC.y);
    this.vertexB = new Point(vertexC.x, vertexA.y);
    this.vertexD = new Point(vertexA.x, vertexC.y);
  }

  toString() {
    return `[Rectangle (${this.vertexA.x},${this.vertexA.y}) to (${this.vertexC.x},${this.vertexC.y})]`;
  }

  get area() {
    const length = this.vertexA.findDistanceTo(this.vertexB);
    const breadth = this.vertexB.findDistanceTo(this.vertexC);
    return length * breadth;
  }

  get perimeter() {
    const length = this.vertexA.findDistanceTo(this.vertexB);
    const breadth = this.vertexB.findDistanceTo(this.vertexC);
    return 2 * (length + breadth);
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    const diagonalA = new Line(this.vertexA, this.vertexC);
    const diagonalB = new Line(this.vertexB, this.vertexD);
    const otherDiagonal = new Line(other.vertexA, other.vertexC);
    return (
      diagonalA.isEqualTo(otherDiagonal) || diagonalB.isEqualTo(otherDiagonal)
    );
  }

  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    const { vertexA, vertexC } = this;
    const areXsEqual = other.x == vertexA.x || other.x == vertexC.x;
    const areYsEqual = other.y == vertexA.y || other.y == vertexC.y;
    const isXInRange = isInRange([vertexA.x, vertexC.x], other.x);
    const isYInRange = isInRange([vertexA.y, vertexC.y], other.y);
    return (areXsEqual && isYInRange) || (areYsEqual && isXInRange);
  }

  covers(other) {
    if (!(other instanceof Point)) return false;
    const { vertexA, vertexC } = this;
    const isXInRange = isInRange([vertexA.x, vertexC.x], other.x);
    const isYInRange = isInRange([vertexA.y, vertexC.y], other.y);
    return isYInRange && isXInRange && !this.hasPoint(other);
  }
}

module.exports = Rectangle;
