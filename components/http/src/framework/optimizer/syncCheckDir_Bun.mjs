/**
 * Creates a function that searches through directories recursively and lists all files and directories along with a flag indicating if it's a directory.
 *
 * @param {Function} joiner - A function that takes a base path and a target path and returns the joined path.
 * @param {Function} readdir - A function that takes a directory path and returns an array of file and directory names within it.
 * @param {Function} stat - A function that takes a path and returns an object with an isDirectory method.
 * @returns {Function} A function that takes a directory path and returns an array of tuples, each containing a path and a boolean flag indicating if it's a directory.
 *
 * @example
 * const listFilesAndDirectories = myFunction(joinPathFunction, readDirectoryFunction, statsFunction);
 * const items = listFilesAndDirectories('/path/to/directory');
 */
export default (joiner) => (readdir) => (stat) => (dir) =>
  (
    (Y) => (
      Y((f) => (
        (dir) =>
          readdir(dir).flatMap((item) =>
            stat(joiner(dir)(item)).isDirectory()
              ? [[joiner(dir)(item), true], ...f(joiner(dir)(item))]
              : [[joiner(dir)(item), false]]
          )
      ))(dir)
    )
  )(
    // Setting up the Y combinator.
    (f) => ((x) => x(x))((x) => f((y) => x(x)(y))),
  );
