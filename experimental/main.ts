import { wrap } from "../main.ts";
import { bjscript } from "./multi.ts";
import { bench, run } from "mitata";

const serve = await wrap({
  cyclePlugin: {
    bjscript,
  },
})()
  .get({
    path: "/",
    f: ({ bjscript }) => {
      return bjscript;
    },
  })
  .get({
    path: "/hi",
    f: () => "Hi",
  })
  .compose();

const settings = {
  algorithm: "argon2id", // "argon2id" | "argon2i" | "argon2d"
  memoryCost: 4, // memory usage in kibibytes
  timeCost: 3, // the number of iterations
};

const serve2 = await wrap()()
  .get({
    path: "/",
    f: async ({ req }) => {
      return await Bun.password.hash(req.url, settings);
    },
  })
  .get({
    path: "/hi",
    f: () => "Hi",
  })
  .get({
    path: "/hi2",
    f: () => "Hi2",
  })
  .compose();

const req = new Request("http://localhost/");
const hi = new Request("http://localhost/hi");
const hi2 = new Request("http://localhost/hi2");

// await Promise.resolve(serve(req))
//     .then(async r => await r.text())
//     .then(console.log)

// await Promise.resolve(serve2(req))
//     .then(async r => await r.text())
//     .then(console.log)

const select =
  ((reqs: Request[]) => (n = 0) => n === 2 ? reqs[n = 0] : reqs[n = n + 1])([
    req,
    hi,
    hi2,
  ]);

bench("latency with thread", async () => {
  await serve(select());
});

bench("latency without thread", async () => {
  await serve2(select());
});

await run();
