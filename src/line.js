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

const isOutOfRange = function(range, value) {
  const [point1, point2] = [...range];
  if (point1 > point2) return point2 < value && value > point1;
  return point1 < value && value > point2;
};

const areCollinear = function(pointA, pointB, pointC) {
  const [x1, y1] = [pointA.x, pointA.y];
  const [x2, y2] = [pointB.x, pointB.y];
  const [x3, y3] = [pointC.x, pointC.y];
  return x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
};

const getPoint = function(t, point1, point2) {
  const xCoordinate = (1 - t) * point1.x + t * point2.x;
  const yCoordinate = (1 - t) * point1.y + t * point2.y;
  return new Point(xCoordinate, yCoordinate);
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
    if (!Number.isInteger(distance) || distance < 0 || distance > length)
      return null;
    const ratioOfDistances = distance / length;
    return getPoint(ratioOfDistances, endA, endB);
  }

  findPointFromEnd(distance) {
    const { endA, endB, length } = this;
    if (!Number.isInteger(distance) || distance < 0 || distance > length)
      return null;
    const ratioOfDistances = distance / length;
    return getPoint(ratioOfDistances, endB, endA);
  }
}

module.exports = Line;
