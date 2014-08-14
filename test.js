var test = require('tape'),
    tilebelt = require('./');

var tile1 = [5,10,10];
var tile2 = [100,50,8];

test('tile to geojson', function(t){
    var geojson = tilebelt.getGeoJSON(tile1);
    t.ok(geojson, 'get geojson representation of tile');
    t.equal(geojson.geometry.type, 'Polygon');
    t.end();
});

test('get parent', function(t){
    var parent = tilebelt.getParent(tile1);
    t.ok(parent);
    t.equal(parent.length, 3);
    t.equal(parent[0], 2);
    t.equal(parent[1], 5);
    t.equal(parent[2], 9);
    t.end();
});

test('get siblings', function(t){
    var siblings = tilebelt.getSiblings(t);
    t.ok(siblings);
    t.equal(siblings.length, 4);
    t.equal(siblings[0].length, 3);
    t.end();
});

test('has siblings', function(t){
    t.fail('not implmented');
    t.end();
});

test('has tile', function(t){
    t.fail('not implmented');
    t.end();
});

test('get quadkey', function(t){
    t.fail('not implmented');
    t.end();
});

test('quadkey to tile', function(t){
    t.fail('not implmented');
    t.end();
});

test('point to tile', function(t){
    t.fail('not implmented');
    t.end();
});