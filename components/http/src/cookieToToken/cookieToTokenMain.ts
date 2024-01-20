import { FunRouterOptions } from "../../types.ts";
import { CommonRequestMorphism, RequestMorphism, SupportedKeys } from "../framework/optimizer/types.ts";
import cookieToTokenBodyParser from "./cookieToTokenBodyParser.ts";
import cookieToTokenGets from "./cookieToTokenGets.ts";
import cookieToTokenFilter from "./cookieToTokenFilter.ts";

export default (o:FunRouterOptions) => (f: CommonRequestMorphism| RequestMorphism) =>
    f.crypto 
        ? ((s:SupportedKeys) =>(arr:string[]) => arr.reduce( (acc,x) => acc(cookieToTokenGets(s)(x)) ,cookieToTokenBodyParser(arr) ) )
            (f.crypto.globalKey)
            (  cookieToTokenFilter(
                f.f.toString()
                .split(" "))
                ('token')
            )
        : ()=>({SystemError: 'Crypto is requieres'})