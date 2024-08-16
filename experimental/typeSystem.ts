// Basic types

// Options
type Options = {
  queryOptions: QueryOptions;
  resolveMap: ResolveMap<any>;
  branchMap: BranchMap<any>;
};
type QueryOptions = {
  unique?: true;
  name: string;
} | {
  only?: string[];
} | {};

type ResolveMap<T> = {
  [K in keyof T]: Morphism<
    {
      type: "morphism";
      branch: undefined;
      
    }
  >;
};

type BranchMap<T> = {
    [K in keyof T]: Morphism<
      {
        type: "morphism";
        branch: boolean | undefined;
      }
    >;
  };


// Map

type typeMorphism = "response" | "request" | "morphism" | "base";

type HasPath<P extends Map> = P extends { hasPath: true }
  ? { readonly path: string }
  : {};

type HasType<P extends Map> = P extends { type: typeMorphism }
  ? P extends { typeNotNeeded: true } ? {}
  : P extends { type: "morphism" } ? {}
  : { readonly type: P["type"] }
  : {};

type ExtraKeys<P extends Map> = HasPath<P> & HasType<P>;

type Map = {
  hasPath?: boolean;
  typeNotNeeded?: boolean;
  type?: typeMorphism;
  branch?: boolean;
  isAPetition?: boolean;
  mutable?: true;
  specificReturnType?: boolean;
  returnType?: unknown;
};

type Morphism<
  MO extends Map = Map,
  OP extends Options = Options,
  R = any,
> =
   {
    readonly active?: MO["isAPetition"] extends true ? boolean : never;
    readonly isUsing?: MO["isAPetition"] extends true ? string[] : never;
    readonly query?: OP['queryOptions'];
    readonly branch?: OP["branchMap"];
    readonly resolve?: OP["resolveMap"];
    readonly r?: MO["type"] extends "response"
      ? (r: Request) => Promise<Response> | Response
      : never;
    readonly f: {
      (
        ctx: Ctx<
        OP['queryOptions']
        >,
      ): MO["specificReturnType"] extends true ? MO["returnType"]
        : MO["type"] extends "response" ? Response | Promise<Response>
        : MO["type"] extends "request" ? Response | Promise<Response>
        : MO["type"] extends "base" ? BodyInit | Promise<BodyInit> | null
        : R;
    };
  }
  & ExtraKeys<MO>;

interface Ctx<
    QueryType = any
> {
  //resolve: { [V in keyof R]: Awaited<ReturnType<R[V]["f"]>> };
  query: QueryType
}





const ff = < 
a  extends { type: "morphism"}, 
B extends  > ( d : Morphism<a,B>) =>  ''



ff({
    query: {
        unique: true,
        name: 'ji'
    },
    // This type should be string
    f: s => s.query
})