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

/**
 * Serves a web application using the specified runtime environment.
 *
 * @param {Object} inf - Configuration object for the server.
 * @param {string} [inf.runtime] - The runtime environment to use ("Bun" or "Deno").
 * @param {number} [inf.port=8000] - The port number on which the server will listen.
 * @param {string} [inf.hostname="localhost"] - The hostname on which the server will listen.
 * @param {Function} inf.handler - The request handler function.
 *
 * @throws {Error} If the specified runtime is not supported.
 *
 * @example
 * serve({
 *   runtime: "Deno",
 *   port: 8080,
 *   handler: (req) => new Response("Hello, world!")
 * });
 */
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
