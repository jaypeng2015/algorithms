import should from 'should'; // eslint-disable-line
import Graph from '../a-start';

describe('a-start', () => {
  const map = [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ];
  const graph = new Graph(map);

  it('Should successfully get the path very quickly', done => {
    const path = graph.findPath([0, 0], [3, 4]);
    path.should.be.an.instanceOf(Array);
    const result = [];
    path.forEach(obj => {
      result.push([obj.x, obj.y]);
    });
    result.should.eql([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [4, 1],
      [4, 2],
      [3, 2],
      [2, 2],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 4],
      [3, 4],
    ]);
    done();
  });
});
