/**
 * @mimiMonads
 *
 * This code is an object that contains all the logic related with handling just one parameter
 */

export default {
  /**
   * @param {string} string - The string defining the object properties and values.
   * @returns {(value: string) => Record<string, string>} - A function that returns another function,
   * which when called with a value, returns an object with properties as specified by the input string.
   */
  creatingAnObjectWith: (string: string) => (f: { (key: string): string }) =>
    new Function(`return f => s => ({${string}: f(s)})`)()(f) as (
      value: string,
    ) => Record<string, string>,
  /**
   * Extracts a substring from a given string, starting after the third occurrence of '/' plus the offset
   * and extending up to the next '?' or the length of the string.
   *
   * @param {number} offset - The number of characters to offset from the third '/'.
   * @returns {string} - The resulting substring.
   */
  elementWithNoSlashAtTheEnd: (offset: number) => (string: string) =>
    string.slice(
      string.indexOf("/", string.indexOf("/") + 2) + offset,
      string.indexOf("?") !== -1 ? string.indexOf("?") : string.length,
    ),

  /**
   * Extracts a substring from a given string, starting after the third occurrence of '/' plus the offset
   * and extending up to the next '/' after a specified offset.
   *
   * @param {number} offset - The number of characters to offset from the third '/'.
   * @returns {string} - The resulting substring, not including the ending slash.
   */
  elementAndSlashAtTheEnd: (offset: number) => (string: string) =>
    (
      (toSlice) =>
        string.slice(
          toSlice,
          string.indexOf("/", toSlice),
        )
    )(
      string.indexOf("/", string.indexOf("/") + 2) + offset,
    ),
  fixElementAtTheEnd: (offset: number) => (string: string) =>
    string.slice(
      offset,
      string.indexOf("?") !== -1 ? string.indexOf("?") : string.length,
    ),
  fixElementAndSlashAtTheEnd: (offset: number) => (string: string) =>
    string.slice(offset, string.indexOf("/", offset + 1)),
};
