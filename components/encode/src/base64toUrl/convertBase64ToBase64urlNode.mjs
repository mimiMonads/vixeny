export default () => (b64) =>
  b64.length > 2 && b64[b64.length - 1] === "="
    ? b64[b64.length - 2] === "="
      ? b64.replace(/\+/g, "-").replace(/\//g, "_").slice(0, -2)
      : b64.replace(/\+/g, "-").replace(/\//g, "_").slice(0, -1)
    : b64.replace(/\+/g, "-").replace(/\//g, "_");
