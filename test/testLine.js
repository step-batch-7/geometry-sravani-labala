const assert = require("assert");
const { Line } = require("./../src/line.js");

describe("line", function() {
  describe("toString", function() {
    it("should give something", function() {
      let line = new Line();
      assert.strictEqual(line.toString(), "something");
    });
  });
});
