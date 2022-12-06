import path from 'path';
import { fileURLToPath } from 'url';
import { open } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let filehandle;

type Assignment = {
  lowerBoundary: number,
  higherBoundary: number
}

function makeAssignments(assignmentPair : string) : [Assignment, Assignment] { 
  const [leftString, rightString] = assignmentPair.split(",");
  const leftStringSplitted = leftString.split("-");
  const firstAssignment : Assignment = {
    lowerBoundary: parseInt(leftStringSplitted[0]),
    higherBoundary: parseInt(leftStringSplitted[1])
  }
  const rightStringSplitted = rightString.split("-");
  const secondAssignment : Assignment = {
    lowerBoundary: parseInt(rightStringSplitted[0]),
    higherBoundary: parseInt(rightStringSplitted[1])
  }
  
  return [firstAssignment, secondAssignment];
}

function hasFullOverlap(assignmentPair: string) {
  const [firstAssignment, secondAssignment] = makeAssignments(assignmentPair);

  return (firstAssignment.lowerBoundary <= secondAssignment.lowerBoundary && firstAssignment.higherBoundary >= secondAssignment.higherBoundary) 
    || (secondAssignment.lowerBoundary <= firstAssignment.lowerBoundary && secondAssignment.higherBoundary >= firstAssignment.higherBoundary)
}

function hasNoOverlap(assignmentPair: string) {

  const [firstAssignment, secondAssignment] = makeAssignments(assignmentPair);
  return (firstAssignment.higherBoundary < secondAssignment.lowerBoundary) 
    || (secondAssignment.higherBoundary < firstAssignment.lowerBoundary)
}

try {
  filehandle = await open(__dirname + '/input', 'r');

  const input = await filehandle.readFile();
  const str = input.toString();
  const assignmentPairs = str.split("\n");
  assignmentPairs.pop() // last row is empty:)

  let pairsOverlappingCompletely = 0;
  let nonOverlappingPairs = 0;

  assignmentPairs.forEach( (assignmentPair) => {
    if (hasFullOverlap(assignmentPair)) {
      pairsOverlappingCompletely++;
    }  

    if (hasNoOverlap(assignmentPair)) {
      nonOverlappingPairs++;
    } 
  });

  console.log("Answer to part 1: ", pairsOverlappingCompletely);
  console.log("Answer to part 2: ", assignmentPairs.length - nonOverlappingPairs);

} finally {
  await filehandle?.close();
}
