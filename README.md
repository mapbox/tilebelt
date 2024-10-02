# tilebelt

[![Run tests](https://github.com/mapbox/tilebelt/actions/workflows/test.yml/badge.svg)](https://github.com/mapbox/tilebelt/actions/workflows/test.yml)

simple [tile](http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames) utilities

## install

```bash
npm install @mapbox/tilebelt
```

## usage

```js
import * as tilebelt from '@mapbox/tilebelt';

const tile = [10, 15, 8] // x,y,z

tilebelt.tileToGeoJSON(tile);
// {
//   "type": "Polygon",
//   "coordinates": [
//     [
//       [ -165.9375, 82.8533822917608 ],
//       [ -165.9375, 82.67628497834903 ],
//       [ -164.53125, 82.67628497834903 ],
//       [ -164.53125, 82.8533822917608 ],
//       [ -165.9375, 82.8533822917608 ]
//     ]
//   ]
// }

tilebelt.getParent(tile);
// [ 5, 7, 7 ]
```

## features

function | description
---|---
`tileToGeoJSON(tile)` | get a geojson representation of a tile
`tileToBBOX(tile)` | get the bbox of a tile
`bboxToTile(bbox)` | get the smallest tile to cover a bbox
`getChildren(tile)` | get the 4 tiles one zoom level higher
`getParent(tile)` | get the tile one zoom level lower
`getSiblings(tile)` | get the 3 sibling tiles for a tile
`hasSiblings(tiles, tile)` | check to see if an array of tiles contains a tiles siblings
`hasTile(tiles, tile)` | check to see if an array of tiles contains a particular tile
`tilesEqual(tile1, tile2)` | check to see if two tiles are the same
`tileToQuadkey(tile)` | get the quadkey for a tile
`quadkeyToTile(quadkey)` | get the tile for a quadkey
`pointToTile(lon, lat, zoom)` | get the tile for a point at a specified zoom level
`pointToTileFraction(lon, lat, zoom)` | get the precise fractional tile location for a point at a zoom level

## developing

```sh
npm ci          # install deps
npm test        # tests
npm run bench   # run benchmarks
npm run format  # format using prettier
```
