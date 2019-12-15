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
    const dx = this.endB.x - this.endA.x;
    const dy = this.endB.y - this.endA.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  get slope() {
    const dy = this.endB.y - this.endA.y;
    const dx = this.endB.x - this.endA.x;
    return dy / dx;
  }

  isParallelTo(other) {
    if (!(other instanceof Line) || this.isEqualTo(other)) return false;
    const areLinesOverlapping =
      this.hasPoint(new Point(other.endA.x, other.endA.y)) ||
      this.hasPoint(new Point(other.endB.x, other.endB.y));
    return !areLinesOverlapping && this.slope == other.slope;
  }

  findY(x) {
    const { endA, endB, slope } = this;
    const minimumOfX = Math.min(endA.x, endB.x);
    const maximumOfX = Math.max(endA.x, endB.x);
    if (x < minimumOfX || x > maximumOfX) return NaN;
    if (endA.x == endB.x) return endA.y;
    const dx = x - endA.x;
    return slope * dx + endA.y;
  }

  findX(y) {
    const { endA, endB, slope } = this;
    const minimumOfY = Math.min(endA.y, endB.y);
    const maximumOfY = Math.max(endA.y, endB.y);
    if (y < minimumOfY || y > maximumOfY) return NaN;
    if (endA.y == endB.y) return endA.x;
    const dy = y - endA.y;
    return endA.x + dy / slope;
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
    return point.y == this.findY(point.x) || point.x == this.findX(point.y);
  }
}

module.exports = Line;
