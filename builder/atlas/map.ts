export default (c: string[][][]): number[][] => {
  let flattenArr: string[] = [];

  return c.map((subArray) =>
    subArray.map((arr) => {
      let currentIndex = flattenArr.length;
      flattenArr = [...flattenArr, ...arr];
      return currentIndex;
    })
  );
};
