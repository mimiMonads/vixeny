export default (ar: string[]) =>
new Function(
` return (${ar.reduce( (acc,x) =>  acc +x+ '=>' , "")}r => ({${
  ar.map((x) => ` ${x}: ${x}(r)`).join(",")
}}))`)()
