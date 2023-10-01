
# node v20.5.1 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.35 µs | (1.19 µs .. 1.77 µs/iter) | 1.45 µs | 1.77 µs | 1.77 µs |
| Vixeny query | 80.63 ns | (73.75 ns .. 143.95 ns/iter) | 80.64 ns | 103.67 ns | 106.81 ns |## **Summary** for *One query*

### **Vixeny query** 

- <span style="color:green">16.8x **faster**</span> than *new URL*





## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.44 µs | (1.32 µs .. 1.86 µs/iter) | 1.62 µs | 1.86 µs | 1.86 µs |
| Vixeny query | 124.47 ns | (121.12 ns .. 139.94 ns/iter) | 124.6 ns | 129.2 ns | 131.24 ns |## **Summary** for *multi query*

### **Vixeny query** 

- <span style="color:green">11.54x **faster**</span> than *new URL*


