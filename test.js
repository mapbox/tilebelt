var test = require('tape'),
    tilebelt = require('./');

var tile1 = [5,10,10];
var tile2 = [100,50,8];

test('tile to geojson', function(t) {
    var geojson = tilebelt.tileToGeoJSON(tile1);
    t.ok(geojson, 'get geojson representation of tile');
    t.equal(geojson.geometry.type, 'Polygon');
    t.end();
});

test('get parent', function(t) {
    var parent = tilebelt.getParent(tile1);
    t.ok(parent);
    t.equal(parent.length, 3);
    t.equal(parent[0], 2);
    t.equal(parent[1], 5);
    t.equal(parent[2], 9);
    t.end();
});

test('get siblings', function(t) {
    var siblings = tilebelt.getSiblings(t);
    t.ok(siblings);
    t.equal(siblings.length, 4);
    t.equal(siblings[0].length, 3);
    t.end();
});

test('has siblings', function(t) {
    var tiles1 = [
        [0,0,5],
        [0,1,5],
        [1,1,5],
        [1,0,5]
    ];
    var tiles2 = [
        [0,0,5],
        [0,1,5],
        [1,1,5]
    ];

    t.equals(tilebelt.hasSiblings([0,0,5], tiles1), true);
    t.equals(tilebelt.hasSiblings([0,1,5], tiles1), true);
    t.equals(tilebelt.hasSiblings([0,0,5], tiles2), false);
    t.equals(tilebelt.hasSiblings([0,0,5], tiles2), false);
    t.end();
});

test('has tile', function(t) {
    var tiles1 = [
        [0,0,5],
        [0,1,5],
        [1,1,5],
        [1,0,5]
    ];

    t.equals(tilebelt.hasSiblings([2,0,5], tiles1), false);
    t.equals(tilebelt.hasSiblings([0,1,5], tiles1), true);
    t.end();
});

test('get quadkey', function(t) {
    var key = tilebelt.tileToQuadkey([11,3,8]);
    t.equal(key, '00001033');
    t.end();
});

test('quadkey to tile', function(t) {
    var quadkey = '00001033';
    var tile = tilebelt.quadkeyToTile(quadkey);
    t.equal(tile.length, 3);
    t.end();
});

test('point to tile', function(t) {
    var tile = tilebelt.pointToTile(0,0,10);
    t.equal(tile.length, 3);
    t.equal(tile[2], 10);
    t.end();
});

test('point to tile verified', function(t) {
    var tile = tilebelt.pointToTile(-77.03239381313323,38.91326516559442,10);
    t.equal(tile.length, 3);
    t.equal(tile[0], 292);
    t.equal(tile[1], 391);
    t.equal(tile[2], 10);
    t.equal(tilebelt.tileToQuadkey(tile), '0320100322')
    t.end();
});

test('point and tile back and forth', function(t) {
    var tile = tilebelt.pointToTile(10,10,10);
    t.equal(tile.toString(), tilebelt.quadkeyToTile(tilebelt.tileToQuadkey(tile)).toString());
    t.end();
});

test('check key 03', function(t) {
    var quadkey = '03';
    t.equal(tilebelt.quadkeyToTile(quadkey).toString(), [1,1,2].toString());
    t.end();
});

test('bbox to tile', function(t) {
    var bbox =  [-84.72656249999999,
              11.178401873711785
              ,-5.625,
              61.60639637138628];
    var tile = tilebelt.bboxToTile(bbox)
    t.ok(tile, 'convert bbox to tile');
    t.equal(tile[0], 1);
    t.equal(tile[1], 1);
    t.equal(tile[2], 2);
    t.end();

})