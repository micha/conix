(function() {

  function Point() {
  }

  Point.locator = function(p, ctx) {
    ctx.beginPath();
    var radius = 3;
    ctx.arc(p[0], p[1], radius, 0, Math.PI*2, true);
    ctx.fill();
    return p;
  };

  Point.control = function(p, ctx) {
    ctx.beginPath();
    var radius = 3;
    ctx.strokeRect(p[0]-radius, p[1]-radius, p[0]+radius, p[1]+radius);
    ctx.stroke();
    return p;
  };

  exports = Point;

})();
