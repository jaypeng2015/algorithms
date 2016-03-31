/**
 * Solve hanoi problem with recursive algorithms
 * @param  {Number} i   Number of plates
 * @param  {String} src Source place of the plates
 * @param  {String} tmp Temporary plate to use
 * @param  {String} dst Destination of the plates
 * @return {Array}     Result
 */
export default function hanoi(i, src, tmp, dst) {
  const result = [];
  move(i, src, tmp, dst, result);
  return result;
}

function move(i, src, tmp, dst, result) {
  if (i > 0) {
    move(i - 1, src, dst, tmp, result);
    result.push(` move disc ${i} from ${src} to ${dst}`);
    move(i - 1, tmp, src, dst, result);
  }
}
