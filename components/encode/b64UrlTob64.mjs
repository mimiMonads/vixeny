export default () => (b64url) =>
  !/^[-_A-Z0-9]*?={0,2}$/i.test(b64url) ? null : (
    (l) =>
      l === 2
        ? b64url.replace(/-/g, "+").replace(/_/g, "/") + "=="
        : l === 3
        ? b64url.replace(/-/g, "+").replace(/_/g, "/") + "="
        : l === 0
        ? b64url.replace(/-/g, "+").replace(/_/g, "/")
        : null
  )(b64url.length % 4);

