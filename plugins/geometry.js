(function() {

  var Vector = $.require("vector");

  exports.transform = function(obj, scale, translate) {
    var len=obj.length, ret=new Array(len), i;
    if (Vector.isPoint(obj))
      return [ scale[0]*obj[0]+translate[0], scale[1]*obj[1]+translate[1] ];
    else
      for (i=0; i<len; i++)
        ret[i] = exports.transform(obj[i], scale, translate);
    return ret;
  };

  exports.reflect = function(obj) {
    var len=obj.length, ret=new Array(len), i;
    if (Vector.isPoint(obj))
      return [ -obj[0], obj[1] ];
    else
      for (i=0; i<len; i++)
        ret[i] = exports.reflect(obj[i]);
    return ret;
  };

})();
