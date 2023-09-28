export default (x) =>
  "const" in x && typeof x.const === "number"
    ? `'"${x.name}":' + ${x.const}`
    : `'"${x.name}":'+( typeof o${x.path} === "number"?o${x.path}:'${
      "default" in x ? x.default : null
    }')`;
