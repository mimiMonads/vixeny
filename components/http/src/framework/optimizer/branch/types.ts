import { AnyMorphism, RawCommonRequest, PetitionOptions } from "../types.ts";

export type BranchOption = (AnyMorphism & {name: string , options?: PetitionOptions<[]>})
export type BranchOptions = BranchOption[]

export type ResponseResponse = (r: Request) => unknown;
