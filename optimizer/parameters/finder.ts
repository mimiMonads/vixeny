import {info} from "./types.ts"


export default(info : info) => 
`s=>${
  Array.from(
      {
        length: info.elements.length  - 1  ,
      },
      (
        _,
        i,
      ) => [
        `(a${i}=>`,
        `)(s.indexOf("/"${i !== 0 ? `,a${i - 1}` : ""}) + 1)`,
      ],
    ).reverse().reduce((acc, v) => v[0] + acc + v[1], `({${
    Array.from({
      length: info.elements.length,
    },(_,id) => 
    id === 0 
        ? ` ${info.elements[id].slice(1)} : s.slice(0, a0 - 1)`
          :  id===(info.elements.length -1) 
            ?  ` ${info.elements[id].slice(1)} : s.slice(a${id-1})` 
          : `  ${info.elements[id].slice(1)} : s.slice(a${id-1}, a${id} - 1)`
 
          ).join(",")
  }})` )}`