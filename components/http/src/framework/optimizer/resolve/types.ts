import { Morphism, PetitionOptions } from "../types.ts";

export type ResolveOption = (Morphism & { name: string , options?: PetitionOptions});
export type ResolveOptions = ResolveOption[];

export type ResponseResponse = (r: Request) => unknown;

export type TypeResolveOptions =
  | ({ async: false; f: (f: any) => BodyInit })[]
  | ({ async: true; f: (f: any) => Promise<BodyInit> })[];
