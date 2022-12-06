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
  *)
    echo "Invalid or not yet finished day."
    ;;
esac
