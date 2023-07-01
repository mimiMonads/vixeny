import syncCheckDir from "../syncCheckDir.ts";
import bunSyncCheckDir from "../syncCheckDir_Bun.ts";
import denoCheckRead from "../checkRead_Deno.ts";
import joiner from "../../components/util/joiner.ts";


export default (s: string) =>
      
      (
        (denoCheck) =>
          typeof denoCheck == "string"
            ? syncCheckDir(s).map((y) => y[0]).flat()
            : bunSyncCheckDir(joiner)(denoCheck.getFiles)(denoCheck.stats)(
              s,
            ).map((y) => y[0]).flat()
      )(
        denoCheckRead,
      )
