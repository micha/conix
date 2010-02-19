(function() {

  var Vector  = $.require("vector");
  var Line    = $.require("line");
  var Geom    = $.require("geometry");

  exports.clone = function(path) {
    var len=path.length, i, ret=new Array(len);
    for (i=0; i<len; i++)
      ret[i] = path[i].slice(0);
    return ret;
  };

  exports.intersection = function(path1, path2) {
    var len1=path1.length, len2=path2.length, ret=[], i, j, p, l1, l2, t1, t2;
    for (i=1; i<len1; i++) {
      l1 = [ path1[i - 1], path1[i] ];
      for (j=1; j<len2; j++) {
        l2 = [ path2[j - 1], path2[j] ];
        p = Line.intersection(l1, l2);
        if (p != null) {
          if (Line.isTween(l1, p) && Line.isTween(l2, p))
            ret.push(p);
        }
      }
    }
    console.log(ret);
    return ret;
  }

  exports.curvature = function(path) {
    var len=path.length, ret=[], i, u1, u2, p1, p2, vec;
    for (i=1; i<len-1; i++) {
      p1 = Vector.subtract(path[i], path[i-1]);
      u1 = Vector.multiply(p1, 1/Vector.length(p1));
      p2 = Vector.subtract(path[i+1], path[i]);
      u2 = Vector.multiply(p2, 1/Vector.length(p2));
      vec = Vector.multiply(Vector.subtract(u2, u1), -1/Vector.length(Vector.add(p1, p2)));
      ret.push([ path[i], Geom.transform(vec, [300000,300000], path[i]) ]);
    }
    return ret;
  };

  exports.concat = function() {
    var len=arguments.length, ret=exports.clone(arguments[0]), i, j;
    for (i=1; i<len; i++) {
      c = exports.clone(arguments[i]);
      c.shift();
      for (j=0; j<c.length; j++)
        ret.push(c[j]);
    }
    return ret;
  };

  exports.close = function(path) {
    if (path.length > 0) {
      path.push(path[1]);
      path.unshift(path[path.length-3]);
    }
    return path;
  };

})();
