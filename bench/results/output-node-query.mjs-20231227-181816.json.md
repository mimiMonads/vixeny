
# node v18.13.0 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 2.78 µs | (2.69 µs .. 3.86 µs/iter) | 2.72 µs | 3.86 µs | 3.86 µs |
| Vixeny query | 80.87 ns | (69.97 ns .. 246.09 ns/iter) | 81.16 ns | 100.33 ns | 112.2 ns |## **Summary** for *One query*

### **Vixeny query** 

- <span style="color:green">34.36x **faster**</span> than *new URL*





## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 2.8 µs | (2.76 µs .. 3.03 µs/iter) | 2.8 µs | 3.03 µs | 3.03 µs |
| Vixeny query | 134.05 ns | (127.25 ns .. 160.98 ns/iter) | 138.37 ns | 153.38 ns | 158.44 ns |## **Summary** for *multi query*

### **Vixeny query** 

- <span style="color:green">20.88x **faster**</span> than *new URL*


