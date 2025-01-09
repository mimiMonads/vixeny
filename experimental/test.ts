import { compose } from "./fixpoint.ts";

import { aaa, bbb, ccc } from "./functions.ts";

const { termminate, resolver } = compose({
  threads: 2,
})({
  ccc,
  aaa,
  bbb,
});

await Promise.all([
  resolver.aaa(new Uint8Array([1])),
  resolver.aaa(new Uint8Array([1])),
  resolver.aaa(new Uint8Array([1])),
  resolver.bbb(new Uint8Array([1])),
  resolver.bbb(new Uint8Array([1])),
  resolver.bbb(new Uint8Array([1])),
  resolver.ccc(new Uint8Array([1])),
  resolver.ccc(new Uint8Array([1])),
  resolver.ccc(new Uint8Array([1])),
]).then(console.log);

termminate();
