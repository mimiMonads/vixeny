
# bun 1.0.3 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.7 µs | (1.55 µs .. 2.69 µs/iter) | 1.69 µs | 2.69 µs | 2.69 µs |
| Vixeny query | 127 ns | (113.66 ns .. 238.08 ns/iter) | 130 ns | 194.79 ns | 206.74 ns |## **Summary** for *One query*

### **Vixeny query** 

- <span style="color:green">13.37x **faster**</span> than *new URL*





## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.86 µs | (1.69 µs .. 2.49 µs/iter) | 2.03 µs | 2.49 µs | 2.49 µs |
| Vixeny query | 257.69 ns | (212.2 ns .. 557.62 ns/iter) | 258.93 ns | 351.54 ns | 367.43 ns |## **Summary** for *multi query*

### **Vixeny query** 

- <span style="color:green">7.2x **faster**</span> than *new URL*


