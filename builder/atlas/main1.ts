import {
  ArraySwap,
  ParamsMethod,
  RequestFunction,
} from "../types.ts";
import { funRouterOptions } from "../../types.ts"
import badMethod from "../../components/util/badMethod.ts";
import notFound from "../../components/util/notFound.ts";

type InnerObj = [string, RequestFunction] | [];
type InnerObjEmpty = [string, RequestFunction];
type Map = Record<number, Record<number, InnerObj[]>>;


export type PartialAtlas = (Atlas | [])

export type Atlas = [
  ParamsMethod[],
  number[][],
  string[][][],
  RequestFunction[],
  (Atlas | []),
];

export default (_o?: funRouterOptions) =>
  (a: [ArraySwap[], PartialAtlas]): Atlas =>
    (
      (ParamsMethod) =>
        (
          (ob) =>
            (
              (il) =>
                (
                  (al) =>
                    (
                      (ul) => [ParamsMethod, il, al, ul, a[1]]
                    )(
                      il.map(
                        (x, i) =>
                          x.map(
                            (y) =>
                              ob[i][y].map(
                                (z) => [z[1]],
                              ),
                          ) as [RequestFunction][][],
                      )
                        .flat(3)
                        .concat(typeof a[1][3] == "undefined" ? [] : a[1][3].length < 1 ? [] : [...a[1][3]].slice(0, a[1][3].length - 2))
                        .concat(notFound)
                        .concat(badMethod),
                    )
                )(
                  il.map(
                    (x, i) =>
                      x.map(
                        (y) => ob[i][y].map((x) => x[0]),
                      ),
                  ) as string[][][],
                )
            )(
              Object.keys(ob)
                .map((x) => Number(x))
                .map(
                  (x) =>
                    Object
                      .keys(ob[Number(x)])
                      .map((y) => Number(y)),
                ) as [number[]],
            )
        )(
          Object.fromEntries(
            ParamsMethod.map((x) => a[0].filter((y) => x === y[2]))
              .map(
                (x) =>
                  ((p) =>
                    Object.fromEntries(
                      p.map(
                        (y) => [
                          y,
                          (
                            (za) =>
                              za[0][0] === ""
                                ? za
                                  .slice(1)
                                  .reduceRight(
                                    (acc, z) => acc.concat([z]),
                                    [za[0]],
                                  )
                                  .reverse()
                                : za
                          )(
                            x
                              .reduce(
                                (acc, z) =>
                                  z[0] === y
                                    ? [...acc, [z[1], z[3]]] as InnerObjEmpty[]
                                    : acc,
                                [] as InnerObjEmpty[],
                              ),
                          ),
                        ],
                      ),
                    ))(
                      x.map((y) => y[0])
                        .reduce(
                          (acc, y) => acc.includes(y) ? acc : acc.concat([y]),
                          [] as number[],
                        ) as number[],
                    ),
              )
              .map(
                (x, i) => [i, x],
              ),
          ) as Map,
        )
    )(
      a[0]
        .reduce((acc: ParamsMethod[], am) =>
          acc
            .includes(am[2])
            ? acc
            : [...acc, am[2]], []) as ParamsMethod[],
    );

