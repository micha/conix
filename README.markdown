# Conix

Conix is a prototype web-based hull design CAD application to run in the
browser. The 3-D hull model is a surface generated from stations and
waterlines that form a mesh of control points on the surface that are
connected by conic section curves. The papersapce representation is
currently rendered in `<canvas>`.

### Planned Core Features

1. Create and edit hull surface.

2. Flexible JS plugin interface (load plugins by uploading JS libraries to
   the server or as bookmarklets in the browser).

3. GitHub style backend that would expose an HTTP interface to git where the
   hull design would be saved and revisioned.

4. Database to index hull designs and enable powerful queries on metadata
   associated with the hulls (see the plugins section).

### Planned Basic Plugins

Add metadata associated with the hull, to be indexed and searched in the
hullform database.

1. Hydrostatics

2. Stability

3. Assorted VPP (performance prediction algorithms for various sailing types)

### Why

This section coming soon.

### Progress so far...

The conic section code is working, need to implement modelspace to paperspace
transformations, surface editing, plugin architecture, etc.

![Screenshot - progress so far...](http://github.com/micha/conix/raw/master/screenshot.png "Screenshot - progress so far...")

### Install

1. Get [golf](http://github.com/golf/golf) source and build it:

    `ant install`

3. Clone this git repo and from the repo directory do:

    `golf .`

4. Done.

You should be able to point your browser at [http://example.com:4653/conix/](http://example.com:4653/conix/). (Replace example.com with the real hostname,
obviously.)  
