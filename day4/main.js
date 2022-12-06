"use strict";
exports.__esModule = true;
var path_1 = require("path");
var url_1 = require("url");
var promises_1 = require("node:fs/promises");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1["default"].dirname(__filename);
var filehandle;
try {
    filehandle = await (0, promises_1.open)(__dirname + '/input', 'r');
    var input = await filehandle.readFile();
    var str = input.toString();
    var rounds = str.split("\n");
    rounds.pop(); // last row is empty:)
    var scores = rounds.map(function (round) { return calculateScore(round); });
    var finalScoreForPartOne = scores.reduce(function (prev, next) { return prev + next; });
    console.log(finalScoreForPartOne);
    // yeah now part 2 
    // interpretation changes a bit
    var reinterpretedRounds = rounds.map(function (round) { return reinterpret(round); });
    var scores2 = reinterpretedRounds.map(function (round) { return calculateScore(round); });
    var finalScoreForPartTwo = scores2.reduce(function (prev, next) { return prev + next; });
    console.log("Answer to part 1: ", finalScoreForPartOne);
    console.log("Answer to part 2: ", finalScoreForPartTwo);
}
finally {
    await (filehandle === null || filehandle === void 0 ? void 0 : filehandle.close());
}
