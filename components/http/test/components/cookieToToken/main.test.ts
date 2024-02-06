import assert from "node:assert";
import test from "node:test";

import signSha256 from "../../../../jwt/signSha256.mjs";
import cookieToTokenFilter from "../../../src/cookieToToken/cookieToTokenFilter.ts";

const secret = new Uint8Array([1,2,3,4,5,6])
const sign = signSha256()(secret)

const request = new Request('http://localhost:3000/',{
    headers: new Headers(
        [[
            'cookie' , `hello=${sign({hi:1})}` 
        ]]
    )
})


test('with element', () => {
    assert.deepStrictEqual(
        cookieToTokenFilter(['f.token.jwt.id'])('token'),
        ['jwt']
    )
})

test('no element', () => {
    assert.deepStrictEqual(
        cookieToTokenFilter(['f.token.jwt'])('token'),
        ['jwt']
    )
})