import { info } from "./types.ts"

export default
(position:number) => 
(map:info) => 
    map.lastParam === 0 && map.elements.every( x => x[0] === map.startsWith)
        ?  ` s.indexOf("${map.path.slice(1,map.firstParam + 1)}") === 1 ? ${position} : `
        :  map.list.reduce(
            (acc,x,id) => 
                !map.map[id]
                ? id === 0 
                    ? [ ...acc , ...[` s.slice(1, a0 - 1) === "${x}" `] ]
                    :  id===(map.list.length -1 ) 
                        ? [...acc,   ...[` s.slice(a${id-1}).indexOf("${x}") === 0 `] ]
                        :  [...acc, ...[` s.slice(a${id-1}, a${id} - 1) === "${x + (map.endsInSlash ? "/" : "")}" `]]
                : acc,
                [] as string[]
        ).join("&&") + " ? " + position + " : "