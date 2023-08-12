
import { RawCommonRequest, RequestArguments } from "../types.ts";


export type BranchOptions = {
  name: string;
  f: (f: RequestArguments) => unknown;
} & RawCommonRequest