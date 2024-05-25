/**
 * Identifies the current JavaScript runtime environment. It prioritizes the detection in the following order:
 * 1. Bun
 * 2. Deno
 *
 * By default, if neither Bun nor Deno environments are detected, it assumes the Node environment.
 *
 * This function is useful for applications that need to adapt their behavior based on the runtime environment.
 *
 * ```js
 * import { runtime } from 'vixeny'
 *
 * //logging runtime name
 * console.log(
 *  runtime.name()
 * )
 *
 * ```
 */

export default () =>
  typeof Bun !== "undefined"
    ? "Bun"
    : typeof Bun !== "undefined"
    ? "Deno"
    : "Node";
