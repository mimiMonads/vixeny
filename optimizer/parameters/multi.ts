import {info} from "./types.ts"

import finder from "./finder.ts"
import slicer from "./slicer.ts"

export default
    (info : info) => 

          (
           slice =>  
            (
              find => `( sl => (fi => p => fi(sl(p)))(${find} ))(${slice})`
            )(
              finder(info)
            )
          )(
            slicer(info)
          )

