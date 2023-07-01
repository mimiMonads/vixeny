import vixeny from "./fun.ts";


import { serve } from "https://deno.land/std/http/server.ts";



let count = 0

serve(
    vixeny()([
        {
            path: "/hello_world",
            f: () => "2",
          },
          {
            path: "/random_number",
            f: () => "3",
          },
          {
            path: "/plus_1",
            f: () => "4",
            method: "POST",
          },
          {
            path: "/minus_1",
            f: () => "5",
            method: "POST",
          },
          {
            path: "/count",
            f: () => "1"
          },
])
)