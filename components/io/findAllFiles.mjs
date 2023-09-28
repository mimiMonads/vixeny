import recursiveFileFind from "./src/recursiveFileFind.mjs";
import {readdirSync ,statSync} from "node:fs"
import joiner from "../util/joiner.mjs";

/**
 * @mimiMonads
 * Returns a function that takes a directory path and recursively retrieves
 * all files and directories, representing them as an array of arrays.
 * Each inner array contains a string (the file/directory path) and a boolean
 * (true for directories, false for files).
 *
 * @function
 * @param {string} dirPath - The path to the directory.
 * @returns {Array<Array<(string|boolean)>>} An array of arrays, where each inner array contains a path and a boolean.
 * 
 * @example
 * const fileFinder = recursiveFileFindFunction('./base/path/');
 * const results = fileFinder('./another/path/');
 * console.log(results); // [[path1, false], [path2, true], ...]
 */

export default recursiveFileFind(joiner)(readdirSync)(statSync)
