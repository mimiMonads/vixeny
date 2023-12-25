
# node v18.13.0 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 2.79 µs | (2.68 µs .. 3.81 µs/iter) | 2.72 µs | 3.81 µs | 3.81 µs |
| Vixeny query | 74.95 ns | (67.55 ns .. 256.98 ns/iter) | 74.24 ns | 110.88 ns | 196.09 ns |## **Summary** for *One query*

### **Vixeny query** 

- <span style="color:green">37.18x **faster**</span> than *new URL*





## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 2.77 µs | (2.75 µs .. 3.07 µs/iter) | 2.77 µs | 3.07 µs | 3.07 µs |
| Vixeny query | 125.41 ns | (117.66 ns .. 331.48 ns/iter) | 124.89 ns | 178.31 ns | 182.42 ns |## **Summary** for *multi query*

### **Vixeny query** 

- <span style="color:green">22.11x **faster**</span> than *new URL*


