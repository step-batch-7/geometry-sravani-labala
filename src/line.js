"use strict";

const Point = require("./point");

const getMidPoint = function(endA, endB) {
  const midOfX = (endA.x + endB.x) / 2;
  const midOfY = (endA.y + endB.y) / 2;
  return new Point(midOfX, midOfY);
};

const isInRange = function(range, value) {
  const [lowerLimit, higherLimit] = [Math.min(...range), Math.max(...range)];
  return lowerLimit <= value && higherLimit >= value;
};

const areCollinear = function(pointA, pointB, pointC) {
  const [x1, y1] = [pointA.x, pointA.y];
  const [x2, y2] = [pointB.x, pointB.y];
  const [x3, y3] = [pointC.x, pointC.y];
  return x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
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
      (this.endA.isEqualTo(other.endB) && this.endB.isEqualTo(other.endA))
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
    if (!(other instanceof Line)) return false;
    if (areCollinear(this.endA, this.endB, other.endA)) return false;
    if (Math.abs(this.slope) == Infinity && Math.abs(other.slope) == Infinity)
      return true;
    return this.slope === other.slope;
  }

  findY(x) {
    const { endA, endB, slope } = this;
    if (!isInRange([endA.x, endB.x], x)) return NaN;
    if (endA.x == endB.x) return endA.y;
    const dx = x - endA.x;
    return slope * dx + endA.y;
  }

  findX(y) {
    const { endA, endB, slope } = this;
    if (!isInRange([endA.y, endB.y], y)) return NaN;
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
    const ratio = distance / length;
    const xCoordinate = (1 - ratio) * endA.x + ratio * endB.x;
    const yCoordinate = (1 - ratio) * endA.y + ratio * endB.y;
    if (isNaN(xCoordinate) || isNaN(yCoordinate)) {
      return null;
    }
    return new Point(xCoordinate, yCoordinate);
  }

  findPointFromEnd(distance) {
    return new Line(this.endB, this.endA).findPointFromStart(distance);
  }
}

module.exports = Line;
