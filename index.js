// a tile is an array [x,y,z]

var bboxPolygon = require('turf-bbox-polygon');

function getGeoJSON (tile) {
	var bbox = [tile2long(tile[0],tile[2]), tile2lat(tile[1],tile[2]), tile2long(tile[0]+1,tile[2]), tile2lat(tile[1]+1,tile[2])];
	var poly = bboxPolygon(bbox);
	return poly;
}

function tile2long(x,z) {
	return (x/Math.pow(2,z)*360-180);
}
 function tile2lat(y,z) {
	var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
	return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}

function getChildren (tile){
	return [
		[tile[0]*2, tile[1]*2, tile[2]+1],
		[tile[0]*2+1, tile[1]*2, tile[2 ]+1],
		[tile[0]*2+1, tile[1]*2+1, tile[2]+1],
		[tile[0]*2, tile[1]*2+1, tile[2]+1],
	];
}

function getParent (tile){
	// top left
	if(tile[0]%2===0 && tile[1]%2===0){
		return [tile[0]/2, tile[1]/2, tile[2]-1];
	}
	// bottom left
	else if((tile[0]%2===0) && (!tile[1]%2===0)){
		return [tile[0]/2, (tile[1]-1)/2, tile[2]-1];
	}
	// top right
	else if((!tile[0]%2===0) && (tile[1]%2===0)){
		return [(tile[0]-1)/2, (tile[1])/2, tile[2]-1];
	}
	// bottom right
	else {
		return [(tile[0]-1)/2, (tile[1]-1)/2, tile[2]-1];
	}
}

function getSiblings (tile){
	return getChildren(getParent(tile));
}

function hasSiblings (tile, tiles){
	var hasAll = true;
	var siblings = getSiblings(tile);
	siblings.forEach(function(sibling){
		if(!hasTile(tiles, sibling)){
			hasAll = false;
		}
	});
	return hasAll;
}

function hasTile(tiles, tile){
	var tileFound = false;
	tiles.forEach(function(t){
		if(tilesEqual(t, tile)){
			tileFound = true;
		}
	});
	return tileFound;
}

function tilesEqual(tile1, tile2) {
	return (
		tile1[0] === tile2[0] &&
		tile1[1] === tile2[1] &&
		tile1[2] === tile2[2]
	);
}

function getQuadkey(tile){
  var index = '';
  for (var z = tile[2]; z > 0; z--) {
      var b = 0;
      var mask = 1 << (z - 1);
      if ((tile[0] & mask) !== 0) b++;
      if ((tile[1] & mask) !== 0) b += 2;
      index += b.toString();
  }
  return index;
}

function quadkeyToTile(quadkey){
	var x = 0;
	var y = 0;
	var z = quadkey.length;
	for (var i = z; i >0 ; i--) {
		var mask = 1 << (i-1) ;
		var cell =  parseInt(quadkey.substring (z-i,1));
		if ((cell & 1) !== 0)
		{
		    x = x + mask;
		}
		if ((cell & 2) !== 0)
		{
		    y = y + mask;
		}
	}
	return [x, y, z];
}

module.exports = {
	getGeoJSON: getGeoJSON,
	getChildren: getChildren,
	getParent: getParent,
	getSiblings: getSiblings,
	hasTile: hasTile,
	hasSiblings: hasSiblings,
	tilesEqual: tilesEqual,
	getQuadkey: getQuadkey,
	quadkeyToTile: quadkeyToTile
};