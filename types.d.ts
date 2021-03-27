declare module '@mapbox/tilebelt' {
    import { BBox, Geometry } from "geojson";

    export type Tile = [number, number, number]; // [x, y, z]

    /** get a geojson representation of a tile */
    export function tileToGeoJSON(tile: Tile): Geometry;

    /** get the bbox of a tile */
    export function tileToBBOX(time: Tile): BBox;

    /** get the smallest tile to cover a bbox */
    export function bboxToTile(bbox: BBox): Tile;

    /** get the 4 tiles one zoom level higher */
    export function getChildren(tile: Tile): Tile[];

    /** get the tile one zoom level lower */
    export function getParent(tile: Tile): Tile;

    /** get the 3 sibling tiles for a tile */
    export function getSiblings(tile: Tile): Tile[];

    /** check to see if an array of tiles contains a tiles siblings */
    export function hasSiblings(tiles: Tile[], tile: Tile): boolean;

    /** check to see if an array of tiles contains a particular tile */
    export function hasTile(tiles: Tile[], tile: Tile): boolean;

    /** check to see if two tiles are the same */
    export function tilesEqual(tile1: Tile, tile2: Tile): boolean;

    /** get the quadkey for a tile */
    export function tileToQuadkey(tile: Tile): string;

    /** get the tile for a quadkey */
    export function quadkeyToTile(quadkey: string): Tile;

    /** get the tile for a point at a specified zoom level */
    export function pointToTile(lon: number, lat: number, zoom: number): Tile;

    /** get the precise fractional tile location for a point at a zoom level */
    export function pointToTileFraction(lon: number, lat: number, zoom: number): Tile;
}
