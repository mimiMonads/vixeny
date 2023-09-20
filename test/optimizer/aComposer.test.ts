import signer from "../../components/tokens/signer.ts";
import aComposer from "../../optimizer/aComposer.ts";
import assert from "node:assert";
import test from "node:test"
//await ((hi: (arg0: any) => any)=> async (r: any)=>({hi:await hi(r)}))((hi=>async (f: any) =>({hi:await hi(f)})) (async (f: { blob: () => any; })=> await(await f.blob()).text()))(new Request("http://hi.com/", {method: "POST", body: "hello"})),
test(
  "Query",
  (_) =>
    assert.deepStrictEqual(
      (aComposer({ hasName: "http://localhost:8080/" })({
        path: "/test",
        f: (r) => r.query.hello || "nothing",
      })(["query"]))(new Request("http://localhost:8080/test?hello=hi")).query
        .hello,
      "hi",
    ),
);
test(
  "Query",
  (_) =>
    assert.deepStrictEqual(
      (aComposer()({
        path: "/test",
        f: (r) => r.query.hello || "nothing",
      })(["query"]))(new Request("http://localhost:8080/test?hello=hi")).query
        .hello,
      "hi",
    ),
);
test(
  "Query",
  (_) =>
    assert.deepStrictEqual(
      (aComposer({ hasName: "http://localhost:8080/" })({
        path: "/test",
        f: (r) => r.query.hello || "nothing",
      })(["query", "req"]))(new Request("http://localhost:8080/test?hello=hi"))
        .query.hello,
      "hi",
    ),
);
test(
  "Params",
  (_) =>
    assert.deepStrictEqual(
      (aComposer({ hasName: "http://localhost:8080/" })({
        path: "/test/:id",
        f: (r) => r.param.id,
      })(["param"]))(new Request("http://localhost:8080/test/1")).param.id,
      "1",
    ),
);

test(
  "Params",
  (_) =>
    assert.deepStrictEqual(
      (aComposer({ hasName: "http://localhost:8080/" })({
        path: "/test/:a/:b/:c/",
        f: (r) => r.param.id,
      })(["param"]))(new Request("http://localhost:8080/test/1/2/3/")).param.b,
      "2",
    ),
);
test(
  "Params",
  (_) =>
    assert.deepStrictEqual(
      (aComposer()({
        path: "/test/:a/:b/:c/",
        f: (r) => r.param.id.toString(),
      })(["param"]))(new Request("http://localhost:8080/test/1/2/3/")).param.b,
      "2",
    ),
);
test(
  "Sign",
  (_) =>
    assert.deepStrictEqual(
      (aComposer()({
        path: "/test/",
        signer: { seed: "test" },
        f: (r) => r.sign("hello"),
      })(["sign"]))(new Request("http://localhost:8080/test/")).sign("12345678955"),
      signer({ seed: "test" })("12345678955"),
    ),
);
test(
  "Date",
  (_) =>
    assert.deepStrictEqual(
      typeof (aComposer()({
        path: "/test/",
        signer: { seed: "test" },
        f: (r) => r.date.toString(),
      })(["date"]))(new Request("http://localhost:8080/test/")).date,
      "number",
    ),
);
test(
  "randomNumber",
  (_) =>
    assert.deepStrictEqual(
      typeof (aComposer()({
        path: "/test/",
        signer: { seed: "test" },
        f: (r) => r.randomNumber.toString(),
      })(["randomNumber"]))(new Request("http://localhost:8080/test/")).randomNumber,
      "number",
    ),
);
test(
  "Hash",
  (_) =>
    assert.deepStrictEqual(
      typeof (aComposer()({
        path: "/test/",
        signer: { seed: "test" },
        f: (r) => r.hash,
      })(["hash"]))(new Request("http://localhost:8080/test/")).hash,
      "string",
    ),
);
test(
  "cookie",
  (_) =>
    assert.deepStrictEqual(
      (aComposer()({
        path: "/test/",
        signer: { seed: "test" },
        f: (r) => r.cookie?.id ?? "not_found",
      })(["cookie"]))(new Request("http://localhost:8080/test/", {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'id=user'
        }
      })).cookie,
      { id: "user" },
    ),
);
