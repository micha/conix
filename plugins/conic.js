(function() {

  var mesh = 32;

  var Line = $.require("line");

  function Conic(a, c, b, rho) {
    var d = [ a[0] + (b[0] - a[0]) / 2, a[1] + (b[1] - a[1]) / 2 ];

    var s = [ d[0] + (c[0] - d[0]) * rho, d[1] + (c[1] - d[1]) * rho ];

    this.a      = a;
    this.b      = b;
    this.c      = c;
    this.s      = s;
    this.points = [];

    this.compute();
  }

  Conic.mesh = function(m) {
    if (m != undefined)
      mesh = m;
    return mesh;
  };

  Conic.prototype.compute = function() {
    var a = this.a;
    var b = this.b;
    var c = this.c;
    var s = this.s;

    this.points       = Array(mesh + 1);
    this.points[0]    = a;
    this.points[mesh] = b;

    var AC = new Line(a, c);
    var BC = new Line(b, c);
    var AB = new Line(a, b);
    var AS = new Line(a, s);
    var BS = new Line(b, s);

    var e, f, g, h, CE;

    for (var i=1; i<mesh; i++) {
      e = [ 
        a[0] + i * (b[0] - a[0]) / mesh,
        a[1] + i * (b[1] - a[1]) / mesh
      ];

      CE = new Line(c, e);

      f = AS.intersect(CE);
      g = BS.intersect(CE);
      h = (new Line(b, f)).intersect(new Line(a, g));
      this.points[i] = h;
    }
  }

  Conic.prototype.draw = function(ctx) {
    var l = this.points.length;
    for (i=1; i<l; i++)
      Line.draw(this.points[i-1], this.points[i], ctx);
  }

  exports = Conic;

})();
