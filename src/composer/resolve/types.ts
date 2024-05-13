import type { PetitionOptions, ResolveMorphism } from "../../morphism.ts";

export type ResolveOption = ResolveMorphism & {
  name: string;
  options?: PetitionOptions<any, any>;
};
export type ResolveOptions = ResolveOption[];

export type ResponseResponse = (r: Request) => { [key: string]: any};

export type TypeResolveOptions =
  | ({ async: false; f: (f: any) => BodyInit })[]
  | ({ async: true; f: (f: any) => Promise<BodyInit> })[];
