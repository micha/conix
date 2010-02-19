(function() {

  var mesh = 32;

  var Vector  = $.require("vector");
  var Line    = $.require("line");
  var Path    = $.require("path");
  var Geom    = $.require("geometry");

  exports.get = function(a, c, b, rho) {
    var d, s=rho, ret;

    d = [ a[0] + (b[0] - a[0]) / 2, a[1] + (b[1] - a[1]) / 2 ];

    if (Vector.isNumber(rho))
      s = [ d[0] + (c[0] - d[0]) * rho, d[1] + (c[1] - d[1]) * rho ];
    else
      rho = (c[0] == d[0]
        ? (s[1] - d[1]) / (c[1] - d[1])
        : (s[0] - d[0]) / (c[0] - d[0]));

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

  exports.mesh = function(m) {
    if (m != undefined)
      mesh = m;
    return mesh;
  };

  exports.split = function(conic) {
    var m1    = conic.a;
    var m2    = conic.s;
    var m3    = conic.b;

    var mid   = Line.tween([m1, m3], 0.5);
    var vec   = Vector.subtract(m2, mid);
    var tan   = Geom.transform([m1, m3], [1,1], vec);

    var c1    = Line.intersection(tan, [conic.a, conic.c]);
    var c2    = Line.intersection(tan, [conic.b, conic.c]);

    var mid1  = Line.tween([m1, m2], 0.5);
    var mid2  = Line.tween([m2, m3], 0.5);

    var s1    = Path.intersection(conic, [mid1, c1])[0];
    var s2    = Path.intersection(conic, [mid2, c2])[0];

    return [ exports.get(m1, c1, m2, s1), exports.get(m2, c2, m3, s2) ];
  };

})();
