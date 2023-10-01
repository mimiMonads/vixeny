
# node v20.5.1 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.32 µs | (1.15 µs .. 1.83 µs/iter) | 1.41 µs | 1.83 µs | 1.83 µs |
| Vixeny query | 82.81 ns | (74.69 ns .. 183.15 ns/iter) | 83.49 ns | 109.78 ns | 113.31 ns |## **Summary** for *One query*

### **Vixeny query** 

- <span style="color:green">15.88x **faster**</span> than *new URL*





## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.41 µs | (1.3 µs .. 1.85 µs/iter) | 1.58 µs | 1.85 µs | 1.85 µs |
| Vixeny query | 114.86 ns | (109.45 ns .. 147.83 ns/iter) | 115.58 ns | 121.71 ns | 122.72 ns |## **Summary** for *multi query*

### **Vixeny query** 

- <span style="color:green">12.27x **faster**</span> than *new URL*


