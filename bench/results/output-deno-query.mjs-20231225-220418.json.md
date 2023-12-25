
# deno 1.39.1 (x86_64-unknown-linux-gnu)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 2.12 µs | (2.02 µs .. 2.55 µs/iter) | 2.12 µs | 2.55 µs | 2.55 µs |
| Vixeny query | 65.73 ns | (60.66 ns .. 96.44 ns/iter) | 66.24 ns | 76.31 ns | 77.56 ns |## **Summary** for *One query*

### **Vixeny query** 

- <span style="color:green">32.2x **faster**</span> than *new URL*





## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 2.2 µs | (2.18 µs .. 2.36 µs/iter) | 2.21 µs | 2.36 µs | 2.36 µs |
| Vixeny query | 125.18 ns | (118.92 ns .. 392.04 ns/iter) | 125.83 ns | 137.47 ns | 137.8 ns |## **Summary** for *multi query*

### **Vixeny query** 

- <span style="color:green">17.59x **faster**</span> than *new URL*


