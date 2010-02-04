
// Solve the system of linear equations corresponding to the augmented 
// matrix m. This adds onto the sylvester.js Matrix object prototype.
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

// Solve linear equations. Arguments are the coefficients of the equation
// Ax + B = 0.
Math.solveLinear = function(a, b) {
  return -(b/a);
};

// Solve quadratic equations. Arguments are the coefficients of the equation
// Ax^2 + Bx + C = 0.
Math.solveQuadratic = function(a, b, c) {
  var d = b*b - 4*a*c;
  return [ (-b + Math.sqrt(d)) / (2*a), (-b - Math.sqrt(d)) / (2*a) ];
};

// A 2d triangle.
function Triangle(a, b, c) {
  this.a = a.to3D();
  this.b = b.to3D();
  this.c = c.to3D();
  this.M = $M([ this.a.elements, this.b.elements, this.c.elements ]);
}

// Is the point p inside the bounds of the triangle?
Triangle.prototype.contains = function(p) {
  // Triangle's matrix representation.
  var A = this.M;

  // Edge vectors: lines AB, BC, and CA.
  var B = $M([
    [ -1,  1,  0 ],
    [  0, -1,  1 ],
    [  1,  0,  -1]
  ]).multiply(A);

  // Vector normal to the triangle's plane.
  var zero = Vector.Zero(3);
  var n = 
    (this.a.eql(zero)
      ? this.b.cross(this.c)
      : this.a.cross(this.b.eql(zero) ? this.c : this.a));

  console.log(this.a.inspect());
  console.log(this.b.inspect());
  console.log(this.c.inspect());
  console.log(n.inspect());

  // Cross matrix such that p*C = p cross n for all vectors p.
  var C = $M([
    [ 0, -1*n.e(3), n.e(2) ],
    [ n.e(3), 0, n.e(1) ],
    [ -1*n.e(2), n.e(1), 0]
  ]);

  // Edge normal vectors, coplanar with triangle such that C[i] dot B[i] = 0.
  var D = B.multiply(C);

  // Translate to edge vector origin after computing projection.
  var G = $M([
    [ D.e(1,1), D.e(1,2), D.e(1,3), -(A.row(1).dot(D.row(1))) ],
    [ D.e(2,1), D.e(2,2), D.e(2,3), -(A.row(2).dot(D.row(2))) ],
    [ D.e(3,1), D.e(3,2), D.e(3,3), -(A.row(3).dot(D.row(3))) ],
    [ 0,        0,        0,        1                         ]
  ]);

  // Homogenous coordinates.
  var hom = p.to3D().elements;
  hom.push(1);
  hom = $V(hom);
  
  var res = G.multiply(hom);

  return Math.abs(res.e(1)+res.e(2)+res.e(3)) 
    == Math.abs(res.e(1))+Math.abs(res.e(2))+Math.abs(res.e(3));
};

// A 2d conic section.
function Conic(va, vc, vb, rho) {
  // The points a, b, and c. Use arrays for brevity.
  a=va.elements;
  b=vb.elements;
  c=vc.elements;

  // Midpoint of line AB.
  var d = [ a[0] + (b[0] - a[0]) / 2, a[1] + (b[1] - a[1]) / 2 ];
  
  // The point S is the intersection of the curve and the line CD. Rho is
  // either this point (as a Vector) or a number, 0<rho<1, that locates the
  // intersection of the curve and the line such that |DS| = rho * |DC|.
  //
  // rho > 0.5 => hyperbola
  // rho = 0.5 => parabola
  // rho < 0.5 => ellipse
  // rho = 0.4142 and |AC| = |BC| => circle
  var s = rho.elements === undefined
    ? [ d[0] + (c[0] - d[0]) * rho, d[1] + (c[1] - d[1]) * rho ] : rho.elements;

  // Store the "envelope" points.
  this.a = va;
  this.b = vb;
  this.c = vc;

  // Store the envelope triangle.
  this.boundingTriangle = new Triangle(va, vc, vb);

  // System of linear eqns for solving the coefficients of the conic
  //
  // Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0
  //
  // from points a, b, and s on the curve, and tangents at points a 
  // and b (derived from point c). F is arbitrarily set to 4.0 since
  // conics are uniquely defined by 5 parameters.
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

  // The matrix representation of the conic.
  this.C = $M([
      [ A,    B/2,  D/2 ],
      [ B/2,  C,    E/2 ],
      [ D/2,  E/2,  F   ]
  ]);

  console.log(this.C.inspect());
}

// Homogenous quadratic equation associated with the conic. The curve is
// defined as the locus of points m such that S(m) = 0.
Conic.prototype.S = function(a, b) {
  var m=$M([ a.elements ]), m2=b||a;
  return m.x(this.C).x(m2);
};

// Is the point p part of the curve?
Conic.prototype.contains = function(p) {
  var x=p.elements[0], y=p.elements[1];
  return this.S(p) == Vector.Zero(3) && this.boundingTriangle.contains(p);
};

// Get the point at which the conic intersects the line l.
Conic.prototype.intersectionWith = function(l) {
  var p1=l.anchor.dup(), p2=l.anchor.add(l.direction), ret=[];
  p1.elements[2] = p2.elements[2] = 1;

  ret = Math.solveQuadratic(this.S(p2), 2*this.s(p1,p2), this.S(p1));
};

