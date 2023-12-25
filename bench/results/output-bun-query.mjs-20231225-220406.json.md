
# bun 1.0.15 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.59 µs | (1.39 µs .. 2.51 µs/iter) | 1.61 µs | 2.51 µs | 2.51 µs |
| Vixeny query | 92.66 ns | (83.35 ns .. 194.92 ns/iter) | 88.92 ns | 162.95 ns | 164.72 ns |## **Summary** for *One query*

### **Vixeny query** 

- <span style="color:green">17.14x **faster**</span> than *new URL*





## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.6 µs | (1.52 µs .. 2.06 µs/iter) | 1.59 µs | 2.06 µs | 2.06 µs |
| Vixeny query | 162.15 ns | (148.82 ns .. 303.86 ns/iter) | 159.45 ns | 235.96 ns | 298.95 ns |## **Summary** for *multi query*

### **Vixeny query** 

- <span style="color:green">9.86x **faster**</span> than *new URL*


