import digits from "./digits.ts";
import { SignVerifyOptions } from "./types.ts";

export default async (o: SignVerifyOptions) =>
  await Promise.all(Array.from(
    { length: (typeof o.size === "number" ? o.size : 8) },
    async (_, i) => await digits(o.seed + i)(o),
  ));
