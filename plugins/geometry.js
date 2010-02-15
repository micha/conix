(function() {

  function Geometry() {
  }

  Geometry.isNumber = function(n) {
    return typeof n == "number" || n instanceof Number;
  };

  Geometry.isPoint = function(p) {
    with (Geometry) {
      return p.length == 2 && isNumber(p[0]) && isNumber(p[1]);
    }
  };

  Geometry.add = function() {
    var ret=[ 0, 0 ], len=arguments.length, i;
    for (i=0; i<len; i++) {
      ret[0] += arguments[i][0];
      ret[1] += arguments[i][1];
    }
    return ret;
  };

  Geometry.subtract = function() {
    var ret=[arguments[0][0], arguments[0][1]], len=arguments.length, i;
    for (i=1; i<len; i++) {
      ret[0] -= arguments[i][0];
      ret[1] -= arguments[i][1];
    }
    return ret;
  };

  Geometry.multiply = Geometry.x = function(p, k) {
    return [ k * p[0], k * p[1] ];
  };

  Geometry.dot = function(p1, p2) {
    return p1[0] * p2[0] + p1[1] * p2[1];
  };

  Geometry.transform = function(obj, scale, translate) {
    var len=obj.length, ret=new Array(len), i;
    with (Geometry) {
      if (isPoint(obj))
        return [ scale[0]*obj[0]+translate[0], scale[1]*obj[1]+translate[1] ];
      else
        for (i=0; i<len; i++)
          ret[i] = transform(obj[i], scale, translate);
      return ret;
    }
  };

  Geometry.intersection = function(path, line) {
    var len=path.length, i;
  }

  exports = Geometry;

})();
