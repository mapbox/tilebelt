tilebelt
====

simple tile utilities

function | description
---|---
getGeojson(tile) | get a geojson representation of a tile
getChildren(tile) | get the 4 tiles one zoom level higher
getParent(tile) | get the tile one zoom level lower
getSiblings(tile) | get the 3 sibling tiles for a tile
hasSiblings(tiles, tile) | check to see if an array of tiles contains a tiles siblings
hasTile(tiles, tile) | check to see if an array of tiles contains a particular tile
tilesEqual(tile1, tile2) | check to see if two tiles are the same
getQuadkey(tile) | gets the quadkey for a tile