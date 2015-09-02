var Benchmark = require('benchmark');
var tilebelt = require('./');

new Benchmark.Suite()
.add('pointToTileFraction', function () {
    tilebelt.pointToTileFraction(30.5, 50.5, 15);
})
.on('error', function(event) {
    console.log(event.target.error);
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.run();
