(function() {

  var radius = 3;

  var Geom = $.require("geometry");
  var Vector = $.require("vector");

  function Draw(canvas, scale, translate) {
    this.canvas     = canvas;
    this.scale      = scale;
    this.translate  = translate;
    this.ctx        = canvas.get()[0].getContext("2d");
  }

  Draw.prototype.strokeStyle = function(n) {
    this.ctx.strokeStyle = this.ctx.fillStyle = 
      (n==1 ? "red" : (n==2 ? "lightgray" : (n==3 ? "orange" : "black")));
  };

  Draw.prototype.point = function(p, style) {
    var style, argv=Array.prototype.slice.call(arguments, 0), len=argv.length,
        i, p;

    if (len > 1 && ! Vector.isPoint(argv[len-1])) {
      style = argv.pop();
      len = argv.length;
    }

    with (this) {
      for (i=0; i<len; i++) {
        p = Geom.transform(argv[i], scale, translate);
        strokeStyle(style);
        ctx.beginPath();
        ctx.arc(p[0], p[1], radius, 0, Math.PI*2, true);
        ctx.stroke();
        ctx.fill();
      }
    }
  };

  Draw.prototype.controlPoint = function(p, style) {
    var style, argv=Array.prototype.slice.call(arguments, 0), len=argv.length,
        i, p;

    if (len > 1 && ! Vector.isPoint(argv[len-1])) {
      style = argv.pop();
      len = argv.length;
    }

    with (this) {
      for (i=0; i<len; i++) {
        p = Geom.transform(argv[i], scale, translate);
        strokeStyle(style);
        ctx.beginPath();
        ctx.strokeRect(p[0]-radius, p[1]-radius, radius*2, radius*2);
        ctx.stroke();
      }
    }
  };

  Draw.prototype.path = function(p, style) {
    var len = p.length, i;
    with (this) {
      ctx.globalCompositeOperation = "destination-over";
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
