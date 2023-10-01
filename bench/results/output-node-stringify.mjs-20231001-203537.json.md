
# node v20.5.1 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 251.84 ns | (217.17 ns .. 328.39 ns/iter) | 268.63 ns | 320.46 ns | 328.19 ns |
| Vixeny safe | 28.66 ns | (27.57 ns .. 51.46 ns/iter) | 28.19 ns | 44.55 ns | 44.64 ns |
| Vixeny unsafe | 4.27 ns | (3.81 ns .. 16.93 ns/iter) | 4.29 ns | 4.86 ns | 4.92 ns |## **Summary** for *One element type string*

### **Vixeny unsafe** 

- <span style="color:green">6.71x **faster**</span> than *Vixeny safe*
- <span style="color:green">59.01x **faster**</span> than *JSON*





## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 218.07 ns | (210.35 ns .. 239.55 ns/iter) | 220.58 ns | 231.49 ns | 233.33 ns |
| Vixeny | 16.35 ns | (13.08 ns .. 51.68 ns/iter) | 17.77 ns | 24.87 ns | 29.37 ns |## **Summary** for *One element type number*

### **Vixeny** 

- <span style="color:green">13.34x **faster**</span> than *JSON*





## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 400.56 ns | (393.96 ns .. 438.95 ns/iter) | 402.27 ns | 419.48 ns | 438.95 ns |
| Vixeny safe | 237.42 ns | (224.41 ns .. 282.43 ns/iter) | 240.37 ns | 261.94 ns | 278 ns |
| Vixeny unsafe | 4.12 ns | (3.89 ns .. 5.48 ns/iter) | 4.12 ns | 4.48 ns | 4.63 ns |## **Summary** for *Three elements type string*

### **Vixeny unsafe** 

- <span style="color:green">57.64x **faster**</span> than *Vixeny safe*
- <span style="color:green">97.24x **faster**</span> than *JSON*





## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 345.25 ns | (339.77 ns .. 364.3 ns/iter) | 347.56 ns | 362.19 ns | 364.3 ns |
| Vixeny safe | 86.33 ns | (80.64 ns .. 96.3 ns/iter) | 88.12 ns | 95.78 ns | 95.93 ns |
| Vixeny unsafe | 15.79 ns | (12.64 ns .. 24.3 ns/iter) | 18.25 ns | 20.23 ns | 21.11 ns |## **Summary** for *One nested element*

### **Vixeny unsafe** 

- <span style="color:green">5.47x **faster**</span> than *Vixeny safe*
- <span style="color:green">21.87x **faster**</span> than *JSON*


