export default (Buffer) =>
(sha256) =>
(
  header = Buffer.from(JSON.stringify({
    alg: "HS256",
    typ: "JWT",
  })).toString("base64url") + ".",
) =>
(key) =>
  (
    (hmac) =>
      ((lf) => (rg) => (message) =>
        (
          (json) =>
            header + json + "." +
            sha256(
              Buffer.concat([
                lf,
                sha256(
                  Buffer.concat([
                    rg,
                    Buffer.from(header + json),
                  ]),
                ).digest(),
              ]),
            )
              .digest().toString("base64url")
        )(
          Buffer.from(JSON.stringify(message)).toString("base64url"),
        ))(new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x5c))(
          new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x36),
        )
  )(
    key.length > 64
      ? sha256(key).digest()
      : key.length < 64
      ? Buffer.concat([key, Buffer.alloc(64 - key.length)])
      : key,
  );

//   import concatTwoUint8Array from "../../../bytes/src/concatTwoUint8Array.mjs";
// export default (Buffer) =>
// (sha256) =>
// (
//   header = Buffer.from(JSON.stringify({
//     alg: "HS256",
//     typ: "JWT",
//   })).toString("base64url") + ".",
// ) =>
// (key) =>
//   (
//     (hmac) => (message) =>
//       (
//         (json) =>
//           header + json + "." +
//           sha256(
//             concatTwoUint8Array(
//               new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x5c)
//             )(
//               sha256(
//                 concatTwoUint8Array(
//                   new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x36)
//                 )(
//                   Buffer.from(header + json)
//                 )
//               ).digest(),
//             )
//           )
//             .digest().toString("base64url")
//       )(
//         Buffer.from(JSON.stringify(message)).toString("base64url"),
//       )
//   )(
//     key.length > 64
//       ? sha256(key).digest()
//       : key.length < 64
//       ? Buffer.concat([key, Buffer.alloc(64 - key.length)])
//       : key,
//   );
