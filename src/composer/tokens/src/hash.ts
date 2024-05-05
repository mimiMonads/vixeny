import { SignVerifyOptions } from "../types.ts";
import crypto from "node:crypto";

export default (o?: SignVerifyOptions) => (message: string) =>
  crypto.createHash("sha256").update(message).digest("hex");
