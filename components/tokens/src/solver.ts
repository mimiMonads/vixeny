import digits from "./digits.ts";
import { SignVerifyOptions } from "../types.ts";

export default (o: SignVerifyOptions) =>
  Array.from(
    { length: (typeof o.size === "number" ? o.size : 8) },
    (_, i) => digits(o.seed + i)(o),
  );
