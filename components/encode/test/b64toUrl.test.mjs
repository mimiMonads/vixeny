import convertBase64urlToBase64 from "../b64UrlTob64.mjs"; // Adjust this import to the name of your file
const convert = convertBase64urlToBase64(); // Since it's a higher order function

export default (test) => (describe) => (
  test("Converts valid base64url to base64", () =>
    describe(convert("SGVsbG8tV29ybGQ_")).toEqual("SGVsbG8tV29ybGQ/")),
    test("Adds padding for valid base64url strings", () =>
      describe(convert("U28")).toEqual("U28=")),
    test("Returns null for invalid base64url strings", () =>
      describe(convert("Invalid*String")).toEqual(null))
);
