import { FunRouterOptions } from "../../../types.ts";
import { CommonRequestMorphism, RequestMorphism } from "./types.ts";
import checkAsync from "./recursiveCheckAsync.ts";
import checker from "./checker.ts";
import aComposer from "./aComposer.ts";
import mime from "../../util/mime.ts";
import jsonComposer from "../../../../encode/jsonString.mjs";

import elements from "../../util/elements.ts";

export default (o?: FunRouterOptions) =>
(f: CommonRequestMorphism  | RequestMorphism) =>
  ((elementsUsed) =>
    (
      (table) =>
        ((composition) =>
          (table.headers && table.json)
            ? composition(table.json)(table.headers)(f.f)(
              aComposer(o)(f )(elementsUsed),
            )
            : table.headers
            ? composition(table.headers)(f.f)(
              aComposer(o)(f )(elementsUsed),
            )
            : table.json
            ? composition(table.json)(f.f)(
              aComposer(o)(f )(elementsUsed),
            )
            : composition(f.f)(
              aComposer(o)(f)(elementsUsed),
            ))(
            "type" in f
              ? new Function(`
      return ${table.json ? "j=>" : ""}f=>c=>${
                table.async || table.asyncResolve ? "async " : ""
              }r=>${table.async || table.asyncResolve ? "await f" : "f"}(${
                table.asyncResolve ? "await c" : "c"
              }(${"mutable" in f ? "{r:r,m:{}}" : "r"}))`)()
              : new Function(
                `return ${table.json ? "j=>" : ""}${
                  table.headers ? "h=>" : ""
                }${table.async ? "f=>" : "f=>"}${
                  table.asyncResolve ? "c=>" : "c=>"
                }${
                  table.async || table.asyncResolve ? "async " : ""
                }r=> new Response(${
                  table.async || table.asyncResolve ? "await f" : "f"
                }(${table.asyncResolve ? "await c" : "c"}(${
                  "mutable" in f ? "{r:r,m:{}}" : "r"
                }))${table.headers ? ",h" : ""})`,
              )(),
          )
    )(
      {
        async: f.f.constructor.name === "AsyncFunction",
        asyncResolve: checkAsync(f),
        headers: "headings" in f
          ? typeof f.headings?.headers == "string"
            ? {
              ...f.headings,
              headers: {
                "Content-Type":
                  mime.find((x) => x[0] === f.headings?.headers)![1],
              },
            }
            : { ...f.headings }
          : null,
        json: "json" in f
          ? null //jsonComposer({ type: "safe" })(f.json.scheme)
          : null,
      },
    ))(
      (
          typeof f.options?.only !== "undefined" && f.options.only.length > 0
        )
        ? f.options.only
        : checker(f.options?.remove || [])(elements)(
          [...(f.options?.add || []), ...( Object.keys(o?.cyclePlugin || {}) || [])]
          )(
          f.f.toString(),
        ),
    );
