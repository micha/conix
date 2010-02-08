(function() {

  function Line(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;

    this.a  = p1[0] == p2[0]
      ? Infinity : (p2[1] - p1[1]) / (p2[0] - p1[0]);
    this.b  = p1[0] == p2[0]
      ? Infinity : p1[1] - p1[0] * (p2[1] - p1[1]) / (p2[0] - p1[0]);

  }

  Line.draw = function(p1, p2, ctx) {
    ctx.beginPath();
    ctx.moveTo(p1[0], p1[1]);
    ctx.lineTo(p2[0], p2[1]);
    ctx.stroke();
  };

  Line.prototype.draw = function(ctx) {
    Line.draw(this.p1, this.p2, ctx);
  };

  Line.prototype.intersect = function(l) {
    return (this.a == Infinity ? [ p1[0], l.a * p1[0] + l.b ]
        : (l.a == Infinity ? [ l.p1[0], this.a * l.p1[0] + this.b ]
          : [
              (l.b - this.b) / (this.a - l.a),
              this.a * (l.b - this.b) / (this.a - l.a) + this.b
            ]));
  };

  exports = Line;

})();
