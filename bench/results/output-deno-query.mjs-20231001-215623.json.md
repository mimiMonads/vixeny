# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One query

| Name         | Time (Avg) | Range                        | p75      | p99       | p995      |
| ------------ | ---------- | ---------------------------- | -------- | --------- | --------- |
| new URL      | 7.53 µs    | (5.25 µs .. 460.13 µs/iter)  | 9.58 µs  | 10.49 µs  | 12.72 µs  |
| Vixeny query | 57.4 ns    | (53.06 ns .. 277.34 ns/iter) | 54.18 ns | 111.69 ns | 115.63 ns |

### **Vixeny query**

- <span style="color:green">131.22x **faster**</span> than _new URL_

## multi query

| Name         | Time (Avg) | Range                         | p75       | p99       | p995      |
| ------------ | ---------- | ----------------------------- | --------- | --------- | --------- |
| new URL      | 3.68 µs    | (3.59 µs .. 4.55 µs/iter)     | 3.63 µs   | 4.55 µs   | 4.55 µs   |
| Vixeny query | 142.7 ns   | (134.83 ns .. 221.35 ns/iter) | 143.48 ns | 174.49 ns | 202.41 ns |

### **Vixeny query**

- <span style="color:green">25.78x **faster**</span> than _new URL_
