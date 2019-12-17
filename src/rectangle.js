"use strict";

const Point = require("./point");
const Line = require("./line");
class Rectangle {
  constructor(vertexA, vertexC) {
    this.vertexA = new Point(vertexA.x, vertexA.y);
    this.vertexB = new Point(vertexA.x, vertexC.y);
    this.vertexC = new Point(vertexC.x, vertexC.y);
    this.vertexD = new Point(vertexC.x, vertexA.y);
    this.diagonal = new Line(vertexA, vertexC);
  }

  toString() {
    return `[Rectangle (${this.vertexA.x},${this.vertexA.y}) to (${this.vertexC.x},${this.vertexC.y})]`;
  }

  get area() {
    const length = this.diagonal.endA.x - this.diagonal.endB.x;
    const breadth = this.diagonal.endA.y - this.diagonal.endB.y;
    return Math.abs(length * breadth);
  }

  get perimeter() {
    const length = this.diagonal.endB.x - this.diagonal.endA.x;
    const breadth = this.diagonal.endB.y - this.diagonal.endA.y;
    return Math.abs(2 * (length + breadth));
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    return this.diagonal.isEqualTo(other.diagonal);
  }
}

module.exports = Rectangle;
