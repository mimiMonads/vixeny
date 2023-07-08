import table from "./table.ts";
import shaTable from "./tableSha.ts";
import { SignVerifyOptions } from "../types.ts";

export default (txt: string) =>
  async (seed: SignVerifyOptions) =>
    (
      (
        new Function(`
         return a=> ar => ${await table(seed)(txt).then((x) => x)}
        `)
      )()
    )(await shaTable(txt + seed.seed)) as (ar: number[]) => number;
