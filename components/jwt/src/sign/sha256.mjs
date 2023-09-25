

export default  (Buffer) =>
(sha256) => (header=Buffer.from(JSON.stringify({
  alg: "HS256",
  typ: "JWT"
}) ).toString('base64url')  + ".") => (key) =>
  (
    (hmac) => (message) =>
      (
          json =>
          header + json + "." +
          sha256(
            Buffer.concat([
              Buffer.alloc(64).map((_x, i) => hmac[i] ^ 0x5c),
              sha256(
                Buffer.concat([
                  Buffer.alloc(64).map((_x, i) => hmac[i] ^ 0x36),
                  Buffer.from(header + json),
                ])
              ).digest(),
            ])
          )
            .digest().toString("base64url")
      )(
          Buffer.from(JSON.stringify(message)).toString('base64url')
      )
  )(
    key.length > 64
      ? sha256(key).digest()
      : key.length < 64
      ? Buffer.concat([key, Buffer.alloc(64 - key.length)])
      : key
  );

