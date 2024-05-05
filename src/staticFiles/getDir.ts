import bunSyncCheckDir from "./transverseFiles.ts";
import denoCheckRead from "./checkRead_Deno.ts";
import joiner from "./joiner.ts";

export default (s: string) =>
    bunSyncCheckDir(joiner)(denoCheckRead.getFiles)(denoCheckRead.stats)(
      s,
    ).map((y) => y[0]).flat()