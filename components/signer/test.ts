import crcTable from "./crcTable.ts";
import table from "./table.ts";

export default (
  (
    new Function(`
         return a=> ar => ${table}
        `)
  )()
)(crcTable());
