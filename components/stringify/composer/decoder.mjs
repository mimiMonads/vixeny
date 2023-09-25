export default j =>
  Object.keys(j.properties)
    .map(x => ({
      type: j.properties[x].type,
      required: j.required?.includes(x) === true ? true : false,
      name: x,
      const: "const" in j.properties[x] ? j.properties.const : undefined
    }));