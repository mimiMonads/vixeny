import { SignVerifyOptions } from "../types.ts";

export default (o?: SignVerifyOptions) =>
  async (message: string) =>
    Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          o?.plotter ?? "SHA-256",
          new TextEncoder().encode(message),
        ),
      ),
    ).map((b) => b.toString(16).padStart(2, "0")).join("");
