import 'google-closure-library';
goog.require('goog.structs.PriorityQueue'); // eslint-disable-line no-undef

const INFINITY = 1 / 0;

export default class Graph {

  constructor(vertices) {
    this.vertices = vertices || {};
  }

  addVertex(name, edges) {
    if (!this.vertices[name]) {
      this.vertices[name] = edges;
    } else {
      this.vertices[name] = Object.assign(this.vertices[name], edges); // This is much faster than ... copy
    }
  }


  shortestPath(start, finish) {
    if (!(this.vertices[start] && this.vertices[start])) {
      throw new Error('Vertice not found');
    }
    const nodes = new goog.structs.PriorityQueue(); // eslint-disable-line no-undef
    const distances = {};
    const previous = {};
    const path = [];

    for (const vertex in this.vertices) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      } else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while (!nodes.isEmpty()) {
      let smallest = nodes.dequeue();

      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if (!smallest || distances[smallest] === INFINITY) {
        continue;
      }

      const edges = this.vertices[smallest];
      for (const neighbor in edges) {
        if (Object.prototype.hasOwnProperty.call(edges, neighbor)) {
          const alt = distances[smallest] + this.vertices[smallest][neighbor];
          if (alt < distances[neighbor]) {
            distances[neighbor] = alt;
            previous[neighbor] = smallest;
            nodes.enqueue(alt, neighbor);
          }
        }
      }
    }

    // with the addition of reversing the path and prepending the first node so it's more readable
    return path.concat(start).reverse();
  }
}
