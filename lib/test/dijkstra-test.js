import should from 'should'; // eslint-disable-line
import Graph from '../dijkstra';

describe('dijkstra', () => {
  let graph;

  beforeEach(done => {
    graph = new Graph();
    for (let i = 0; i < 2000; i++) {
      for (let j = 0; j < 2000; j++) {
        if (i !== j) {
          graph.addVertex(`Vertex-${i}`, {
            [`Vertex-${j}`]: 1,
          });
        }
      }
    }
    done();
  });

  it('Should successfully get the path', done => {
    const path = graph.shortestPath('Vertex-0', 'Vertex-10');
    path.should.be.an.instanceOf(Array);
    done();
  });
});
