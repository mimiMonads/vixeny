import { FunRouterOptions } from "../../types.ts"
import { BranchOptions  as BranchIncomplete} from "../../types.ts"
import branch from "../../optimizer/branch/main.ts"

type BranchOptions = {
    path: string
} & BranchIncomplete

type BranchSetter = { 
    mutable?: Record<string,unknown>
} & FunRouterOptions

export default (o?: BranchSetter) => (f:BranchOptions) =>
    o && "mutable" in o 
        ? (
            obj => (f => (r: Request)=> async (arg: any) =>  await ( f(r) as unknown as (f:unknown) => unknown )(arg))(branch(o ? {...o, mutable: true} : undefined)(f.path)(f))
        )({...o.mutable})
        : branch(o ? {...o, mutable: undefined} : undefined)(f.path)(f)