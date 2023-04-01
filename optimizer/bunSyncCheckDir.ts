export default
(joiner: (base: string) => (target: string) => string) =>
(readdir: (directoryPath: string) => string[]) =>
(stat: (directoryPath: string) => { isDirectory: () => boolean }) =>
(dir: string) :[string, boolean][] =>
     (
  Y =>(
     Y((f: (arg0: string) => [string, boolean][]) => (
      (dir: string): [string, boolean][]  => 
      readdir(dir).flatMap(item => 
       stat(joiner(dir)(item)).isDirectory()
         ? [[joiner(dir)(item),true],...f(joiner(dir)(item))]
         :[[joiner(dir)(item),false]]
      ) as [string, boolean][]
     )
     )(dir)
  ) 
  
)(
    // Setting up the Y combinator.
    (f: (arg0: (y: any) => any) => any) =>
    ((x) => x(x))((x: (arg0: any) => ({ (arg0: any): any; new (): any })) =>
      f((y: any) => x(x)(y))
    ),

) 