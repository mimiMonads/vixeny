import elements from "../../components/util/elements.ts";
import { funRouterOptions } from "../../types.ts";
import aComposer from "../aComposer.ts";
import checker from "../checker.ts";
import { ObjectRawResponseCommon } from "../types.ts";
import { ResolveOptions } from "./types.ts";

export default (debug: boolean) =>(o?: funRouterOptions)=>(path:string)=>(table:ResolveOptions[]) => 
    debug === true
    ?  table
    .map(x => ({ ...x, path: path }))
    .map(x => ({
    name: x.name,
    f: (
        composed =>
        x.f.constructor.name === "AsyncFunction"|| composed.constructor.name === "AsyncFunction" 
        ? `((a=>k=>async r=>await k(await a(r)))(${composed.toString()})(${x.f.toString()}))`
        : `((a=>k=>r=>k(a(r)))(${composed.toString()})(${x.f.toString()}))`
    )(
        aComposer(o)(x as ObjectRawResponseCommon)(checker(x.options?.remove ?? [])(elements)(x.options?.add ?? [])(x.f.toString())) as (r:Request) => any | Promise<any>

    )
    }
))
    :  table
        .map(x => ({ ...x, path: path }))
        .map(x => ({
        name: x.name,
        f: (
            composed =>
            x.f.constructor.name === "AsyncFunction" || composed.constructor.name === "AsyncFunction" 
            ?
            (a => (k: (arg0: any) => any) =>  async (r: Request) => await k( await a (r)))(composed)( x.f)

            : (a => (k: (arg0: any) => any) => (r: Request)=> k(a(r)))(composed)(x.f)
        )(
            (typeof x.options?.only !== "undefined" && x.options.only.length > 0)
            ? aComposer(o)(x as ObjectRawResponseCommon)(x.options.only)
            : aComposer(o)(x as ObjectRawResponseCommon)(checker(x.options?.remove ?? [])(elements)(x.options?.add ?? [])(x.f.toString())) as (r:Request) => any | Promise<any>
        
        )
        }
    ))