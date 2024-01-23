import {
  CommonRequestMorphism,
  RequestMorphism,
} from "../framework/optimizer/types.ts";

export default (f: CommonRequestMorphism | RequestMorphism) =>
  f.crypto && "globalKey" in f.crypto
    ? [
      "cookie",
      "randomNumber",
      "hash",
      "param",
      "query",
      "req",
      "date",
      "resolve",
      "mutable",
      "branch",
      "arguments",
      "token",
      "verify",
      "sign",
    ]
    : [
      "cookie",
      "randomNumber",
      "hash",
      "param",
      "query",
      "req",
      "date",
      "resolve",
      "mutable",
      "branch",
      "arguments",
    ];
