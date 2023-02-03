import { funRouterOptions } from "../types.ts";
import { ObjectRawResponseStatic } from "./types.ts";
import syncCheckDir from "./syncCheckDir.ts";
import atlas from "../builder/atlas/main.ts";
import staticPaths from "./staticPaths.ts";
import mime from "../components/util/mime.ts";
import solver from "../builder/solver.ts";
import split from "../builder/atlas/split.ts";

export default (o?: funRouterOptions) =>
(f: ObjectRawResponseStatic): (r: Request) => Response | Promise<Response> =>
  ((p) =>
    ((re) =>
      (
        (s) => (r: Request) => re[3][s(r)](r) 
      )(
        solver(o)(re),
      ))(
        atlas(o)(
          split(o)(
            staticPaths( "mime" in  f  && f.mime === false ? [] : "extra" in f ? mime.concat(f.extra): mime )(p)(f.name),
          ),
        ),
      ))(
      syncCheckDir(f.path).map((y) => y[0]).flat(),
    );
