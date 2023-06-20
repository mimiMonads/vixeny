type FsPromisesType = {
    getFiles: (directoryPath: string) => string[];
    stats: (directoryPath: string) => { isDirectory: () => boolean };
  };
 

  export default await (async () =>
    // deno-lint-ignore no-async-promise-executor
    await new Promise<FsPromisesType>(async (resolve, err) =>
      typeof Deno === "object"
        ? err()
        : resolve(await import("fs")),
    ))().then((x: unknown) => ({
    getFiles: (x as {readdirSync: (directoryPath: string) => string[]; readdir: (directoryPath: string) => string[] }).readdirSync,

    stats: (x as {
statSync: (directoryPath: string) => { isDirectory: () => boolean; }; stat: (directoryPath: string) => { isDirectory: () => boolean } 
}).statSync,
  })  as FsPromisesType).catch( () => "Deno");
  