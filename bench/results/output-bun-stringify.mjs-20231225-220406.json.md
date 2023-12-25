
# bun 1.0.15 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 64.92 ns | (60.44 ns .. 176.37 ns/iter) | 68.82 ns | 76.37 ns | 86.22 ns |
| Vixeny safe | 50.94 ns | (42.36 ns .. 143.88 ns/iter) | 55.32 ns | 92.9 ns | 116.74 ns |
| Vixeny unsafe | 3.94 ns | (828.5 ps .. 125.32 ns/iter) | 7.52 ns | 13.9 ns | 15.32 ns |## **Summary** for *One element type string*

### **Vixeny unsafe** 

- <span style="color:green">12.94x **faster**</span> than *Vixeny safe*
- <span style="color:green">16.49x **faster**</span> than *JSON*





## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 58.32 ns | (53.48 ns .. 147.66 ns/iter) | 58.11 ns | 69.47 ns | 72.79 ns |
| Vixeny | 22.49 ns | (20.03 ns .. 149.78 ns/iter) | 21.66 ns | 60.98 ns | 64.91 ns |## **Summary** for *One element type number*

### **Vixeny** 

- <span style="color:green">2.59x **faster**</span> than *JSON*





## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 92.68 ns | (79.99 ns .. 136.8 ns/iter) | 109.7 ns | 118.15 ns | 132.18 ns |
| Vixeny safe | 195.38 ns | (186.48 ns .. 248.46 ns/iter) | 194.09 ns | 239.69 ns | 244.73 ns |
| Vixeny unsafe | 38.51 ns | (34.11 ns .. 100.2 ns/iter) | 36.67 ns | 81.82 ns | 87.99 ns |## **Summary** for *Three elements type string*

### **Vixeny unsafe** 

- <span style="color:green">2.41x **faster**</span> than *JSON*
- <span style="color:green">5.07x **faster**</span> than *Vixeny safe*





## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 85.86 ns | (77.12 ns .. 169.13 ns/iter) | 95.89 ns | 103.39 ns | 136.46 ns |
| Vixeny safe | 69.66 ns | (65.25 ns .. 203.84 ns/iter) | 68.58 ns | 111.11 ns | 136.69 ns |
| Vixeny unsafe | 8.31 ns | (8.23 ns .. 26.32 ns/iter) | 8.24 ns | 8.62 ns | 8.82 ns |## **Summary** for *One nested element*

### **Vixeny unsafe** 

- <span style="color:green">8.38x **faster**</span> than *Vixeny safe*
- <span style="color:green">10.33x **faster**</span> than *JSON*


