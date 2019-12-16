"use strict";

const Point = require("./point");

const getMidPoint = function(endA, endB) {
  const midOfX = (endA.x + endB.x) / 2;
  const midOfY = (endA.y + endB.y) / 2;
  return new Point(midOfX, midOfY);
};

const isOutOfRange = function(range, value) {
  const [lowerLimit, higherLimit] = range.sort();
  return lowerLimit < value && value > higherLimit;
};

const areCollinear = function(pointA, pointB, pointC) {
  const [x1, y1] = [pointA.x, pointA.y];
  const [x2, y2] = [pointB.x, pointB.y];
  const [x3, y3] = [pointC.x, pointC.y];
  return x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
};

const getPoint = function(ratio, point1, point2) {
  const xCoordinate = (1 - ratio) * point1.x + ratio * point2.x;
  const yCoordinate = (1 - ratio) * point1.y + ratio * point2.y;
  return new Point(xCoordinate, yCoordinate);
};

class Line {
  constructor(endA, endB) {
    this.endA = new Point(endA.x, endA.y);
    this.endB = new Point(endB.x, endB.y);
  }

  toString() {
    return `[Line (${this.endA.x},${this.endA.y}) to (${this.endB.x},${this.endB.y})]`;
  }

  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      (this.endA.isEqualTo(other.endA) && this.endB.isEqualTo(other.endB)) ||
      (this.endB.isEqualTo(other.endA) && this.endA.isEqualTo(other.endB))
    );
  }

  get length() {
    return this.endA.findDistanceTo(this.endB);
  }

  get slope() {
    const dy = this.endB.y - this.endA.y;
    const dx = this.endB.x - this.endA.x;
    return dy / dx;
  }

  isParallelTo(other) {
    if (!(other instanceof Line) || this === other) return false;
    if (areCollinear(this.endA, this.endB, other.endA)) return false;
    return this.slope === other.slope;
  }

  findY(x) {
    const { endA, endB, slope } = this;
    if (isOutOfRange([endA.x, endB.x], x)) return NaN;
    if (endA.x == endB.x) return endA.y;
    const dx = x - endA.x;
    return slope * dx + endA.y;
  }

  findX(y) {
    const { endA, endB, slope } = this;
    if (isOutOfRange([endA.y, endB.y], y)) return NaN;
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

  findPointFromStart(distance) {
    const { endA, endB, length } = this;
    if (distance < 0 || distance > length) return null;
    const ratioOfDistances = distance / length;
    return getPoint(ratioOfDistances, endA, endB);
  }

  findPointFromEnd(distance) {
    return new Line(this.endB, this.endA).findPointFromStart(distance);
  }
}

module.exports = Line;
