import type { info } from "./types.ts";

export default (info: info) =>
  info && "hasName" in info && typeof info.hasName === "string"
    ? `(s => s.indexOf("?") === -1 ? ({${info.elements[0].slice(1)}: s.slice(
          ${(info.hasName?.length || 0) + info.firstParam} 
          ${info.lastParam === 0 ? "" : ", -" + info.lastParam})}): ({${
      info.elements[0].slice(1)
    }: s.slice(${
      (info.hasName?.length || 0) + info.firstParam
    }, s.indexOf("?") ${info.lastParam === 0 ? "" : " -" + info.lastParam})})
)`
    : `(n =>s=> n !== -1 ? s.indexOf("?") === -1 ? 
  ({${info.elements[0].slice(1)}: s.slice(n ${
      info.lastParam === 0 ? "" : " , - " + info.lastParam
    })}) : 
  ({${info.elements[0].slice(1)}: s.slice(n , s.indexOf("?") ${
      info.lastParam === 0 ? "" : " -" + info.lastParam
    }) }) : s.indexOf("?") === -1  ? 
  ({${
      info.elements[0].slice(1)
    }: s.slice( n = s.split("/").filter((x) => x !== "" ).reduce((acc, x, u) =>u<= 1 ? acc + x.length : acc,2,0) + ${
      info.firstParam + 1
    } ${
      info.lastParam === 0 ? "" : ", -" + info.lastParam
    } ).split("/").filter((x) => x !== "").join("/") })
    : 
  ({${
      info.elements[0].slice(1)
    }: s.slice( n = s.split("/").filter((x) => x !== "").reduce((acc, x, u) =>u<= 1 ? acc + x.length : acc,2,0 ${
      info.lastParam === 0 ? "" : ", -" + info.lastParam
    }) + ${info.firstParam + 1} , s.indexOf("?") ${
      info.lastParam === 0 ? "" : " -" + info.lastParam
    } ).split("/").filter((x) => x !== "").join("/")}) )(-1)`;
