import type { info } from "./types.ts";

export default (info: info) =>
  info && "bind" in info && typeof info.bind === "string"
    ? `(u =>  u.indexOf("?") === -1 
        ? u.slice(${(info.bind?.length || 0) + info.firstParam} ${
      info.lastParam === 0 ? "" : ", -" + info.lastParam
    }) 
        : u.slice(${
      (info.bind?.length || 0) + info.firstParam
    }, u.indexOf("?") ${info.lastParam === 0 ? "" : " -" + info.lastParam})
        )`
    : `(n => u =>
            n !== -1
                ? u.indexOf("?") === -1 
                    ? u.slice(n ${
      info.lastParam === 0 ? "" : " , - " + info.lastParam
    })
                    : u.slice(n , u.indexOf("?") ${
      info.lastParam === 0 ? "" : " -" + info.lastParam
    })
                : u.indexOf("?") === -1 
                    ?  u.slice( n = u.split("/").filter((x) => x !== "" ).reduce((acc, x, ul) =>ul<= 1 ? acc + x.length : acc,2,0) + ${
      info.firstParam + 1
    } ${
      info.lastParam === 0 ? "" : ", -" + info.lastParam
    } ).split("/").filter((x) => x !== "").join("/")
                    :  u.slice( n = u.split("/").filter((x) => x !== "").reduce((acc, x, ul) =>ul<= 1 ? acc + x.length : acc,2,0 ${
      info.lastParam === 0 ? "" : ", -" + info.lastParam
    }) + ${info.firstParam + 1} , u.indexOf("?") ${
      info.lastParam === 0 ? "" : " -" + info.lastParam
    } ).split("/").filter((x) => x !== "").join("/")
        )(-1)`;
