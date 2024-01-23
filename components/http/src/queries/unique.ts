import finder from "./finder.ts";

export default (s: string[]) =>
  `(p=>u=>(l=> l!==-1?p(u.slice(l)) :null)(u.indexOf("?")))(s => ${` (a =>a !== -1? (l =>  l !== -1 ? s.slice(a+${
    s[0].length + 1
  },l):s.slice(a+${
    s[0].length + 1
  },s.length))(s.indexOf("&",a)):null)(s.indexOf("${s[0] + "="}")) `})`;
