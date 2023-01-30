import {info} from "./types.ts"
import parser from "./parser.ts"
import finder from "./finder.ts"
import slicer from "./slicer.ts"

export default
    (info : info) => 
        ( parse => 
          (
           slice =>  
            (
              find => `(
                pa => (
                  sl => (
                      fi => par =>  pa(fi(sl(par)))
                    )(
                      ${find}
                    )
                  )(
                    ${slice}
                  )
              ) (
                ${parse.toString()}
              )`
            )(
              finder(info)
            )
          )(
            slicer(info)
          )
    )(
        parser(info.elements.map( x => x.slice(1)))
    )
