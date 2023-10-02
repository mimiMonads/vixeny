/**
 * @mimiMonads
 * Creates a recursive function to search for all files and directories from a given starting directory.
 * For each found item, it returns an array containing the item's path and a boolean indicating if it's a directory.
 *
 * @function
 * @param {Function} joiner - A function that joins base directory and target item to form a full path.
 * @param {Function} readdir - A function to read the contents of a directory.
 * @param {Function} stat - A function to get stats of a given path and determine if it's a directory.
 * @returns {Function} A function that takes a directory path and returns an array of arrays, where each inner array contains a path string and a boolean indicating if it's a directory.
 *
 * @example
 * const recursiveSearch = myFunction(joinerFunction)(readDirFunction)(statFunction);
 * const results = recursiveSearch('.start/path/');
 * console.log(results); // [[path1, false], [path2, true], ...]
 */
export default (joiner) => (readdir) => (stat) => (dir) =>
  (
    (Y) => (
      Y((f) => (dir) =>
        readdir(dir).flatMap((item) =>
          stat(joiner(dir)(item)).isDirectory()
            ? [[joiner(dir)(item), true], ...f(joiner(dir)(item))]
            : [[joiner(dir)(item), false]]
        )
      )(dir)
    )
  )(
    // Setting up the Y combinator.
    (f) => ((x) => x(x))((x) => f((y) => x(x)(y))),
  );
