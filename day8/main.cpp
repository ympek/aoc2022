#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <vector>

struct treeProps {
  int visibleSides;
  int scenicScore;

  treeProps() : visibleSides(4), scenicScore(1) {}

  bool updateLineOfSight(int currentTree, int neighbourTree) {
        numTreesVisibleInCurrentLine++;
        if (neighbourTree >= currentTree) {
          visibleSides--;
          return true;
        }
        return false;
  }

  void finishLineUpdate() {
    scenicScore *= numTreesVisibleInCurrentLine;
    numTreesVisibleInCurrentLine = 0;
  }
private:
  int numTreesVisibleInCurrentLine;
};

int main() {
  std::ifstream inputStream("./input");

  std::string line;
  std::vector<std::vector<int>> grid;

  while(inputStream >> line) {
    std::vector<int> lineVector;
    for (int j = 0; j < line.length(); j++) {
      lineVector.push_back(line.at(j) - '0');
    }
    grid.push_back(lineVector);
  }

  const int ROWS = grid.size();
  const int COLS = grid[0].size();

  int visibleCount = 0;
  int maxScenicScore = 1;

  for (int i = 0; i < ROWS; i++) {
    for (int j = 0; j < COLS; j++) {
      auto tree = grid[i][j];
      treeProps props;

      for (int k = j-1; k >= 0; k--) {
        bool viewBlocked = props.updateLineOfSight(tree, grid[i][k]);
        if (viewBlocked) break;
      }
      props.finishLineUpdate();

      for (int k = j+1; k <= COLS-1; k++) {
        bool viewBlocked = props.updateLineOfSight(tree, grid[i][k]);
        if (viewBlocked) break;
      }
      props.finishLineUpdate();

      for (int k = i-1; k >= 0; k--) {
        bool viewBlocked = props.updateLineOfSight(tree, grid[k][j]);
        if (viewBlocked) break;
      }
      props.finishLineUpdate();

      for (int k = i+1; k <= ROWS-1; k++) {
        bool viewBlocked = props.updateLineOfSight(tree, grid[k][j]);
        if (viewBlocked) break;
      }
      props.finishLineUpdate();

      if (props.visibleSides > 0) {
        visibleCount++;
      }

      if (props.scenicScore > maxScenicScore) {
        maxScenicScore = props.scenicScore;
      }
    }
  }

  std::cout << "Answer to part 1: " << visibleCount << "\n";
  std::cout << "Answer to part 2: " << maxScenicScore << "\n";
}
