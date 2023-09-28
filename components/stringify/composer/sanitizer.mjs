/**
 * Returns a string safely wrapped in double quotes, escaping it if necessary.
 *
 * @param {string} s - The input string.
 * @returns {string} - The safely quoted string.
 */

export default (
  (escapes) => (s) => escapes.test(s) ? JSON.stringify(s) : `"${s}"`
)(
  /[\\"\\u0000-\\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
);
