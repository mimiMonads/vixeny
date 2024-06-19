import { isUsing as param } from "../components/parameters/mainParameters.ts";
import { isUsing as query } from "../components/queries/mainQueries.ts";
import { isUsing as cookie } from "../components/cookies/mainCookies.ts";
import { isUsing as token } from "../components/cookieToToken/mainCookieToToken.ts";
import type { Petition } from "../morphism.ts";
import type { FunRouterOptions } from "../options.ts";

type Display = {
  using?: string[];
  isAsync?: boolean;
};

type Elements = {
  [key: string]: (options?: FunRouterOptions<any>) => (p: Petition) => string;
};

const elements: Elements = {
  param,
  query,
  cookie,
  token,
};
export const displayPaths = (p: Petition): void => (
  console.log("---"),
    Object.entries({
      path: p.path,
      method: p.method ?? "GET",
    }).forEach(
      ([key, value]) => (
        console.log(
          `\x1b[35m${key}\x1b[0m: \x1b[38;2;255;165;0m${value}\x1b[0m`,
        )
      ),
    )
);

export const display =
  (options?: FunRouterOptions<any>) =>
  (p: Petition) =>
  (object: Display): void => (
    console.log("--- Context ---"),
      Object.entries(object).forEach(
        ([key, value]) => (
          console.log(
            `\x1b[35m${key}\x1b[0m: \x1b[38;2;255;165;0m${value}\x1b[0m`,
          )
        ),
      ),
      console.log(
        (object.using ?? [])
          .reduce(
            (acc, key) =>
              key in elements
                ? acc +
                  `\x1b[35m${key}\x1b[0m: \x1b[38;2;255;165;0m${
                    elements[key](options)(p)
                  }\x1b[0m \n`
                : acc + "",
            "--- Components ---\n",
          ),
      )
  );
