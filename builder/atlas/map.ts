
export default (c: string[][][]) =>(
    el => (
        sum => 
            el.map(
                (x,i) => x.map ( y => y + sum[i] )
            )
    )(
        el
        .map(
             x => x.reduce( (acc,y) => y + acc)
        )
        .map( x => x === 0 ? 1 : x)
        .map(
            (_,i,a) => i === 0
                ? 0
                : a.slice(0,i).reduce( (acc,x) => acc + x  ) - 1
        )
    )
)(
    c.map(
        x => x
        .map( (y) => y.length)
        .map( (y,i) => x.slice(0,i+1).reduce( (acc,z) => z.length + acc , 0) - y)
    )
)

