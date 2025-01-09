import { bench, boxplot, group, run, summary } from "mitata";
import { compose } from "./fixpoint.ts";
import { aaa } from "./functions.ts";

const EMPTYUI8 = new Uint8Array([1, 2, 3]);

const f = aaa.f;

const { termminate, resolver } = compose({
  threads: 1,
})({
  aaa,
});

boxplot(async () => {
  group("5", () => {
    summary(() => {
      bench("main * 5", async () => {
        await f(EMPTYUI8), await f(EMPTYUI8);
      });

      bench(" 5 thread ", async () => {
        await resolver.aaa(EMPTYUI8), await resolver.aaa(EMPTYUI8);
      });
    });
  });
});
await run();

await resolver.aaa(new Uint8Array([5, 3, 2, 1, 0])).then(console.log);

termminate();
