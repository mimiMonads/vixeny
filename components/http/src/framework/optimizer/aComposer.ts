import params from "../../parameters/main.ts";
import query from "../../queries/main.ts";
import cookies from "../../cookies/main.ts";
import signer from "../tokens/signer.ts";
import verifier from "../tokens/verifier.ts";
import jVerify from "../tokens/jVerify.ts";
import jSigner from "../tokens/jSigner.ts";
import resolve from "./resolve/main.ts";
import checkAsync from "./recursiveCheckAsync.ts";
import branch from "./branch/main.ts";
import { SignVerifyOptions } from "../tokens/types.ts";
import { FunRouterOptions } from "../../../types.ts";
import { CommonRequestMorphism, RequestMorphism} from "./types.ts";
import nativeComponets from "./nativeComponets.ts";
import nativeMaps from "./nativeMaps.ts";

export type specialOptions = {
  mutable?: true;
  branch?: boolean;
} & FunRouterOptions;

export default (o?: specialOptions) =>
(f: CommonRequestMorphism  | RequestMorphism) =>
(ar: string[]) =>
  ar.length === 0 && !(o && "branch" in o)
    ? ((r: Request) => r) 
    : (
      (el) => el
    )(
      (
        (table) =>
          (
            (functions) =>
              functions.reduce(
                (s, k) => s(k),
                new Function(
                  ` return ${
                    table.map((x) => x.type === 1 ? x.name + "=>" : "").join("")
                  } ${
                    f.resolve && checkAsync(f)
                      ? o && "branch" in o ? " r=>async b=> " : " async r=> "
                      : o && "branch" in o
                      ? "r=>b=>"
                      : "r=>"
                  }({${table.map((x) => x.name + ":" + x.value).join(",")}})`,
                )(),
              )
          )(
            ((or) => nativeComponets(or)(f)(table)
              )(
                "mutable" in f
                  ? { ...o, mutable: true } as FunRouterOptions
                  : o,
              ),
          )
      )( 
        nativeMaps(o)(f)(ar)(("mutable" in f) || (o && "mutable" in o) || false)
      ),
    );
