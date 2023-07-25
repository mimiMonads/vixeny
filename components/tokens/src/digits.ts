import table from "./table.ts";
import shaTable from "./tableSha.ts";
import { SignVerifyOptions } from "../types.ts";

export default (txt: string) =>
  (seed: SignVerifyOptions) =>
    (
      (
        new Function(`
         return a=> ar => ${table(seed)(txt)}
        `)
      )()
    )(shaTable(txt + seed.seed)) as (ar: number[]) => number;
