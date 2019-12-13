"use strict";

const arePointsEqual = function(a, b) {
  return a.x === b.x && a.y === b.y;
};

class Line {
  constructor([x1, y1], [x2, y2]) {
    this.endA = { x: x1, y: y1 };
    this.endB = { x: x2, y: y2 };
  }

  toString() {
    return `Line (${this.endA.x},${this.endA.y}) (${this.endB.x},${this.endB.y})`;
  }

  isEqualTo(otherLine) {
    const instanceOfOtherLine = otherLine instanceof Line;
    const areEndAEqual = arePointsEqual(this.endA, otherLine.endA);
    const areEndBEqual = arePointsEqual(this.endB, otherLine.endB);
    return areEndAEqual && areEndBEqual && instanceOfOtherLine;
  }
}

module.exports = Line;
