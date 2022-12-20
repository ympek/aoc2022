package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var signalStrengthSum int
var crtRender string

func interrupt(pc *int, regval *int) {
	draw(pc, regval)
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

func draw(pc *int, spritePos *int) {
	drawingPos := *pc % 40

	// had off-by one error here, a classic
	if drawingPos == *spritePos || drawingPos == *spritePos+1 || drawingPos == *spritePos+2 {
		crtRender += "#"
	} else {
		crtRender += "."
	}

	if drawingPos == 0 {
		crtRender += "\n"
	}
}

func main() {
	inputFile, err := os.Open("./input")

	if err != nil {
		panic(err)
	}

	signalStrengthSum = 0
	pc := 1
	spritePos := 1 // also known as 'X register content'

	scanner := bufio.NewScanner(inputFile)
	for scanner.Scan() {
		line := scanner.Text()

		if strings.HasPrefix(line, "noop") {
			noop(&pc, &spritePos)
		}

		if strings.HasPrefix(line, "addx") {
			pair := strings.Split(line, " ")
			x, _ := strconv.Atoi(pair[1])
			addx(&pc, &spritePos, x)
		}
	}

	fmt.Println("Answer to part 1:", signalStrengthSum)
	fmt.Println("Answer to part 2: squint your eyes to see it below (≖_≖ )")
	fmt.Println()
	fmt.Println(crtRender)
}
