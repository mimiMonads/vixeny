import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import compose from "../../src/composer/compose.ts";

Deno.test("base case", async () => {

    const base = await compose()({
        type: "base",
        path: "/",
        f: _ => "base"
    })(new Request("http://hello.com/"));

    const baseWithHeadings = await compose()({
        type: "base",
        path: "/",
        headings: {
            status: 201,
            statusText: 'statusTextBase',
            headers: '.html'
        },
        f: _ => "baseWithHeadings"
    })(new Request("http://hello.com/"));

    assertEquals(await base.text(), 'base');
    assertEquals(base.status, 200);

    assertEquals(await baseWithHeadings.text(), 'baseWithHeadings');
    assertEquals(baseWithHeadings.status, 201);
    assertEquals(baseWithHeadings.statusText, 'statusTextBase');
    assertEquals(baseWithHeadings.headers.get('content-type'), 'text/html');
});

Deno.test("request case", async () => {

    const request = await compose()({
        type: "request",
        path: "/",
        f: _ => new Response('request')
    })(new Request("http://hello.com/"));


    assertEquals(await request.text(), 'request');
    assertEquals(request.status, 200);

});
