import path from 'path';
import { fileURLToPath } from 'url';
import { open } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let filehandle;

function toInteger(s) {
  s = parseInt(s);
  // be wary of invalid values
  return isNaN(s) ? 0 : s;
};

function sumCaloriesOnElf(elf) {
  const strings = elf.split("\n");
  const values = strings.map(s => toInteger(s));
  return values.reduce( (prev, curr) => prev + curr);
}

try {
  filehandle = await open(__dirname + '/input', 'r');

  const input = await filehandle.readFile();
  const str = input.toString();
  const elves = str.split("\n\n");
  const sums = elves.map(elf => sumCaloriesOnElf(elf));

  sums.sort( (a, b) => (a < b) ? 1 : -1);

  console.log("Answer to part 1: ", sums[0]);
  console.log("Answer to part 2: ", sums[0] + sums[1] + sums[2]);
} finally {
  await filehandle?.close();
}
