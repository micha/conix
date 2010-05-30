(function() {

  exports.isNumber = function(n) {
    return typeof n == "number" || n instanceof Number;
  };

  exports.isPoint = function(p) {
    return p.length == 2 && exports.isNumber(p[0]) && exports.isNumber(p[1]);
  };

  exports.clone = function(p) {
    return p.slice(0);
  };

  exports.add = function() {
    var ret=[], len=arguments.length, i, j, k;
    if (len > 0) {
      ret = arguments[0].slice(0);
      j = arguments[0].length;
      for (i=1; i<len; i++)
        for (k=0; k<j; k++)
          ret[k] += arguments[i][k];
    }
    return ret;
  };

  exports.subtract = function() {
    var ret=[], len=arguments.length, i, j, k;
    if (len > 0) {
      ret = arguments[0].slice(0);
      j = arguments[0].length;
      for (i=1; i<len; i++)
        for (k=0; k<j; k++)
          ret[k] -= arguments[i][k];
    }
    return ret;
  };

  exports.multiply = exports.x = function(p, k) {
    var ret=p.slice(0), len=p.length; i;
    for (i=0; i<len; i++) {
      ret[i] *= k;
    }
    return ret;
  };

  exports.dot = function(p1, p2) {
    var ret=0, len=p1.length; i;
    for (i=0; i<len; i++) {
      ret += p1[i]*p2[i];
    }
    return ret;
  };

  exports.length = function(p) {
    return Math.sqrt(exports.dot(p, p));
  };

  exports.unitNormal = function(p) {

  };

})();
