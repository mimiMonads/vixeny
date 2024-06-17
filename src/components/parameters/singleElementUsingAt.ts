import mainSlicerUrl from "../../util/slicerURL/mainSlicerUrl.ts";

/**
 * @mimiMonads
 *
 * This code is an object that contains all the logic related with handling just one parameter
 */

export default {
  /**
   * Uses mainSlicerUrl
   *
   * Extracts a substring from a given string, starting after the third occurrence of '/' plus the offset
   * and extending up to the next '?' or the length of the string.
   *
   * @param {number} offset - The number of characters to offset from the third '/'.
   * @returns {string} - The resulting substring.
   */
  elementWithNoSlashAtTheEnd: (offset: number) => (at: number) =>
    (
      (slicer) => (url: string) =>
        url.slice(
          slicer(url) + offset,
          url.indexOf("?") !== -1 ? url.indexOf("?") : url.length,
        )
    )(
      mainSlicerUrl(at),
    ),
  /**
   * Uses mainSlicerUrl
   *
   * Extracts a substring from a given string, starting after the third occurrence of '/' plus the offset
   * and extending up to the next '/' after a specified offset.
   *
   * @param {number} offset - The number of characters to offset from the third '/'.
   * @returns {string} - The resulting substring, not including the ending slash.
   */
  elementAndSlashAtTheEnd: (offset: number) => (at: number) =>
    (
      (slicer) => (url: string) =>
        (
          (toSlice) =>
            url.slice(
              toSlice,
              url.indexOf("/", toSlice),
            )
        )(
          slicer(url) + offset,
        )
    )(
      mainSlicerUrl(at),
    ),
};
