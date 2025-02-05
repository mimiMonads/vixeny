import { compose } from "./fixpoint.ts";

import { aaa, bbb, ccc } from "./functions.ts";

const { termminate, resolver, add, awaits } = compose({
  threads: 2,
})({
  ccc,
  aaa,
  bbb,
});

const a = await Promise.all([
  resolver.aaa(new Uint8Array([1])),
  resolver.aaa(new Uint8Array([1])),
  resolver.aaa(new Uint8Array([1])),
  resolver.bbb(new Uint8Array([1])),
  resolver.bbb(new Uint8Array([1])),
  resolver.bbb(new Uint8Array([1])),
  resolver.ccc(new Uint8Array([1])),
  resolver.ccc(new Uint8Array([1])),
  resolver.ccc(new Uint8Array([1])),
]);

// const b = await Promise.all([
//   resolver.aaa(new Uint8Array([1])),
//   resolver.aaa(new Uint8Array([1])),
//   resolver.aaa(new Uint8Array([1])),
//   resolver.bbb(new Uint8Array([1])),
//   resolver.bbb(new Uint8Array([1])),
//   resolver.bbb(new Uint8Array([1])),
//   resolver.ccc(new Uint8Array([1])),
//   resolver.ccc(new Uint8Array([1])),
//   resolver.ccc(new Uint8Array([1])),
// ]);

//console.log(b);

termminate();
