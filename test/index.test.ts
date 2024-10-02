import { test, expect } from 'vitest';
import * as tilebelt from '../src';

const tile1: tilebelt.Tile = [5, 10, 10];

test('tileToGeoJSON', () => {
  const geojson = tilebelt.tileToGeoJSON(tile1);
  expect(geojson).toStrictEqual({
    type: 'Polygon',
    coordinates: [
      [
        [-178.2421875, 84.73838712095339],
        [-178.2421875, 84.7060489350415],
        [-177.890625, 84.7060489350415],
        [-177.890625, 84.73838712095339],
        [-178.2421875, 84.73838712095339],
      ],
    ],
  });
});

test('tileToBBOX', () => {
  const ext = tilebelt.tileToBBOX(tile1);
  expect(ext).toStrictEqual([
    -178.2421875, 84.7060489350415, -177.890625, 84.73838712095339,
  ]);
});

test('getParent', () => {
  const parent = tilebelt.getParent(tile1);
  expect(parent).toStrictEqual([2, 5, 9]);
  console.log(tilebelt.getParent([10, 15, 8]))
});

test('getSiblings', () => {
  const siblings = tilebelt.getSiblings(tile1);
  expect(siblings).toStrictEqual([
    [4, 10, 10],
    [5, 10, 10],
    [5, 11, 10],
    [4, 11, 10],
  ]);
});

test('hasSiblings', () => {
  const tiles1: tilebelt.Tile[] = [
    [0, 0, 5],
    [0, 1, 5],
    [1, 1, 5],
    [1, 0, 5],
  ];
  const tiles2: tilebelt.Tile[] = [
    [0, 0, 5],
    [0, 1, 5],
    [1, 1, 5],
  ];

  expect(tilebelt.hasSiblings([0, 0, 5], tiles1)).toBeTruthy();
  expect(tilebelt.hasSiblings([0, 1, 5], tiles1)).toBeTruthy();
  expect(tilebelt.hasSiblings([0, 0, 5], tiles2)).toBeFalsy();
  expect(tilebelt.hasSiblings([0, 1, 5], tiles2)).toBeFalsy();
});

test('hasTile', () => {
  const tiles1: tilebelt.Tile[] = [
    [0, 0, 5],
    [0, 1, 5],
    [1, 1, 5],
    [1, 0, 5],
  ];

  expect(tilebelt.hasTile(tiles1, [0, 0, 5])).toBeTruthy();
  expect(tilebelt.hasTile(tiles1, [2, 0, 5])).toBeFalsy();
});

test('tileToQuadkey', () => {
  const key = tilebelt.tileToQuadkey([11, 3, 8]);
  expect(key).toEqual('00001033');
});

test('quadkeyToTile', () => {
  const quadkey = '00001033';
  const tile = tilebelt.quadkeyToTile(quadkey);
  expect(tile).toStrictEqual([11, 3, 8]);
});

test('pointToTile', () => {
  const tile = tilebelt.pointToTile(0, 0, 10);
  expect(tile).toStrictEqual([512, 512, 10]);
});

test('pointToTile verified', () => {
  const tile = tilebelt.pointToTile(-77.03239381313323, 38.91326516559442, 10);
  expect(tile).toStrictEqual([292, 391, 10]);
  expect(tilebelt.tileToQuadkey(tile)).toEqual('0320100322');
});

test('pointToTile back and forth', () => {
  const tile = tilebelt.pointToTile(10, 10, 10);
  expect(tile.toString()).toEqual(
    tilebelt.quadkeyToTile(tilebelt.tileToQuadkey(tile)).toString(),
  );
});

test('quadkeyToTile check key 03', () => {
  const quadkey = '03';
  expect(tilebelt.quadkeyToTile(quadkey)).toStrictEqual([1, 1, 2]);
});

test('bboxToTile -- big', () => {
  const bbox: tilebelt.BBox = [
    -84.72656249999999, 11.178401873711785, -5.625, 61.60639637138628,
  ];
  const tile = tilebelt.bboxToTile(bbox);
  expect(tile).toStrictEqual([1, 1, 2]);
});

test('bboxToTile -- no area', () => {
  const bbox: tilebelt.BBox = [-84, 11, -84, 11];
  const tile = tilebelt.bboxToTile(bbox);
  expect(tile).toStrictEqual([71582788, 125964677, 28]);
});

test('bboxToTile -- dc', () => {
  const bbox: tilebelt.BBox = [
    -77.04615354537964, 38.899967510782346, -77.03664779663086,
    38.90728142481329,
  ];
  const tile = tilebelt.bboxToTile(bbox);
  expect(tile).toStrictEqual([9371, 12534, 15]);
});

test('bboxToTile -- crossing 0 lat/lng', () => {
  const bbox: tilebelt.BBox = [-10, -10, 10, 10];
  const tile = tilebelt.bboxToTile(bbox);
  expect(tile).toStrictEqual([0, 0, 0]);
});

test('tileToBBOX -- verify bbox order', () => {
  const bbox1 = tilebelt.tileToBBOX([13, 11, 5]);
  expect(bbox1[0]).toBeLessThan(bbox1[2]);
  expect(bbox1[1]).toBeLessThan(bbox1[3]);

  const bbox2 = tilebelt.tileToBBOX([20, 11, 5]);
  expect(bbox2[0]).toBeLessThan(bbox2[2]);
  expect(bbox2[1]).toBeLessThan(bbox2[3]);

  const bbox3 = tilebelt.tileToBBOX([143, 121, 8]);
  expect(bbox3[0]).toBeLessThan(bbox3[2]);
  expect(bbox3[1]).toBeLessThan(bbox3[3]);

  const bbox4 = tilebelt.tileToBBOX([999, 1000, 17]);
  expect(bbox4[0]).toBeLessThan(bbox4[2]);
  expect(bbox4[1]).toBeLessThan(bbox4[3]);
});

test('pointToTileFraction', () => {
  const tile = tilebelt.pointToTileFraction(
    -95.93965530395508,
    41.26000108568697,
    9,
  );
  expect(tile).toStrictEqual([119.552490234375, 191.47119140625, 9]);
});

test('pointToTile -- cross meridian', () => {
  // X axis
  // https://github.com/mapbox/tile-cover/issues/75
  // https://github.com/mapbox/tilebelt/pull/32
  expect(tilebelt.pointToTile(-180, 0, 0)).toStrictEqual([0, 0, 0]);
  expect(tilebelt.pointToTile(-180, 85, 2)).toStrictEqual([0, 0, 2]);
  expect(tilebelt.pointToTile(180, 85, 2)).toStrictEqual([0, 0, 2]);
  expect(tilebelt.pointToTile(-185, 85, 2)).toStrictEqual([3, 0, 2]);
  expect(tilebelt.pointToTile(185, 85, 2)).toStrictEqual([0, 0, 2]);

  // Y axis
  // Does not wrap Tile Y
  expect(tilebelt.pointToTile(-175, -95, 2)).toStrictEqual([0, 3, 2]);
  expect(tilebelt.pointToTile(-175, 95, 2)).toStrictEqual([0, 0, 2]);
  expect(tilebelt.pointToTile(-175, 95, 2)).toStrictEqual([0, 0, 2]);

  // BBox
  // https://github.com/mapbox/tilebelt/issues/12
  expect(tilebelt.bboxToTile([-0.000001, -85, 1000000, 85])).toStrictEqual([
    0, 0, 0,
  ]);
});
