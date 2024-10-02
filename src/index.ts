const d2r = Math.PI / 180;
const r2d = 180 / Math.PI;

export type Tile = [number, number, number];
export type BBox = [number, number, number, number];
export interface Geometry {
  type:
    | 'Point'
    | 'LineString'
    | 'Polygon'
    | 'MultiPoint'
    | 'MultiLineString'
    | 'MultiPolygon';
  coordinates: number[][][];
}

function tile2lon(x: number, z: number): number {
  return (x / Math.pow(2, z)) * 360 - 180;
}

function tile2lat(y: number, z: number): number {
  const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
  return r2d * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}

/**
 * Get the bbox of a tile
 *
 * const bbox = tileToBBOX([5, 10, 10])
 * //=bbox
 */
export function tileToBBOX(tile: Tile): BBox {
  const e = tile2lon(tile[0] + 1, tile[2]);
  const w = tile2lon(tile[0], tile[2]);
  const s = tile2lat(tile[1] + 1, tile[2]);
  const n = tile2lat(tile[1], tile[2]);
  return [w, s, e, n];
}

/**
 * Get a geojson representation of a tile
 *
 * const poly = tileToGeoJSON([5, 10, 10])
 * //=poly
 */
export function tileToGeoJSON(tile: Tile): Geometry {
  const bbox = tileToBBOX(tile);
  return {
    type: 'Polygon',
    coordinates: [
      [
        [bbox[0], bbox[3]],
        [bbox[0], bbox[1]],
        [bbox[2], bbox[1]],
        [bbox[2], bbox[3]],
        [bbox[0], bbox[3]],
      ],
    ],
  };
}

/**
 * Get the tile for a point at a specified zoom level
 *
 * const tile = pointToTile(1, 1, 20)
 * //=tile
 */
export function pointToTile(lon: number, lat: number, z: number): Tile {
  const tile = pointToTileFraction(lon, lat, z);
  tile[0] = Math.floor(tile[0]);
  tile[1] = Math.floor(tile[1]);
  return tile;
}

/**
 * Get the precise fractional tile location for a point at a zoom level
 *
 * const tile = pointToTileFraction(30.5, 50.5, 15)
 * //=tile
 */
export function pointToTileFraction(lon: number, lat: number, z: number): Tile {
  const sin = Math.sin(lat * d2r);
  const z2 = Math.pow(2, z);
  let x = z2 * (lon / 360 + 0.5);
  const y = z2 * (0.5 - (0.25 * Math.log((1 + sin) / (1 - sin))) / Math.PI);

  // Wrap Tile X
  x = x % z2;
  if (x < 0) x = x + z2;
  return [x, y, z];
}

/**
 * Get the 4 tiles one zoom level higher
 *
 * const tiles = getChildren([5, 10, 10])
 * //=tiles
 */
export function getChildren(tile: Tile): Tile[] {
  return [
    [tile[0] * 2, tile[1] * 2, tile[2] + 1],
    [tile[0] * 2 + 1, tile[1] * 2, tile[2] + 1],
    [tile[0] * 2 + 1, tile[1] * 2 + 1, tile[2] + 1],
    [tile[0] * 2, tile[1] * 2 + 1, tile[2] + 1],
  ];
}

/**
 * Get the tile one zoom level lower
 *
 * const tile = getParent([5, 10, 10])
 * //=tile
 */
export function getParent(tile: Tile): Tile {
  return [tile[0] >> 1, tile[1] >> 1, tile[2] - 1];
}

export function getSiblings(tile: Tile): Tile[] {
  return getChildren(getParent(tile));
}

/**
 * Get the 3 sibling tiles for a tile
 *
 * const tiles = getSiblings([5, 10, 10])
 * //=boolean
 */
export function hasSiblings(tile: Tile, tiles: Tile[]): boolean {
  const siblings = getSiblings(tile);
  for (let i = 0; i < siblings.length; i++) {
    if (!hasTile(tiles, siblings[i])) return false;
  }
  return true;
}

/**
 * Check to see if an array of tiles contains a particular tile
 *
 * const tiles = [
 *     [0, 0, 5],
 *     [0, 1, 5],
 *     [1, 1, 5],
 *     [1, 0, 5]
 * ]
 * hasTile(tiles, [0, 0, 5])
 * //=boolean
 */
export function hasTile(tiles: Tile[], tile: Tile): boolean {
  for (let i = 0; i < tiles.length; i++) {
    if (tilesEqual(tiles[i], tile)) return true;
  }
  return false;
}

/**
 * Check to see if two tiles are the same
 *
 * tilesEqual([0, 1, 5], [0, 0, 5])
 * //=boolean
 */
export function tilesEqual(tile1: Tile, tile2: Tile): boolean {
  return (
    tile1[0] === tile2[0] && tile1[1] === tile2[1] && tile1[2] === tile2[2]
  );
}

/**
 * Get the quadkey for a tile
 *
 * const quadkey = tileToQuadkey([0, 1, 5])
 * //=quadkey
 */
export function tileToQuadkey(tile: Tile): string {
  let index = '';
  for (let z = tile[2]; z > 0; z--) {
    let b = 0;
    const mask = 1 << (z - 1);
    if ((tile[0] & mask) !== 0) b++;
    if ((tile[1] & mask) !== 0) b += 2;
    index += b.toString();
  }
  return index;
}

/**
 * Get the tile for a quadkey
 *
 * const tile = quadkeyToTile('00001033')
 * //=tile
 */
export function quadkeyToTile(quadkey: string): Tile {
  let x = 0;
  let y = 0;
  const z = quadkey.length;

  for (let i = z; i > 0; i--) {
    const mask = 1 << (i - 1);
    const q = +quadkey[z - i];
    if (q === 1) x |= mask;
    if (q === 2) y |= mask;
    if (q === 3) {
      x |= mask;
      y |= mask;
    }
  }
  return [x, y, z];
}

function getBboxZoom(bbox: BBox): number {
  const MAX_ZOOM = 28;
  for (let z = 0; z < MAX_ZOOM; z++) {
    const mask = 1 << (32 - (z + 1));
    if (
      (bbox[0] & mask) !== (bbox[2] & mask) ||
      (bbox[1] & mask) !== (bbox[3] & mask)
    ) {
      return z;
    }
  }

  return MAX_ZOOM;
}

/**
 * Get the smallest tile to cover a bbox
 *
 * const tile = bboxToTile([ -178, 84, -177, 85 ])
 * //=tile
 */
export function bboxToTile(bboxCoords: BBox): Tile {
  const min = pointToTile(bboxCoords[0], bboxCoords[1], 32);
  const max = pointToTile(bboxCoords[2], bboxCoords[3], 32);
  const bbox: BBox = [min[0], min[1], max[0], max[1]];

  const z = getBboxZoom(bbox);
  if (z === 0) return [0, 0, 0];
  const x = bbox[0] >>> (32 - z);
  const y = bbox[1] >>> (32 - z);
  return [x, y, z];
}
