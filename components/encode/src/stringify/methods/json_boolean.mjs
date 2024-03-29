export default (x) =>
  "const" in x && typeof x.const === "boolean"
    ? `'"${x.name}":' + ${x.const}`
    : `'"${x.name}":'+( typeof o${x.path} === "boolean"?o${x.path}:'${
      "default" in x ? x.default : null
    }')`;
