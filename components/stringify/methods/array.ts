import string from "../composer/sanitizer.ts";

type Element = (string | string[])[];

/*
* @ Warning it has to be called "o"
*/

// export default (() => ({
//     Y:
// ((f: (arg0: (y: any) => any) => any) =>
//     ((x) => x(x))((x: (arg0: any) => { (arg0: any): any; new (): any }) =>
//       f((y: any) => x(x)(y))
//     ))
// (f => (ar:Element) =>
//       '"' + ar.reduceRight(
//         (acc , x) => typeof x === "string"
//           //@ts-ignore
//           ? acc + ','+ string(x)
//           //@ts-ignore
//           :  acc + f(x)  + ','
//           )
//     )
//   }))()
