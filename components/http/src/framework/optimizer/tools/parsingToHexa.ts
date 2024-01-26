export default (crypto: { globalKey: string }) =>
  typeof crypto.globalKey === "string"
    // If it's a string, check if it's a valid hexadecimal
    ? /^[0-9a-fA-F]+$/g.test(crypto.globalKey)
      // If it's a valid hexadecimal, return it as is
      ? crypto.globalKey
      // If it's not a valid hexadecimal, convert to Uint8Array
      : new Uint8Array([...crypto.globalKey].map((x) => x.charCodeAt(0)))
    // If not a string, return the value as is
    : crypto.globalKey;
