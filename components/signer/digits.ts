import crcTable from "./crcTable.ts";
import table from "./table.ts";
import { SignVerifyOptions } from "./types.ts";

export default (txt: string) =>
  async (seed: SignVerifyOptions) =>
    (
      (
        new Function(`
         return a=> ar => ${await table(seed)(txt).then((x) => x)}
        `)
      )()
    )(crcTable(seed.crcStart)) as (ar: number[]) => number;
