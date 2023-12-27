
# deno 1.39.1 (x86_64-unknown-linux-gnu)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 2.11 µs | (2.05 µs .. 2.53 µs/iter) | 2.11 µs | 2.53 µs | 2.53 µs |
| Vixeny query | 59.6 ns | (54.87 ns .. 84.08 ns/iter) | 59.97 ns | 76.32 ns | 78.6 ns |## **Summary** for *One query*

### **Vixeny query** 

- <span style="color:green">35.36x **faster**</span> than *new URL*





## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 2.23 µs | (2.21 µs .. 2.33 µs/iter) | 2.23 µs | 2.33 µs | 2.33 µs |
| Vixeny query | 117.23 ns | (110.4 ns .. 375.91 ns/iter) | 117.63 ns | 141.51 ns | 147.86 ns |## **Summary** for *multi query*

### **Vixeny query** 

- <span style="color:green">18.98x **faster**</span> than *new URL*


