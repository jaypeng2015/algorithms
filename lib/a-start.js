import _ from 'lodash';

class Node {
  constructor(x, y, value) {
    this.pos = {
      x,
      y,
    };
    this.value = value;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.parent = null;
  }

  isWall() {
    return this.value === 1;
  }
}

export default class Graph {
  constructor(grid) {
    this.grid = [];
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const node = new Node(x, y, grid[x][y]);
        this.grid[x] = this.grid[x] || [];
        this.grid[x][y] = node;
      }
    }
  }

  findPath(start, end) { // eslint-disable-line consistent-return
    const openList = [];
    const closedList = [];
    const startNode = this.grid[start[0]][start[1]];
    const endNode = this.grid[end[0]][end[1]];
    openList.push(startNode);

    while (openList.length > 0) {
      // Grab the lowest f(x) to process next
      let lowInd = 0;
      for (let i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[lowInd].f) {
          lowInd = i;
        }
      }
      const currentNode = openList[lowInd];
      // console.log('currentNode', currentNode);

      // End case -- result has been found, return the traced path
      if (currentNode.pos === endNode.pos) {
        let curr = currentNode;
        const ret = [];
        while (curr.parent) {
          ret.push(curr);
          curr = curr.parent;
        }
        ret.push(startNode);
        return _.map(ret.reverse(), 'pos');
      }

      // Normal case -- move currentNode from open to closed, process each of its neighbors
      _.remove(openList, curr => {
        return curr.pos === currentNode.pos;
      });
      closedList.push(currentNode);
      const neighbors = this.getNeighbors(this.grid, currentNode);
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (closedList.indexOf(neighbor) >= 0 || neighbor.isWall()) {
          // not a valid node to process, skip to next neighbor
          continue;
        }

        // g score is the shortest distance from start to current node, we need to check if
        //	 the path we have arrived at this neighbor is the shortest one we have seen yet
        const gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
        let gScoreIsBest = false;

        if (openList.indexOf(neighbor) < 0) {
          // This the the first time we have arrived at this node, it must be the best
          // Also, we need to take the h (heuristic) score since we haven't done so yet

          gScoreIsBest = true;
          neighbor.h = this.heuristic(neighbor.pos, endNode.pos);
          openList.push(neighbor);
        } else if (gScore < neighbor.g) {
          // We have already seen the node, but last time it had a worse g (distance from start)
          gScoreIsBest = true;
        }

        if (gScoreIsBest) {
          // Found an optimal (so far) path to this node.	 Store info on how we got here and
          //	just how good it really is...
          neighbor.parent = currentNode;
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
        }
      }
    }
  }

  heuristic(pos0, pos1) {
    // This is the Manhattan distance
    const d1 = Math.abs(pos1.x - pos0.x);
    const d2 = Math.abs(pos1.y - pos0.y);
    return d1 + d2;
  }

  getNeighbors(grid, node) {
    const ret = [];
    const x = node.pos.x;
    const y = node.pos.y;

    if (grid[x - 1] && grid[x - 1][y]) {
      ret.push(grid[x - 1][y]);
    }
    if (grid[x + 1] && grid[x + 1][y]) {
      ret.push(grid[x + 1][y]);
    }
    if (grid[x][y - 1] && grid[x][y - 1]) {
      ret.push(grid[x][y - 1]);
    }
    if (grid[x][y + 1] && grid[x][y + 1]) {
      ret.push(grid[x][y + 1]);
    }
    return ret;
  }
}
