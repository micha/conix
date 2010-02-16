(function() {

  var Geom = $.require("geometry");

  exports.length = function(l) {
    //return Math.sqrt(
  };

  exports.intersection = function(l1, l2) {
    var a=new Array(2), b=new Array(2), i, l, p1, p2;

    for (i=0; i<2; i++) {
      l = arguments[i];
      p1 = l[0];
      p2 = l[1];

      l.a = p1[0] == p2[0]
        ? Infinity : (p2[1] - p1[1]) / (p2[0] - p1[0]);
      l.b = p1[0] == p2[0]
        ? Infinity : p1[1] - p1[0] * (p2[1] - p1[1]) / (p2[0] - p1[0]);
    }

    return (l1.a == Infinity && l2.a == Infinity
        ? null
        : (l1.a == Infinity 
          ? [ l1[0][0], l2.a * l1[0][0] + l2.b ]
          : (l2.a == Infinity 
            ? [ l2[0][0], l1.a * l2[0][0] + l1.b ]
            : [ 
                (l2.b - l1.b) / (l1.a - l2.a),
                l1.a * (l2.b - l1.b) / (l1.a - l2.a) + l1.b 
              ])));
  };

  exports.tween = function(l, k) {
    return [ (1-k)*l[0][0] + k*l[1][0], (1-k)*l[0][1] + k*l[1][1] ];
  };

  exports.isTween = function(l, p) {
    return (l[0][0] == l[1][0]
        ? (l[0][1] == l[1][1] 
          ? null
          : (p[1] - l[0][1]) / (l[1][1] - l[0][1]))
        : (p[0] - l[0][0]) / (l[1][0] - l[0][0]));
  };

})();
