import verifier from "./components/signer/verifier.ts";
import signer from "./components/signer/signer.ts";


const sign  = await signer({
    seed: "hello"
})

const verify = await verifier({
    seed: "hello"
})


console.log(sign("012345679"))

let i = 0 

const t1 = performance.now()

while(i < 1_000_000){
    void verify(sign("012345679"))
    i++
}

console.log(performance.now() -t1)