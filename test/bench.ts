// @ts-ignore
import Benchmark from 'benchmarkify';
import * as tilebelt from '../src';

const tile1: tilebelt.Tile = [5, 10, 10];
const tile2: tilebelt.Tile = [558004, 363898, 20];
const quadkey1 = tilebelt.tileToQuadkey(tile1);
const quadkey2 = tilebelt.tileToQuadkey(tile2);
const bbox1 = tilebelt.tileToBBOX(tile1);
const bbox2 = tilebelt.tileToBBOX(tile2);

const bench = new Benchmark('tilebelt');
bench
  .createSuite('tilebelt', { time: 1000 })
  .add('tileToGeoJSON#tile1', () => {
    tilebelt.tileToGeoJSON(tile1);
  })
  .add('tileToGeoJSON#tile2', () => {
    tilebelt.tileToGeoJSON(tile2);
  })
  .add('tileToBBOX#tile1', () => {
    tilebelt.tileToBBOX(tile1);
  })
  .add('tileToBBOX#tile2', () => {
    tilebelt.tileToBBOX(tile2);
  })
  .add('getParent#tile1', () => {
    tilebelt.getParent(tile1);
  })
  .add('getParent#tile2', () => {
    tilebelt.getParent(tile2);
  })
  .add('getSiblings#tile1', () => {
    tilebelt.getSiblings(tile1);
  })
  .add('getSiblings#tile2', () => {
    tilebelt.getSiblings(tile2);
  })
  .add('tileToQuadkey#tile1', () => {
    tilebelt.tileToQuadkey(tile1);
  })
  .add('tileToQuadkey#tile2', () => {
    tilebelt.tileToQuadkey(tile2);
  })
  .add('pointToTile#z10', () => {
    tilebelt.pointToTile(0, 0, 10);
  })
  .add('pointToTile#z20', () => {
    tilebelt.pointToTile(1, 1, 20);
  })
  .add('quadkeyToTile#quadkey1', () => {
    tilebelt.quadkeyToTile(quadkey1);
  })
  .add('quadkeyToTile#quadkey2', () => {
    tilebelt.quadkeyToTile(quadkey2);
  })
  .add('bboxToTile#bbox1', () => {
    tilebelt.bboxToTile(bbox1);
  })
  .add('bboxToTile#bbox2', () => {
    tilebelt.bboxToTile(bbox2);
  })
  .add('pointToTileFraction#tile1', () => {
    tilebelt.pointToTileFraction(30.5, 50.5, 15);
  })
  .add('pointToTileFraction#tile2', () => {
    tilebelt.pointToTileFraction(558004.8, 363898.8, 20);
  });

bench.run();
