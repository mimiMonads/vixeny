import { bench, boxplot, group, run, summary } from "mitata";
import { compose } from "./fixpoint.ts";
import { aaa } from "./functions.ts";

const EMPTYUI8 = new Uint8Array([1, 2, 3]);

const f = aaa.f;

const { termminate, resolver, add } = compose({
  threads: 1,
})({
  aaa,
});

boxplot(async () => {
  group("5", () => {
    summary(() => {
      bench("main * 5", async () => {
        await f(EMPTYUI8),
          await f(EMPTYUI8),
          await f(EMPTYUI8),
          await f(EMPTYUI8);
      });

      bench(" 5 thread ", async () => {
        await Promise.all([
          resolver.aaa(EMPTYUI8),
        ]);
      });
    });
  });
});
await run();
termminate();
