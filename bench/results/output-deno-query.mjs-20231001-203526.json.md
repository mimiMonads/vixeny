
# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 7.31 µs | (5.39 µs .. 286.24 µs/iter) | 8.34 µs | 9.79 µs | 12.42 µs |
| Vixeny query | 107.03 ns | (94.78 ns .. 176.5 ns/iter) | 105.75 ns | 142.02 ns | 143.61 ns |## **Summary** for *One query*

### **Vixeny query** 

- <span style="color:green">68.26x **faster**</span> than *new URL*





## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 3.67 µs | (3.58 µs .. 4.53 µs/iter) | 3.64 µs | 4.53 µs | 4.53 µs |
| Vixeny query | 180.28 ns | (173.02 ns .. 211.71 ns/iter) | 181.22 ns | 206.78 ns | 206.99 ns |## **Summary** for *multi query*

### **Vixeny query** 

- <span style="color:green">20.35x **faster**</span> than *new URL*


