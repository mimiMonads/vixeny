export default () => (b64url) =>
  !/^[-_A-Z0-9]*?={0,2}$/i.test(b64url) ? null : (
    (l) =>
      l === 2
        ? (b64url + "==").replace(/[-_]/g, (m) => m === "-" ? "+" : "/")
        : l === 3
        ? (b64url + "=").replace(/[-_]/g, (m) => m === "-" ? "+" : "/")
        : l === 0
        ? b64url.replace(/[-_]/g, (m) => m === "-" ? "+" : "/")
        : null
  )(b64url.length % 4);
