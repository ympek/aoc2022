package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var signalStrengthSum int

func interrupt(pc *int, regval *int) {
	fmt.Println("during cycle number ", *pc, "X is ", *regval)
	if *pc%40 == 20 {
		signalStrength := (*pc) * (*regval)
		signalStrengthSum += signalStrength
	}
}

func noop(pc *int, regval *int) {
	interrupt(pc, regval)
	*pc++
}

func addx(pc *int, regval *int, x int) {
	interrupt(pc, regval)
	*pc++
	interrupt(pc, regval)
	*pc++
	*regval += x
}

func main() {
	inputFile, err := os.Open("./input")

	if err != nil {
		panic(err)
	}

	signalStrengthSum = 0
	pc := 1
	registerValue := 1

	scanner := bufio.NewScanner(inputFile)
	for scanner.Scan() {
		line := scanner.Text()

		if strings.HasPrefix(line, "noop") {
			noop(&pc, &registerValue)
		}

		if strings.HasPrefix(line, "addx") {
			pair := strings.Split(line, " ")
			x, _ := strconv.Atoi(pair[1])
			addx(&pc, &registerValue, x)
		}
	}

	fmt.Println("Answer to part 1: ", signalStrengthSum)
	fmt.Println("Answer to part 2: ", 0)
}
