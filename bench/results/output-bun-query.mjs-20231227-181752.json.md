
# bun 1.0.20 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.58 µs | (1.38 µs .. 2.51 µs/iter) | 1.61 µs | 2.51 µs | 2.51 µs |
| Vixeny query | 85.85 ns | (72.45 ns .. 196.91 ns/iter) | 85.47 ns | 162.3 ns | 182.07 ns |## **Summary** for *One query*

### **Vixeny query** 

- <span style="color:green">18.36x **faster**</span> than *new URL*





## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.58 µs | (1.54 µs .. 2.12 µs/iter) | 1.57 µs | 2.12 µs | 2.12 µs |
| Vixeny query | 152.62 ns | (138.49 ns .. 252.13 ns/iter) | 151.21 ns | 204.03 ns | 221.91 ns |## **Summary** for *multi query*

### **Vixeny query** 

- <span style="color:green">10.36x **faster**</span> than *new URL*


