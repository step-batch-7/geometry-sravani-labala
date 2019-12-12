class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  toString() {
    return "working";
  }
  isEqualTo(x1, y1, x2, y2) {
    let line = new Line(x1, x2, y1, y2);
    line = line.lineSegment();
    return line == (x1, y1, x2, y2);
  }
  lineSegment() {
    return this.x1, this.y1, this.x2, this.y2;
  }
}

module.exports = { Line };
