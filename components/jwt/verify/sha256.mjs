
export default     
(Buffer) =>
(hash) =>
(key) =>
  (
    (hmac) => (message) =>
      message.substring(message.lastIndexOf(".") + 1) ===
      hash(
        Buffer.concat([
          new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x5c),
          hash(
            Buffer.concat([
              new Uint8Array(64).map((_x, i) => hmac[i] ^ 0x36),
              Buffer.from(message.substring(0, message.lastIndexOf("."))),
            ])
          ).digest(),
        ]) 
      )
        .digest()
        .toString("base64url")
        ? JSON.parse(
            void console.log(
              Buffer.from(
                message.substring(
                  message.indexOf(".") + 1,
                  message.lastIndexOf(".")
                ),
              "base64url"
            ).toString())  ??
            Buffer.from(
              message.substring(
                message.indexOf(".") + 1,
                message.lastIndexOf(".")
              ),
              "base64url"
            ).toString() 
          )
        : null
  )(
    key.length > 64
      ? hash(key).digest()
      : key.length < 64
      ? Buffer.concat([key, Buffer.alloc(64 - key.length)])
      : key
  );