
# node v18.13.0 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 305.41 ns | (286.74 ns .. 379.33 ns/iter) | 306.49 ns | 362.44 ns | 379.33 ns |
| Vixeny safe | 26.94 ns | (26.4 ns .. 40.2 ns/iter) | 26.68 ns | 31.53 ns | 39.15 ns |
| Vixeny unsafe | 4.18 ns | (3.61 ns .. 537.94 ns/iter) | 4.13 ns | 4.49 ns | 4.58 ns |## **Summary** for *One element type string*

### **Vixeny unsafe** 

- <span style="color:green">6.44x **faster**</span> than *Vixeny safe*
- <span style="color:green">72.99x **faster**</span> than *JSON*





## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 292.86 ns | (283.3 ns .. 335.39 ns/iter) | 294.74 ns | 311.47 ns | 335.39 ns |
| Vixeny | 12.43 ns | (10.84 ns .. 27.27 ns/iter) | 11.45 ns | 20.53 ns | 22.04 ns |## **Summary** for *One element type number*

### **Vixeny** 

- <span style="color:green">23.57x **faster**</span> than *JSON*





## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 506.86 ns | (497.47 ns .. 523.13 ns/iter) | 513.2 ns | 522.98 ns | 523.13 ns |
| Vixeny safe | 249.98 ns | (238.98 ns .. 264.54 ns/iter) | 253.16 ns | 256.11 ns | 256.4 ns |
| Vixeny unsafe | 4.14 ns | (3.63 ns .. 4.94 ns/iter) | 4.13 ns | 4.49 ns | 4.57 ns |## **Summary** for *Three elements type string*

### **Vixeny unsafe** 

- <span style="color:green">60.39x **faster**</span> than *Vixeny safe*
- <span style="color:green">122.44x **faster**</span> than *JSON*





## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 452.64 ns | (432.73 ns .. 487.97 ns/iter) | 459.58 ns | 473.2 ns | 487.97 ns |
| Vixeny safe | 96.8 ns | (90.27 ns .. 108.58 ns/iter) | 102.32 ns | 106.53 ns | 107.23 ns |
| Vixeny unsafe | 15.46 ns | (12.41 ns .. 26.16 ns/iter) | 15.39 ns | 22.69 ns | 23.65 ns |## **Summary** for *One nested element*

### **Vixeny unsafe** 

- <span style="color:green">6.26x **faster**</span> than *Vixeny safe*
- <span style="color:green">29.28x **faster**</span> than *JSON*


