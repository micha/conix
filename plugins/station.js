(function() {

  var Path  = $.require("path");
  var Conic = $.require("conic");

  function Station(beam, draft, sheer, deck) {
    this.conics = [];

    var hb = beam/2;

    this.conics.push(Conic.get([0,draft], [hb,draft], [hb,0], 0.5));
    this.conics.push(Conic.get([hb,0], [hb+0.01,-sheer/2], [hb,-sheer], 0.1));
    window.C = this.conics;
    console.log(this.conics);
  }

  Station.prototype.path = function() {
    var len=this.conics.length, ret, c, i, j;
    ret = Path.clone(this.conics[0]);
    for (i=1; i<len; i++) {
      c = Path.clone(this.conics[i]);
      c.shift();
      for (j=0; j<c.length; j++)
        ret.push(c[j]);
    }
    return ret;
  };

  exports.get = function(beam, draft, sheer, deck) {
    return new Station(beam, draft, sheer, deck);
  };

})();
