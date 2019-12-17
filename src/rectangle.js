"use strict";

const Point = require("./point");
const Line = require("./line");
class Rectangle {
  constructor(pointA, pointC) {
    this.diagonal = new Line(pointA, pointC);
  }

  toString() {
    return `[Rectangle (${this.diagonal.endA.x},${this.diagonal.endA.y}) to (${this.diagonal.endB.x},${this.diagonal.endB.y})]`;
  }

  get area() {
    const length = this.diagonal.endA.x - this.diagonal.endB.x;
    const breadth = this.diagonal.endA.y - this.diagonal.endB.y;
    return length * breadth;
  }

  get perimeter() {
    const length = this.diagonal.endB.x - this.diagonal.endA.x;
    const breadth = this.diagonal.endB.y - this.diagonal.endA.y;
    return Math.abs(2 * (length + breadth));
  }
}

module.exports = Rectangle;
