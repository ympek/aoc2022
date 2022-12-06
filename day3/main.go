package main

import (
	"fmt"
	"os"
	"strings"
)

func getTheItemPresentInBothSlices(slice1 []byte, slice2 []byte) rune {
	for j := 0; j < len(slice1); j++ {
		item := slice1[j]
		for k := 0; k < len(slice2); k++ {
			if item == slice2[k] {
				return rune(item)
			}
		}
	}
	fmt.Println("Should not ever happen")
	return 'X'
}

func getAllItemsPresentInBothSlices(slice1 []byte, slice2 []byte) []byte {
	var result []byte

	for j := 0; j < len(slice1); j++ {
		item := slice1[j]
		for k := 0; k < len(slice2); k++ {
			if item == slice2[k] {
				result = append(result, item)
			}
		}
	}
	return result
}

func getItemTypePriority(item rune) int {
	// these are ASCII values, so let's do some math
	// minimal value should be 65 which is A
	value := item - 65
	if value <= 25 {
		// it's uppercase
		return int(value) + 27
	}
	// lowercase
	value -= 32
	return int(value) + 1
}

func main() {
	contents, err := os.ReadFile("./input")
	if err != nil {
		panic(err)
	}

	rucksacks := strings.Split(string(contents[:]), "\n")

	var uniqItems []rune

	for i := 0; i < len(rucksacks); i++ {
		rucksack := []byte(rucksacks[i])
		numOfItems := len(rucksack)

		// always remember to take out the trash
		if numOfItems == 0 {
			continue
		}

		// this very pretty ^^
		firstCompartment := rucksack[:numOfItems/2]
		secondCompartment := rucksack[numOfItems/2:]

		uniqItems = append(uniqItems, getTheItemPresentInBothSlices(firstCompartment, secondCompartment))
	}

	answerPartOne := 0
	for _, it := range uniqItems {
		// fmt.Println(it, it-65, string(it), getItemTypePriority(it))
		answerPartOne += getItemTypePriority(it)
	}
	fmt.Println("Answer to part 1: ", answerPartOne)

	// part 2 is more complex
	// or is it...
	// well first split into groups
	var firstElf, secondElf, thirdElf []byte
	var badges []rune
	for i := 0; i < len(rucksacks); i++ {
		rucksack := []byte(rucksacks[i])
		numOfItems := len(rucksack)

		// always remember to take out the trash
		if numOfItems == 0 {
			continue
		}

		if i%3 == 0 {
			firstElf = rucksack
		}
		if i%3 == 1 {
			secondElf = rucksack
		}
		if i%3 == 2 {
			thirdElf = rucksack
			// obliczenia
			candidates := getAllItemsPresentInBothSlices(firstElf, secondElf)
			badge := getTheItemPresentInBothSlices(candidates, thirdElf)
			badges = append(badges, badge)
		}
	}

	answerPartTwo := 0
	for _, it := range badges {
		// fmt.Println(it, it-65, string(it), getItemTypePriority(it))
		answerPartTwo += getItemTypePriority(it)
	}
	fmt.Println("Answer to part 2: ", answerPartTwo)
}
