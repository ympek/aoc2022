import path from 'path';
import { fileURLToPath } from 'url';
import { open } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let filehandle;

// ops 
const OP_ROC = "A";
const OP_PAP = "B";
const OP_SCI = "C";
const PL_ROC = "X";
const PL_PAP = "Y";
const PL_SCI = "Z";

// outcomes (for part 2)
const LOSE = "X";
const DRAW = "Y";
const WIN = "Z";

function calculateScore(round) {
  const [opponentChoice, playerChoice] = round.split(" ");
  
  let total = 0;

  switch(playerChoice) {
    case PL_ROC: total += 1; break;
    case PL_PAP: total += 2; break;
    case PL_SCI: total += 3; break;
  }

  if (playerChoice === PL_ROC && opponentChoice === OP_ROC 
    || playerChoice === PL_PAP && opponentChoice === OP_PAP
    || playerChoice === PL_SCI && opponentChoice === OP_SCI) {
    // draw
    total += 3;
  } 
  if (playerChoice === PL_ROC && opponentChoice === OP_SCI
  || playerChoice === PL_SCI && opponentChoice === OP_PAP 
  || playerChoice === PL_PAP && opponentChoice === OP_ROC) {
    // win
    total += 6;
  }
  return total;
}

function reinterpret(round) {
  const [opponentChoice, expectedOutcome] = round.split(" ");

  if (expectedOutcome === LOSE && opponentChoice === OP_PAP
    || expectedOutcome === DRAW && opponentChoice === OP_ROC
    || expectedOutcome === WIN && opponentChoice === OP_SCI) {
    return [opponentChoice, PL_ROC].join(" ");
  } 
  if (expectedOutcome === LOSE && opponentChoice === OP_SCI
    || expectedOutcome === DRAW && opponentChoice === OP_PAP
    || expectedOutcome === WIN && opponentChoice === OP_ROC) {
    return [opponentChoice, PL_PAP].join(" ");
  } 
  if (expectedOutcome === LOSE && opponentChoice === OP_ROC
    || expectedOutcome === DRAW && opponentChoice === OP_SCI
    || expectedOutcome === WIN && opponentChoice === OP_PAP) {
    return [opponentChoice, PL_SCI].join(" ");
  }
  console.log("should not ever happen", opponentChoice, expectedOutcome)
}

try {
  filehandle = await open(__dirname + '/input', 'r');

  const input = await filehandle.readFile();
  const str = input.toString();
  const rounds = str.split("\n");
  rounds.pop() // last row is empty:)

  const scores = rounds.map(round => calculateScore(round));

  const finalScoreForPartOne = scores.reduce( (prev, next) => prev + next);

  console.log(finalScoreForPartOne);

  // yeah now part 2 
  // interpretation changes a bit

  const reinterpretedRounds = rounds.map( round => reinterpret(round));

  const scores2 = reinterpretedRounds.map(round => calculateScore(round));

  const finalScoreForPartTwo = scores2.reduce( (prev, next) => prev + next);

  console.log("Answer to part 1: ", finalScoreForPartOne);
  console.log("Answer to part 2: ", finalScoreForPartTwo);

} finally {
  await filehandle?.close();
}
