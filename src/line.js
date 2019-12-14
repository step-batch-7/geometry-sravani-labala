"use strict";
const Point = require("./point");

const arePointsEqual = function(pointA, pointB) {
  return pointA.x === pointB.x && pointA.y === pointB.y;
};

const getMidPoint = function(endA, endB) {
  const midOfX = (endA.x + endB.x) / 2;
  const midOfY = (endA.y + endB.y) / 2;
  return { x: midOfX, y: midOfY };
};

class Line {
  constructor(endA, endB) {
    this.endA = { x: endA.x, y: endA.y };
    this.endB = { x: endB.x, y: endB.y };
  }

  toString() {
    return `[Line (${this.endA.x},${this.endA.y}) to (${this.endB.x},${this.endB.y})]`;
  }

  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      arePointsEqual(this.endA, other.endA) &&
      arePointsEqual(this.endB, other.endB)
    );
  }

  get length() {
    const diffOfXCoordinates = this.endA.x - this.endB.x;
    const diffOfYCoordinates = this.endA.y - this.endB.y;
    return Math.hypot(diffOfXCoordinates, diffOfYCoordinates);
  }

  get slope() {
    const numerator = this.endB.y - this.endA.y;
    const denominator = this.endB.x - this.endA.x;
    return numerator / denominator;
  }

  isParallelTo(other) {
    if (!(other instanceof Line) || this.isEqualTo(other)) return false;
    return other.slope == this.slope;
  }

  findY(x) {
    const { endA, endB } = this;
    const minimumOfX = Math.min(endA.x, endB.x);
    const maximumOfX = Math.max(endA.x, endB.x);
    if (x < minimumOfX || x > maximumOfX) return NaN;
    const slope = this.slope;
    const diffInX = x - endA.x;
    return slope * diffInX + endA.y;
  }

  findX(y) {
    const { endA, endB } = this;
    const minimumOfY = Math.min(endA.y, endB.y);
    const maximumOfY = Math.max(endA.y, endB.y);
    if (y < minimumOfY || y > maximumOfY) return NaN;
    const slope = this.slope;
    const diffInY = y - endA.y;
    const product = slope * endA.x;
    return (diffInY + product) / slope;
  }

  split() {
    const { endA, endB } = this;
    const midPoint = getMidPoint(endA, endB);
    const firstHalfLine = new Line(endA, midPoint);
    const secondHalfLine = new Line(midPoint, endB);
    return [firstHalfLine, secondHalfLine];
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    return point.x == this.findX(point.y);
  }
}

module.exports = Line;
