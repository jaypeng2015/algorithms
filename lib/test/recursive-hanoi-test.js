import should from 'should'; // eslint-disable-line
import hanoi from '../recursive-hanoi';

describe('recursive :: hanoi', () => {
  it('Should successfully get the steps', done => {
    const result = hanoi(7, 'A', 'B', 'C');
    result.should.be.an.instanceOf(Array);
    result.length.should.equal(127);
    console.log(result);
    done();
  });
});
