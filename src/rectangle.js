"use strict";

const Point = require("./point");
const Line = require("./line");
class Rectangle {
  constructor(vertexA, vertexC) {
    this.diagonal = new Line(vertexA, vertexC);
  }

  toString() {
    const { endA, endB } = this.diagonal;
    return `[Rectangle (${endA.x},${endA.y}) to (${endB.x},${endB.y})]`;
  }

  get area() {
    const { endA, endB } = this.diagonal;
    const length = endA.x - endB.x;
    const breadth = endA.y - endB.y;
    return Math.abs(length * breadth);
  }

  get perimeter() {
    const { endA, endB } = this.diagonal;
    const length = endB.x - endA.x;
    const breadth = endB.y - endA.y;
    return Math.abs(2 * (length + breadth));
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    return this.diagonal.isEqualTo(other.diagonal);
  }
}

module.exports = Rectangle;
