package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// let's start with stack implementation
// throwback to junior yr at the uni

type Stack struct {
	items []string
}

func (s *Stack) Size() int {
	return len(s.items)
}

func (s *Stack) Push(item string) {
	s.items = append(s.items, item)
}

func (s *Stack) Pop() string {
	if s.Size() == 0 {
		return ""
	}
	top := s.Size() - 1
	topItem := s.items[top]
	s.items = s.items[:top]
	return topItem
}

func (s *Stack) Peek() string {
	if s.Size() == 0 {
		return ""
	}
	top := s.Size() - 1
	return s.items[top]
}

func ParseInputFile(f *os.File) (int, []string, []string) {

	scanner := bufio.NewScanner(f)

	var cratesTemplate []string
	var movesList []string
	var numCrateStacks int

	for scanner.Scan() {
		line := scanner.Text()

		if strings.HasPrefix(line, "[") {
			cratesTemplate = append(cratesTemplate, line)
		}

		if strings.HasPrefix(line, " 1") {
			numbers := strings.Fields(line)
			numCrateStacks, _ = strconv.Atoi(numbers[len(numbers)-1])
		}

		if strings.HasPrefix(line, "move") {
			movesList = append(movesList, line)
		}
	}

	return numCrateStacks, cratesTemplate, movesList
}

func MakeCrateStacks(amount int, cratesTemplate []string) []Stack {
	var crateStacks = make([]Stack, amount)
	// prepare crate stacks
	for i := len(cratesTemplate) - 1; i >= 0; i-- {
		crates := strings.Split(cratesTemplate[i], " ")
		stackIndex := 0
		whitespaceIndex := 0
		for _, crate := range crates {
			// fmt.Println("Crate: ", crate, "(lenCrate, stackIndex, whitespaceIndex)", len(crate), stackIndex, whitespaceIndex)
			if len(crate) > 1 {
				crateStacks[stackIndex].Push(crate)
				stackIndex++
				whitespaceIndex = 0 // reset
			}
			if len(crate) == 0 {
				whitespaceIndex++
			}
			if whitespaceIndex == 4 {
				stackIndex++
				whitespaceIndex = 0 // reset
			}
		}
	}
	return crateStacks
}

func GetTopRowOfCrateStacks(crateStacks []Stack) string {
	var result []string
	for _, crateStack := range crateStacks {
		topCrate := crateStack.Peek()
		topCrate = strings.Trim(topCrate, "[]")
		result = append(result, topCrate)
	}
	return strings.Join(result, "")
}

func MoveCratesWithCrateMover9000(crateStacks *[]Stack, amount int, source int, target int) {
	for m := 0; m < amount; m++ {
		crate := (*crateStacks)[source].Pop()
		(*crateStacks)[target].Push(crate)
	}
}

func MoveCratesWithCrateMover9001(crateStacks *[]Stack, amount int, source int, target int) {
	var multiCrate = make([]string, amount)

	for m := 0; m < amount; m++ {
		crate := (*crateStacks)[source].Pop()
		multiCrate[amount-1-m] = crate
	}

	for m := 0; m < amount; m++ {
		(*crateStacks)[target].Push(multiCrate[m])
	}
}

func main() {
	inputFile, err := os.Open("./input")

	if err != nil {
		panic(err)
	}

	numCrateStacks, cratesTemplate, movesList := ParseInputFile(inputFile)

	crateStacks1 := MakeCrateStacks(numCrateStacks, cratesTemplate)
	crateStacks2 := MakeCrateStacks(numCrateStacks, cratesTemplate)

	for _, moveDescription := range movesList {
		move := strings.Split(moveDescription, " ")

		howMany, _ := strconv.Atoi(move[1])
		source, _ := strconv.Atoi(move[3])
		target, _ := strconv.Atoi(move[5])

		source -= 1
		target -= 1

		MoveCratesWithCrateMover9000(&crateStacks1, howMany, source, target)
		MoveCratesWithCrateMover9001(&crateStacks2, howMany, source, target)
	}

	fmt.Println("Answer to part 1: ", GetTopRowOfCrateStacks(crateStacks1))
	fmt.Println("Answer to part 2: ", GetTopRowOfCrateStacks(crateStacks2))
}
