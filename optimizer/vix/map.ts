import { NestedVixeny } from "./main.ts";

export default (el: NestedVixeny) => (
  {
    verificator: {
      async: !("vixToken" in el ||
        "customVerify" in el &&
          el.customVerify.constructor.name !== "AsyncFunction"),
      funtor: "vixToken" in el ||
          "customVerify" in el &&
            el.customVerify.constructor.name === "AsyncFunction"
        ? "async ve =>"
        : "ve => ",
    },
    onAccept: "sideEffectOnAccept" in el
      ? {
        async: el.sideEffectOnAccept.constructor.name === "AsyncFunction",
        functor: el.sideEffectOnAccept.constructor.name === "AsyncFunction"
          ? "async oa =>"
          : " oa=>",
        call: el.sideEffectOnAccept.constructor.name === "AsyncFunction"
          ? "await oa(r)"
          : "oa(r)",
      }
      : null,
    onReject: "sideEffectOnReject" in el
      ? {
        async: el.sideEffectOnReject.constructor.name === "AsyncFunction",
        functor: el.sideEffectOnReject.constructor.name === "AsyncFunction"
          ? "async or =>"
          : " or=>",
        call: el.sideEffectOnReject.constructor.name === "AsyncFunction"
          ? "await or(r)"
          : "or(r)",
      }
      : null,

    401: "401" in el
      ? {
        async: el[401].constructor.name === "AsyncFunction",
        functor: el[401].constructor.name === "AsyncFunction"
          ? "async na =>"
          : " na=>",
        call: el[401].constructor.name === "AsyncFunction"
          ? "await na(r)"
          : "na(r)",
      }
      : null,
  }
);
