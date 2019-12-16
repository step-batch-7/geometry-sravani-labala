"use strict";
const Line = require("./line.js");

class Point {
  constructor(abscissa, ordinate) {
    this.x = abscissa;
    this.y = ordinate;
  }

  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }

  visit(functionRef) {
    return functionRef(this.x, this.y);
  }

  isEqualTo(other) {
    if (!(other instanceof Point)) return false;
    return this.x === other.x && this.y === other.y;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  findDistanceTo(other) {
    if (!(other instanceof Point)) return NaN;
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  isOn(other) {
    return other.hasPoint(this);
  }
}

module.exports = Point;
