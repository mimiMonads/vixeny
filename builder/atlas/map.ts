export default (c: string[][][]):number[][]  => {
  let flattenArr: string[] = [];
  let result: number[][] = [];

  c.forEach(subArray => {
    let indices: number[] = [];
    subArray.forEach((arr) => {
      indices.push(flattenArr.length);
      flattenArr = [...flattenArr, ...arr];
    });
    result.push(indices);
  });

  return result;
}
