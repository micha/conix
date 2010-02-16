(function() {

  var radius = 3;

  var Geom = $.require("geometry");

  function Draw(canvas, scale, translate) {
    this.canvas     = canvas;
    this.scale      = scale;
    this.translate  = translate;
    this.ctx        = canvas.get()[0].getContext("2d");
  }

  Draw.prototype.strokeStyle = function(n) {
    with (this) {
      ctx.strokeStyle = ctx.fillStyle = (!n ? "black" : (n==1 ? "red" : (n==2 ? "lightgray" : "orange")));
    }
  };

  Draw.prototype.point = function(p, style) {
    with (this) {
      p = Geom.transform(p, scale, translate);
      strokeStyle(style);
      ctx.beginPath();
      ctx.arc(p[0], p[1], radius, 0, Math.PI*2, true);
      ctx.stroke();
      ctx.fill();
      return p;
    }
  };

  Draw.prototype.controlPoint = function(p, style) {
    with (this) {
      p = Geom.transform(p, scale, translate);
      strokeStyle(style);
      ctx.beginPath();
      ctx.strokeRect(p[0]-radius, p[1]-radius, radius*2, radius*2);
      ctx.stroke();
      return p;
    }
  };

  Draw.prototype.path = function(p, style) {
    var len = p.length, i;
    with (this) {
      p = Geom.transform(p, scale, translate);
      strokeStyle(style);
      ctx.beginPath();
      ctx.moveTo(p[0][0], p[0][1]);
      for (i=1; i<len; i++)
        ctx.lineTo(p[i][0], p[i][1]);
      ctx.stroke();
    }
  }

  exports.get = function(canvas, scale, translate) {
    return new Draw(canvas, scale, translate);
  };

})();
