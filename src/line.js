"use strict";

const arePointsEqual = function(pointA, pointB) {
  return pointA.x === pointB.x && pointA.y === pointB.y;
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
    const slope = this.slope;
    const diffInX = x - this.endA.x;
    return slope * diffInX + this.endA.y;
  }

  findX(y) {
    const slope = this.slope;
    const diffInY = y - this.endA.y;
    const product = slope * this.endA.x;
    return (diffInY + product) / slope;
  }

  split() {
    const { endA, endB } = this;
    const midOfX = (endA.x + endB.x) / 2;
    const midOfY = (endA.y + endB.y) / 2;
    const midPoint = { x: midOfX, y: midOfY };
    const firstHalfLine = new Line(endA, midPoint);
    const secondHalfLine = new Line(midPoint, endB);
    return [firstHalfLine, secondHalfLine];
  }
}

module.exports = Line;
