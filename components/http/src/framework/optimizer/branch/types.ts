import { AnyMorphism, PetitionOptions, RawCommonRequest } from "../types.ts";

export type BranchOption = AnyMorphism & {
  name: string;
  options?: PetitionOptions<any, any>;
};
export type BranchOptions = BranchOption[];

export type ResponseResponse = (r: Request) => unknown;
