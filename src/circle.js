class Circle {
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }

  toString() {
    return `[Circle @(${this.center.x},${this.center.y}) radius ${this.radius}]`;
  }
}

module.exports = Circle;
