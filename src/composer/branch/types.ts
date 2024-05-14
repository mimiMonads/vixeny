import type { Petition, PetitionOptions } from "../../morphism.ts";

export type BranchOption = Petition & {
  name: string;
  options?: PetitionOptions<any, any>;
};
export type BranchOptions = BranchOption[];

export type ResponseResponse = (r: Request) => { [key: string]: (arg:any) => any}
