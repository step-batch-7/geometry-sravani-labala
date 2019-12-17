"use strict";

const Point = require("./point");

const isInRange = function(range, value) {
  const [lowerLimit, higherLimit] = [Math.min(...range), Math.max(...range)];
  return lowerLimit <= value && higherLimit >= value;
};

const getLengthAndBreadth = function(pointA, pointC) {
  const length = Math.abs(pointA.x - pointC.x);
  const breadth = Math.abs(pointA.y - pointC.y);
  return { length, breadth };
};

class Rectangle {
  constructor(vertexA, vertexC) {
    this.pointA = new Point(vertexA.x, vertexA.y);
    this.pointC = new Point(vertexC.x, vertexC.y);
  }

  toString() {
    return `[Rectangle (${this.pointA.x},${this.pointA.y}) to (${this.pointC.x},${this.pointC.y})]`;
  }

  get area() {
    const { length, breadth } = getLengthAndBreadth(this.pointA, this.pointC);
    return length * breadth;
  }

  get perimeter() {
    const { length, breadth } = getLengthAndBreadth(this.pointA, this.pointC);
    return 2 * (length + breadth);
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    const { pointA, pointC } = this;
    const [p1, p2] = [other.pointA, other.pointC];
    const pointB = new Point(pointA.x, pointC.y);
    const pointD = new Point(pointC.x, pointA.y);
    return (
      (pointA.isEqualTo(p1) && pointC.isEqualTo(p2)) ||
      (pointC.isEqualTo(p1) && pointA.isEqualTo(p2)) ||
      (pointB.isEqualTo(p1) && pointD.isEqualTo(p2)) ||
      (pointD.isEqualTo(p1) && pointB.isEqualTo(p2))
    );
  }

  hasPoint(other) {
    if (!(other instanceof Point)) return false;
    const { pointA, pointC } = this;
    const areXsEqual = other.x == pointA.x || other.x == pointC.x;
    const areYsEqual = other.y == pointA.y || other.y == pointC.y;
    const isXInRange = isInRange([pointA.x, pointC.x], other.x);
    const isYInRange = isInRange([pointA.y, pointC.y], other.y);
    return (areXsEqual && isYInRange) || (areYsEqual && isXInRange);
  }

  covers(other) {
    if (!(other instanceof Point)) return false;
    const { pointA, pointC } = this;
    const isXInRange = isInRange([pointA.x, pointC.x], other.x);
    const isYInRange = isInRange([pointA.y, pointC.y], other.y);
    return !this.hasPoint(other) && isXInRange && isYInRange;
  }
}

module.exports = Rectangle;
