#!/bin/bash

if [ ! $1 ] 
then
  echo "You need to specify day number to run, e.g. ./day.sh 1 will run the code from day 1 folder."
  exit 1
fi

case $1 in
  1)
    node day1
    ;;
  2)
    node day2
    ;;
  3)
    pushd day3 > /dev/null
    go run main.go
    popd > /dev/null
    ;;
  4)
    npx ts-node-esm day4/main.ts
    ;;
  5)
    pushd day5 > /dev/null
    go run main.go
    popd > /dev/null
    ;;
  6)
    ruby day6/main.rb
    ;;
  7)
    node day7
    ;;
  8)
    pushd day8 > /dev/null
    g++ main.cpp
    ./a.out
    popd > /dev/null
    ;;
  9)
    ruby day9/main.rb
    ;;
  *)
    echo "Invalid or not yet finished day."
    ;;
esac
