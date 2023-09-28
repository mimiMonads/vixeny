import { expect, test } from "bun:test";

import main from "./fun.test.mjs";

main(test)((i) => i)(expect);
