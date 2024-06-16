import { runtime } from "../../../main.ts";
import type { Petition } from "../../morphism.ts";
import type { FunRouterOptions } from "../../options.ts";

export default (_o?: FunRouterOptions<any>) => (_p: Petition) => ({
  textOf: textOf(),
  writeText: writeText(),
});

export interface FileHandler {
  textOf(path: string): Promise<Uint8Array>;
  writeText(path: string): (data: string) => Promise<true | false>;
}

const textOf = () =>
  (
    (fun) => fun as FileHandler["textOf"]
  )(
    runtime.name() === "Bun"
      ? async (path: string) =>
        //@ts-ignore
        await Bun.file(path).text()
          .catch(() => null)
      : ((decoder) => async (path: string) =>
        //@ts-ignore
        await Deno.readFile(path)
          .then((x: any) => decoder.decode(x))
          .catch(() => null))(
          new TextDecoder("utf-8"),
        ),
  );

const writeText = () =>
  (
    (fun) => fun as unknown as FileHandler["writeText"]
  )(
    runtime.name() === "Bun"
      ? (path: string) => async (data: string) => {
        //@ts-ignore
        await Bun.write(path, data)
          .then(() => true)
          .catch(() => false);
      }
      : ((encoder) => (path: string) => async (data: string) => {
        //@ts-ignore
        await Deno.writeFile(path, encoder.encode(data))
          .then(() => true)
          .catch(() => false);
      })(new TextEncoder()),
  );
