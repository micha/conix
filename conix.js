
Matrix.prototype.solve = function(m) {
  var m=this.dup().toRightTriangular(), 
      i=m.rows()+1, j=i, k, ret=new Array(i-1);
  while (i--) {
    ret[i-1] = m.e(i,j);
    for (k=i+1; k<j; k++)
      ret[i-1] -= m.e(i,k) * ret[k-1];
    ret[i-1] /= m.e(i,i);
  }
  return $V(ret);
};

function Triangle(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
}

Triangle.prototype.contains = function(p) {
  var A = $M([ this.a.elements, this.b.elements, this.c.elements ]);
  var B = $M([
    [ -1,  1,  0 ],
    [  0, -1,  1 ],
    [  1,  0,  -1]
  ]).multiply(A);
  var n = this.a.cross(this.b);
  var C = $M([
    [ 0, -1*n.e(3), n.e(2) ],
    [ n.e(3), 0, n.e(1) ],
    [ -1*n.e(2), n.e(1), 0]
  ]);
  var D = B.multiply(C);
  //var G = 
};

function Conic(pa, pc, pb, rho) {
  a=pa.elements;
  b=pb.elements;
  c=pc.elements;
  rho=rho.elements ? rho.elements : rho;

  var s;

  if (rho[0] === undefined) {
    var d = [ a[0] + (b[0] - a[0]) / 2, a[1] + (b[1] - a[1]) / 2 ];
    s = [ d[0] + (c[0] - d[0]) * rho, d[1] + (c[1] - d[1]) * rho ];
  } else {
    s = rho;
  }

  this.a = pa;
  this.b = pb;
  this.c = pc;

  // System of linear eqns for solving the coefficients of the conic
  //
  // Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0
  //
  // from points a, b, and s on the curve, and tangents at points a 
  // and b (derived from point c). F is arbitrarily set to 4.0 since
  // conics are uniquely defined by 5 parameters.

  console.log($M([
    [ a[0]*a[0], a[0]*a[1],  a[1]*a[1], a[0], a[1] ],
    [ b[0]*b[0], b[0]*b[1],  b[1]*b[1], b[0], b[1] ],
    [ s[0]*s[0], s[0]*s[1],  s[1]*s[1], s[0], s[1] ],
    [ a[0]*c[0], (a[1]*c[0]+a[0]*c[1])/2, a[1]*c[1], (c[0]+a[0])/2, (c[1]+a[1])/2 ],
    [ b[0]*c[0], (b[1]*c[0]+b[0]*c[1])/2, b[1]*c[1], (c[0]+b[0])/2, (c[1]+b[1])/2 ],
  ]).inspect());
  var eqn = $M([
    [ a[0]*a[0], a[0]*a[1],  a[1]*a[1], a[0], a[1] ],
    [ b[0]*b[0], b[0]*b[1],  b[1]*b[1], b[0], b[1] ],
    [ s[0]*s[0], s[0]*s[1],  s[1]*s[1], s[0], s[1] ],
    [ a[0]*c[0], (a[1]*c[0]+a[0]*c[1])/2, a[1]*c[1], (c[0]+a[0])/2, (c[1]+a[1])/2 ],
    [ b[0]*c[0], (b[1]*c[0]+b[0]*c[1])/2, b[1]*c[1], (c[0]+b[0])/2, (c[1]+b[1])/2 ],
  ]).augment([ 4.0, 4.0, 4.0, 4.0, 4.0 ]).solve();

  var A = eqn.e(1);
  var B = eqn.e(2);
  var C = eqn.e(3);
  var D = eqn.e(4);
  var E = eqn.e(5);
  var F = 4.0;

  this.C = $M([
      [ A,    B/2,  D/2 ],
      [ B/2,  C,    E/2 ],
      [ D/2,  E/2,  F   ]
  ]);

  console.log(this.C.inspect());
}

Conic.prototype.S = function(a, b) {
  var m=$M([ a.elements ]), m2=b||a;
  return m.x(this.C).x(m2);
};

Conic.prototype.contains = function(p) {
  var x=p.elements[0], y=p.elements[1];
  return this.S(p) == Vector.Zero(3);
};

Conic.prototype.intersectionWith = function(l) {
  var p1=l.anchor.dup(), p2=l.anchor.add(l.direction), ret=[];
  p1.elements[2] = p2.elements[2] = 1;
  ret[0] = (-1*this.S(p1,p2) + Math.sqrt(this.S(p1,p2)*this.S(p1,p2) - this.S(p1)*this.S(p2))) / this.S(p2);
  ret[1] = (-1*this.S(p1,p2) - Math.sqrt(this.S(p1,p2)*this.S(p1,p2) - this.S(p1)*this.S(p2))) / this.S(p2);
};

