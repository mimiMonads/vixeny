export type SignVerifyOptions = {
  seed: string;
  size?: 8;
  plotter?: "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
  crcStart?: number;
  sequence?: 2 | 1 | .5 | .25;
  expires?: true
};
