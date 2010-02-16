(function() {

  var Line = $.require("line");

  exports.isNumber = function(n) {
    return typeof n == "number" || n instanceof Number;
  };

  exports.isPoint = function(p) {
    with (exports) {
      return p.length == 2 && isNumber(p[0]) && isNumber(p[1]);
    }
  };

  exports.add = function() {
    var ret=[ 0, 0 ], len=arguments.length, i;
    for (i=0; i<len; i++) {
      ret[0] += arguments[i][0];
      ret[1] += arguments[i][1];
    }
    return ret;
  };

  exports.subtract = function() {
    var ret=[arguments[0][0], arguments[0][1]], len=arguments.length, i;
    for (i=1; i<len; i++) {
      ret[0] -= arguments[i][0];
      ret[1] -= arguments[i][1];
    }
    return ret;
  };

  exports.multiply = exports.x = function(p, k) {
    return [ k * p[0], k * p[1] ];
  };

  exports.dot = function(p1, p2) {
    return p1[0] * p2[0] + p1[1] * p2[1];
  };

  exports.transform = function(obj, scale, translate) {
    var len=obj.length, ret=new Array(len), i;
    with (exports) {
      if (isPoint(obj))
        return [ scale[0]*obj[0]+translate[0], scale[1]*obj[1]+translate[1] ];
      else
        for (i=0; i<len; i++)
          ret[i] = transform(obj[i], scale, translate);
      return ret;
    }
  };

  exports.intersection = function(path1, path2) {
    var len1=path1.length, len2=path2.length, ret=[], i, j, p, l1, l2, t1, t2;
    for (i=1; i<len1; i++) {
      l1 = [ path1[i - 1], path1[i] ];
      for (j=1; j<len2; j++) {
        l2 = [ path2[j - 1], path2[j] ];
        p = Line.intersection(l1, l2);
        if (p != null) {
          t1 = Line.isTween(l1, p);
          t2 = Line.isTween(l2, p);
          if (0 <= t1 && t1 <= 1 && 0 <= t2 && t2 <= 1)
            ret.push(p);
        }
      }
    }
    return ret;
  }

})();
