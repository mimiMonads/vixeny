import crcTable from "./crcTable.ts";
import table from "./table.ts";

export default async(seed:string) => (
  (
     new Function(`
         return a=> ar => ${
            typeof seed === "string"
            ? await table("a").then(x => x)
            : await table("a")
         }
        `)
  )()
)(crcTable());
