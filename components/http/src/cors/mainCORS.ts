import { Options } from "./types.ts"


const parse = () => (o:Options) => 
    Object.keys(o).reduce(
        (acc,key) =>  ({...acc, key: o[key].toString()}),
        {}
    )


const stringToFunction = (obj: {[key: string]:string}) =>
        (new Function(`return () => (${JSON.stringify(obj) })`) )() as () => {[key:string]: string}