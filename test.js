var test = require('tape'),
    tile = require('./');

var tile1 = [5,10,10]
var tile2 = [100,50,8]

test('tile to geojson', function(t){
  var geojson = tile.tileToGeojson(tile1);
  t.ok(geojson, 'get geojson representation of tile');
  t.equal(geojson.geometry.type, 'Polygon');
  t.end();
});

test('get parent', function(t){
  t.fail('not implmented');
  t.end();
});

test('get siblings', function(t){
  t.fail('not implmented');
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