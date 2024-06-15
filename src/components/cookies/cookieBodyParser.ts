/**
 * Constructs an object where each property is a function result associated with cookie names.
 * The properties are generated in the order they appear in the input array. Each property uses
 * the corresponding cookie function applied to an accumulated value.
 */

const body = (arr: string[]) =>
  arr.reduce(
    (acc, f) => acc(cookieFunction(f)),
    // This initializes a function that will accumulate results in the form of an object,
    // where keys are the function names and values are the results of applying these functions.
    new Function(
      ` return (${arr.reduce((acc, x) => acc + x + "=>", "")}r => ({${
        arr.map((x) => ` ${x}: ${x}(r)`).join(",")
      }}))`,
    )(),
  ) as (string: string | null) => Record<string, string | null>;

/**
 * Creates a function that retrieves the value of a specified cookie by its name.
 * If the cookie is found, it returns the cookie's value; otherwise, it returns null.
 */

const cookieFunction = (nameOfTheCookie: string) => (cookie: string) =>
  (
    (position) =>
      position !== -1
        ? cookie.slice(
          position + nameOfTheCookie.length + 1,
          (cookie.indexOf(",", position) + 1 || cookie.length + 1) - 1,
        )
        : null
  )(
    // Determines the starting position of the specified cookie within the cookie string.
    typeof cookie === "string" ? cookie.indexOf(nameOfTheCookie + "=") : -1,
  );

export { body };
