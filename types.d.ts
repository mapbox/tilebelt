declare module '@mapbox/tilebelt' {
    import { BBox, FeatureCollection, Geometry } from "geojson";

    export type Tile = [number, number, number]; // [x, y, z]

    /**
     * Get the bbox of a tile
     *
     * @name tileToBBOX
     * @param {Array<number>} tile
     * @returns {Array<number>} bbox
     * @example
     * var bbox = tileToBBOX([5, 10, 10])
     * //=bbox
     */
    export function tileToBBOX(time: Tile): BBox;

    /**
     * Get a geojson representation of a tile
     *
     * @name tileToGeoJSON
     * @param {Array<number>} tile
     * @returns {Feature<Polygon>}
     * @example
     * var poly = tileToGeoJSON([5, 10, 10])
     * //=poly
     */
    export function tileToGeoJSON(tile: Tile): Geometry;

    /**
     * Get the tile for a point at a specified zoom level
     *
     * @name pointToTile
     * @param {number} lon
     * @param {number} lat
     * @param {number} z
     * @returns {Array<number>} tile
     * @example
     * var tile = pointToTile(1, 1, 20)
     * //=tile
     */
    export function pointToTile(lon: number, lat: number, zoom: number): Tile;

    /**
     * Get the 4 tiles one zoom level higher
     *
     * @name getChildren
     * @param {Array<number>} tile
     * @returns {Array<Array<number>>} tiles
     * @example
     * var tiles = getChildren([5, 10, 10])
     * //=tiles
     */
    export function getChildren(tile: Tile): Tile[];

    /**
     * Get the tile one zoom level lower
     *
     * @name getParent
     * @param {Array<number>} tile
     * @returns {Array<number>} tile
     * @example
     * var tile = getParent([5, 10, 10])
     * //=tile
     */
    export function getParent(tile: Tile): Tile;

    /**
     * Get the 3 sibling tiles for a tile
     *
     * @name getSiblings
     * @param {Array<number>} tile
     * @returns {Array<Array<number>>} tiles
     * @example
     * var tiles = getSiblings([5, 10, 10])
     * //=tiles
     */
    export function hasSiblings(tiles: Tile[], tile: Tile): boolean;

    /** get the 3 sibling tiles for a tile */
    export function getSiblings(tile: Tile): Tile[];

    /**
     * Check to see if an array of tiles contains a particular tile
     *
     * @name hasTile
     * @param {Array<Array<number>>} tiles
     * @param {Array<number>} tile
     * @returns {boolean}
     * @example
     * var tiles = [
     *     [0, 0, 5],
     *     [0, 1, 5],
     *     [1, 1, 5],
     *     [1, 0, 5]
     * ]
     * hasTile(tiles, [0, 0, 5])
     * //=boolean
     */
    export function hasTile(tiles: Tile[], tile: Tile): boolean;

    /**
     * Check to see if two tiles are the same
     *
     * @name tilesEqual
     * @param {Array<number>} tile1
     * @param {Array<number>} tile2
     * @returns {boolean}
     * @example
     * tilesEqual([0, 1, 5], [0, 0, 5])
     * //=boolean
     */    
    export function tilesEqual(tile1: Tile, tile2: Tile): boolean;

    /**
     * Get the quadkey for a tile
     *
     * @name tileToQuadkey
     * @param {Array<number>} tile
     * @returns {string} quadkey
     * @example
     * var quadkey = tileToQuadkey([0, 1, 5])
     * //=quadkey
     */    
    export function tileToQuadkey(tile: Tile): string;

    /**
     * Get the tile for a quadkey
     *
     * @name quadkeyToTile
     * @param {string} quadkey
     * @returns {Array<number>} tile
     * @example
     * var tile = quadkeyToTile('00001033')
     * //=tile
     */    
    export function quadkeyToTile(quadkey: string): Tile;

    /**
     * Get the smallest tile to cover a bbox
     *
     * @name bboxToTile
     * @param {Array<number>} bbox
     * @returns {Array<number>} tile
     * @example
     * var tile = bboxToTile([ -178, 84, -177, 85 ])
     * //=tile
     */
    export function bboxToTile(bbox: BBox): Tile;

    /**
     * Get the precise fractional tile location for a point at a zoom level
     *
     * @name pointToTileFraction
     * @param {number} lon
     * @param {number} lat
     * @param {number} z
     * @returns {Array<number>} tile fraction
     * var tile = pointToTileFraction(30.5, 50.5, 15)
     * //=tile
     */
    export function pointToTileFraction(lon: number, lat: number, zoom: number): Tile;

    /**
     * Get the 8 neighbors surrounding a tile
     *
     * @name getNeighbors
     * @param {Array<number>} tile
     * @returns {Array<Array<number>>} tiles
     * var tiles = getNeighbors([5, 10, 10])
     * //=tiles
     */
    export function getNeighbors(tile: Tile): Tile[]

    /**
     * Generates the GeoJSON FeatureCollection from an array or tiles
     *
     * @name tilesToFeatureCollection
     * @param {Array<Array<number>>} tiles
     * @returns {FeatureCollection} featureCollection
     * var tiles = [
     *     [0, 0, 5],
     *     [0, 1, 5],
     *     [1, 1, 5],
     *     [1, 0, 5]
     * ]
     * var featureCollection = tilesToFeatureCollection(tiles)
     * //=featureCollection
     */
    export function tilesToFeatureCollection(tiles: Tile[]): FeatureCollection
}
