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

  isEqualTo(otherLine) {
    return (
      otherLine instanceof Line &&
      arePointsEqual(this.endA, otherLine.endA) &&
      arePointsEqual(this.endB, otherLine.endB)
    );
  }
}

module.exports = Line;
