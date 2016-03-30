import should from 'should'; // eslint-disable-line
import Graph from '../dijkstra';

describe('dijkstra', () => {
  const graph = new Graph();
  console.log('Begin to initiate the graph.');
  for (let i = 0; i < 2000; i++) {
    for (let j = 0; j < 2000; j++) {
      if (i !== j) {
        graph.addVertex(`Vertex-${i}`, {
          [`Vertex-${j}`]: 1,
        });
      }
    }
  }
  console.log('Done. It took a long time, didn\'t it?');

  it('Should successfully get the path very quickly', done => {
    const path = graph.shortestPath('Vertex-0', 'Vertex-10');
    path.should.be.an.instanceOf(Array);
    done();
  });
});
