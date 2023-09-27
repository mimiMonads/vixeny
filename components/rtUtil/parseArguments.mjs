export default  () =>
     (typeof Deno != "undefined" ? Deno.args : [...process.argv.slice(2)]) 
      .map(arg => arg.slice(2).split('='))
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value === undefined ? true : value
      }), {});
  