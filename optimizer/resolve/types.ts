
import { RawCommonRequest, RequestArguments } from "../types.ts";


export type ResolveOptions = {
  name: string;
  f: (f: RequestArguments) => unknown;
} & RawCommonRequest

export type TypeResolveOptions = ({ async: false, f: (f: RequestArguments) => BodyInit })[] | ({ async: true, f: (f: RequestArguments) => Promise<BodyInit> })[]
