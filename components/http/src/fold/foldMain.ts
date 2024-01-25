import { FunRouterOptions } from "../../types.ts";
import response from "../framework/optimizer/response.ts";
import { RequestMorphism, CommonRequestMorphism, AnyMorphismMap, CryptoOptions, MorphismMap, ParamOptions, QueryOptions } from "../framework/optimizer/types.ts";

const wrap = <O extends FunRouterOptions>(o?: O) =>
(a = [] as (
    RequestMorphism<any,any,any,any,any,any> | 
    CommonRequestMorphism<any,any,any,any,any,any>
)[]) => ({
    standart: <
    T extends MorphismMap,
    B extends AnyMorphismMap,
    Q extends QueryOptions,
    P extends ParamOptions,
    CR extends CryptoOptions,
  >(ob: Omit<CommonRequestMorphism<T, B, Q, P, O, CR>, 'mutable'>) => wrap(o)(a.concat({...ob})),
  request: <
  T extends MorphismMap,
  B extends AnyMorphismMap,
  Q extends QueryOptions,
  P extends ParamOptions,
  CR extends CryptoOptions,
>(ob: Omit<Omit<RequestMorphism<T, B, Q, P, O, CR>,'type'>, 'mutable'>) => wrap(o)(a.concat({...ob, type: 'request'} )),

    size: ()=> void console.log(a.length) ?? wrap(o)(a),
    names: ()=> void  a.forEach(x => console.log(x.path)) ?? wrap(o)(a),
    compose: (s:string) => 
        a.some(x => x.path === s)
        ? (r: Request) => Promise.resolve(response(o)(
            a.find( x => x.path === s) as RequestMorphism | CommonRequestMorphism
        )(r)) 
        : void console.error( s + ' was not found.') ?? (() => Promise.resolve(null)),
    copy: ()=> wrap({...o})([...a]),
    unwrap: () => [...a]
  })

  wrap({})()
    .standart({
        path: '/hello',
        f: () => 'hello'
    })
    .request({
        path: '/request',
        f: () => new Response()
    })
    .compose('/hello')(new Request('http://localhost:3030/hello'))
    .then(console.log)