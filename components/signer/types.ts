export type SignVerifyOptions = {
  seed: string;
  size?: 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64;
  plotter?: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
  crcStart?: number;
  sequence?: 2 | 1 | .5 | .25;
};
