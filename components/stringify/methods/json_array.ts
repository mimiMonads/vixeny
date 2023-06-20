import { JsonArrayType } from "../types.ts";

export default (x: JsonArrayType) =>
  `'"${x.name}":"' + JSON.stringify(o${x.path})`;
