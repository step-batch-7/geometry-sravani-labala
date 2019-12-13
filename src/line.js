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
    return `Line (${this.endA.x},${this.endA.y}) (${this.endB.x},${this.endB.y})`;
  }

  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      arePointsEqual(this.endA, other.endA) &&
      arePointsEqual(this.endB, other.endB)
    );
  }

  get length() {
    const diffOfXValues = this.endA.x - this.endB.x;
    const diffOfYValues = this.endA.y - this.endB.y;
    const sqrOfX = diffOfXValues * diffOfXValues;
    const sqrOfY = diffOfYValues * diffOfYValues;
    const distance = Math.sqrt(sqrOfX + sqrOfY);
    return distance;
  }
}

module.exports = Line;
