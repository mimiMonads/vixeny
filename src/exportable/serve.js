import { runtime } from "../../main.ts"

const deno = (inf) => 
    void Deno.serve(
    {
        port: inf.port ?? 8000,
        hostname: inf.hostname ?? "localhost",
      },
      inf.handler
)

const bun = (inf) => 
    void Bun.serve({
        fetch: inf.handler,
        port: inf.port ?? 8000,
        hostname: inf.hostname ?? "localhost",
      })

const serve = (inf) => {

    if (inf.runtime) {
        switch (inf.runtime){
            case "Bun": 
                bun(inf)
            break;
            case "Deno": 
                deno(inf)
            break;
            default:
                throw new Error(`V_RUNTIME_NO_SUPPORTED: ${inf.runtime}`)
        }
    }

    if (runtime.name()) {
        switch (inf.runtime){
            case "Bun": 
                bun(inf)
            break;
            case "Deno": 
                deno(inf)
            break;
            default:
                throw new Error(`V_RUNTIME_NO_SUPPORTED: ${inf.runtime}`)
        }
    }
}
   
export { serve }
