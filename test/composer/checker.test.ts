import mainCheck from "../../src/composer/checkPetition/mainCheck.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { petitions } from "../../src/morphism.ts";

// Test
Deno.test("check behaivour", async () => {

    assertEquals(
        mainCheck()(petitions.common()({
            path:'/test',
            f: () => 'query'
        }))
        ,[]);
    assertEquals(
        mainCheck()(petitions.common()({
            path:'/test',
            f: ctx => ctx.query.hello ?? 'hello'
        }))
    ,['query']);     

  });


Deno.test("check only behaivour", async () => {

    assertEquals(
        mainCheck()(petitions.common()({
            path:'/test',
            options: {
                only: ['query']
            },
            f: () => 'someString'
        }))
        ,['query']);

    assertEquals(
        mainCheck()(petitions.common()({
            path:'/test',
            options: {
                only: ['query']
            },
            f: ctx => ctx.param.hello 
        }))
    ,['query']);    
    
    assertEquals(
        mainCheck()(petitions.common()({
            path:'/test',
            options: {
                only: ['query']
            },
            f: ctx => ctx.query.hello ?? 'hello'
        }))
    ,['query']);     

  });