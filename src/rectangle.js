"use strict";

const Point = require("./point");
const Line = require("./line");
class Rectangle {
  constructor(pointA, pointC) {
    this.diagonalA = new Line(pointA, pointC);
  }

  toString() {
    return `[Rectangle (${this.diagonalA.endA.x},${this.diagonalA.endA.y}) to (${this.diagonalA.endB.x},${this.diagonalA.endB.y})]`;
  }

  get area() {
    const length = this.diagonalA.endA.x - this.diagonalA.endB.x;
    const breadth = this.diagonalA.endA.y - this.diagonalA.endB.y;
    return length * breadth;
  }
}

module.exports = Rectangle;
