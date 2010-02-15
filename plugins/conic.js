(function() {

  var mesh = 32;

  var Line = $.require("line");

  function Conic(a, c, b, rho) {
    var d, s, ret;

    d = [ a[0] + (b[0] - a[0]) / 2, a[1] + (b[1] - a[1]) / 2 ];

    s = [ d[0] + (c[0] - d[0]) * rho, d[1] + (c[1] - d[1]) * rho ];

    ret         = new Array(mesh);
    ret.a       = a;
    ret.b       = b;
    ret.c       = c;
    ret.s       = s;
    ret.rho     = rho;

    ret[0]      = a;
    ret[mesh]   = b;

    var AC = [a, c];
    var BC = [b, c];
    var AB = [a, b];
    var AS = [a, s];
    var BS = [b, s];

    var e, f, g, h, CE;

    for (var i=1; i<mesh; i++) {
      e = [ 
        a[0] + i * (b[0] - a[0]) / mesh,
        a[1] + i * (b[1] - a[1]) / mesh
      ];

      CE = [c, e];

      f = Line.intersection(AS, CE);
      g = Line.intersection(BS, CE);
      h = Line.intersection([b, f], [a, g]);
      ret[i] = h;
    }

    return ret;
  }

  Conic.mesh = function(m) {
    if (m != undefined)
      mesh = m;
    return mesh;
  };

  exports = Conic;

})();
