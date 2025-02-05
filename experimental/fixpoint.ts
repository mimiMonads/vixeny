import { getCallerFile } from "./helpers.ts";
import { genTaskID } from "./helpers.ts";
import { createContext } from "./main.ts";
import type { PromiseMap } from "./mainQueue.ts";
import { isMainThread } from "node:worker_threads";

export const isMain = isMainThread;
type Args = "void" | "uint8";
const symbol = Symbol.for("FIXEDPOINT");

type FixPoint<A extends Args> = {
  args: A;
  f: (
    args: A extends "void" ? void : Uint8Array,
  ) => Promise<Uint8Array>;
};

type SecondPart = {
  statusSignal: 224 | 192;
  [symbol]: string;
  id: number;
  importedFrom: string;
};

type Composed = {
  args: Args;
  f: (...ags: any) => any;
} & SecondPart;

type ReturnFixed<A extends Args> = FixPoint<A> & SecondPart;

export const fixedPoint = <A extends Args>(
  I: FixPoint<A>,
): ReturnFixed<A> => {
  return ({
    ...I,
    statusSignal: I.args === "void" ? 224 : 192,
    id: genTaskID(),
    importedFrom: new URL(getCallerFile(2)).href,
    [symbol]: "vixeny",
  });
};

type UnionReturnFixed = ReturnFixed<Args>;

type FunctionMapType<T extends Record<string, Composed>> = {
  [K in keyof T]: T[K]["f"];
};

type FunctionMapTypeID<T extends Record<string, Composed>> = {
  [K in keyof T]: T[K]["f"] extends (args: infer A) => any ? {
      (arg: A): number;
    }
    : never;
};

type FunctionMapAwaits<T extends Record<string, Composed>> = {
  [K in keyof T]: (n: number[]) => ReturnType<
    T[K]["f"]
  >[];
};

export type GetFunctions = ReturnType<typeof getFunctions>;

export const getFunctions = async ({ list, ids }: {
  list: string[];
  isWorker: boolean;
  ids: number[];
}) => {
  const results = await Promise.all(
    list.map(async (imports) => {
      const module = await import(imports);
      return Object.entries(module) // Use `Object.entries` to include names
        .filter(
          ([_, value]): //@ts-ignore trust me bro
          value is ReturnFixed<any> =>
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value) &&
            Object.getOwnPropertySymbols(value).some(
              (sym) => sym === Symbol.for("FIXEDPOINT"),
            ),
        )
        .map(([name, value]) => ({
          //@ts-ignore trust me
          ...value,
          name,
        }));
    }),
  );

  // Flatten the results, filter by IDs, and sort
  const flattenedResults = results
    .flat()
    .filter((obj) => ids.includes(obj.id))
    .sort((a, b) => a.name.localeCompare(b.name));

  return flattenedResults as unknown as (UnionReturnFixed & { name: string })[];
};

const toListAndIds = (args: Record<string, Composed>, filter?: string) => {
  const result = Object.values(args)
    .reduce(
      (acc, v) => (
        acc[0].add(v.importedFrom), acc[1].add(v.id), acc
      ),
      [
        new Set<string>(),
        new Set<number>(),
      ] as [
        Set<string>,
        Set<number>,
      ],
    );

  if (filter) {
    console.log(filter);
    result[0].delete(filter);
    console.log(result);
  }

  return Object.fromEntries([
    ["list", [...result[0]]],
    ["ids", [...result[1]]],
  ]) as {
    list: string[];
    ids: number[];
  };
};

const loopingBetweenThreads =
  ((n) => (functions: Function[]) => (max: number) => (args: any) =>
    n === max ? functions[n = 0](args) : functions[n++](args))(0);

export const compose = ({
  threads,
}: {
  threads?: number;
}) =>
<T extends Record<string, Composed>>(args: T) => {
  const promisesMap: PromiseMap = new Map();

  const { list, ids } = toListAndIds(args);

  const listOfFunctions = Object.entries(args).map(([k, v]) => ({
    ...v,
    name: k,
  }))
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(listOfFunctions);

  const workers = Array.from({
    length: threads ?? 1,
  })
    .map((_) =>
      createContext({
        promisesMap,
        list,
        ids,
      })
    );

  const addsWrap =
    (isActive: (n: void) => void) =>
    (adds: (n: Uint8Array) => number) =>
    (
      args: Uint8Array,
    ) => {
      const r = adds(args);
      isActive();
      return r;
    };

  const adds = workers.map(
    (worker) => {
      return listOfFunctions
        .map((list, index) => ({ ...list, index }))
        .reduce((acc, v) => {
          {
            acc.set(
              v.name,
              addsWrap(worker.isActive)(
                worker.queue.add(v.statusSignal)(v.index),
              ),
            );
          }
          return acc;
        }, new Map<string, ReturnType<ReturnType<typeof addsWrap>>>());
    },
  )
    .reduce((acc, map) => {
      map.forEach(
        (v, k) => {
          const fun = acc.get(k);
          if (fun) {
            acc.set(k, [...fun, v]);
          } else {
            acc.set(k, [v]);
          }
        },
      );

      return acc;
    }, new Map<string, Function[]>());

  const map = workers.map(
    (worker) => {
      return listOfFunctions
        .map((list, index) => ({ ...list, index }))
        .reduce((acc, v) => {
          {
            acc.set(
              v.name,
              worker.resolver({
                queue: worker.queue,
                fnNumber: v.index,
                statusSignal: v.statusSignal,
              }),
            );
          }
          return acc;
        }, new Map<string, ReturnType<typeof worker.resolver>>());
    },
  )
    .reduce((acc, map) => {
      map.forEach(
        (v, k) => {
          const fun = acc.get(k);
          if (fun) {
            acc.set(k, [...fun, v]);
          } else {
            acc.set(k, [v]);
          }
        },
      );

      return acc;
    }, new Map<string, Function[]>());

  const resolve = new Map<string, (args: any) => Promise<any>>();
  const add = new Map<string, (args: any) => Promise<any>>();
  const awaits = new Map<string, (args: any) => Promise<any>>();

  // Resolving maps before
  map.forEach((v, k) => {
    resolve.set(k, loopingBetweenThreads(v)(v.length));
  });

  adds.forEach((v, k) => {
    add.set(k, loopingBetweenThreads(v)(v.length));
  });

  map.forEach((v, k) => {
    awaits.set(k, workers[0].awaitArray);
  });

  return {
    termminate: () => workers.forEach((worker) => worker.kills()),
    resolver: Object.fromEntries(resolve) as unknown as FunctionMapType<T>,
    add: Object.fromEntries(add) as unknown as FunctionMapTypeID<T>,
    awaits: Object.fromEntries(awaits) as unknown as FunctionMapAwaits<T>,
  };
};
