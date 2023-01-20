import { funRouterOptions } from "../types.ts";
import { ObjectRawResponseStatic } from "./types.ts";
import syncCheckDir from "./syncCheckDir.ts";
import atlas from "../builder/atlas.ts";
import arraySwap from "../builder/arraySwap.ts";
import resolver from "../builder/resolver.ts";
import staticPaths from "./staticPaths.ts";
import mime from "../components/util/mime.ts";

export default (o?: funRouterOptions) =>
(f: ObjectRawResponseStatic): (r: Request) => Response | Promise<Response> =>
  ((p) =>
    ((re) =>
      (
        (s) => (r: Request) => (
          ((p) => re[3][p](r))(
            s(0)(r.url),
          )
        )
      )(
        resolver(o)(re[3].length)(re[1])(re[2])([]),
      ))(
        atlas(o)(
          arraySwap(o)(
            staticPaths( "mime" in  f  && f.mime === false ? [] : "extra" in f ? mime.concat(f.extra): mime )(p)(f.name),
          ),
        ),
      ))(
      syncCheckDir(f.path).map((y) => y[0]).flat(),
    );
