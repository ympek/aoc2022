import path from 'path';
import { fileURLToPath } from 'url';
import { open } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let filehandle;

function toInteger(s) {
  s = parseInt(s);
  return isNaN(s) ? 0 : s;
};

let cwd = "";

function moveIn(dir) {
  cwd += "/" + dir;
}

function moveOut() {
  cwd = cwd.slice(0, cwd.lastIndexOf("/"));
}

const sizes = { "/": 0 };

function addToSum(path, size) {
  let key = path;
  while (key != '') {
    key = key.slice(0, key.lastIndexOf("/"));

    if (key === '') {
      sizes["/"] += size;
    } else {
      if (sizes[key] === undefined) {
        sizes[key] = size;
      } else {
        sizes[key] += size;
      }
    }
  }
}

const CD_ROOT_PREFIX = "$ cd /";
const CD_UP_PREFIX = "$ cd ..";
const CD_PREFIX = "$ cd ";
const LS_PREFIX = "$ ls";
const DIR_PREFIX = "dir";

try {
  filehandle = await open(__dirname + '/input', 'r');

  const input = await filehandle.readFile();
  const str = input.toString();
  const lines = str.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith(CD_ROOT_PREFIX) || line.startsWith(LS_PREFIX) || line.startsWith(DIR_PREFIX)) {
      // why would I care bout this
      continue;
    }

    if (line.startsWith(CD_UP_PREFIX)) {
      const dirName = line.slice(CD_UP_PREFIX.length);
      moveOut(dirName);
      continue;
    }

    if (line.startsWith(CD_PREFIX)) {
      const dirName = line.slice(CD_PREFIX.length);
      moveIn(dirName);
      continue;
    }

    const [size, name] = line.split(" ");
    addToSum(cwd + "/" + name, toInteger(size));
  }

  const sizesArray = Object.values(sizes);
  const filtered = sizesArray.filter(s => s <= 100000);
  const sum = filtered.reduce((prev, curr) => prev + curr);

  console.log("Answer to part 1: ", sum);

  const filesystemCapacity = 70000000;
  const currentlyOccupied = sizes["/"];
  const unusedSpace = filesystemCapacity - currentlyOccupied;
  const freeSpaceRequiredForUpdate = 30000000;
  const bytesToFree = freeSpaceRequiredForUpdate - unusedSpace;

  sizesArray.sort( (a, b) => (a > b) ? 1 : -1);

  let candidate = 0;
  for (let i = 0; i < sizesArray.length; i++) {
    candidate = sizesArray[i];
    if (candidate >= bytesToFree) {
      break;
    }
  }

  console.log("Answer to part 2: ", candidate);
} finally {
  await filehandle?.close();
}
