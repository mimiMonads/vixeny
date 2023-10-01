
# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 272.62 ns | (244.11 ns .. 382.8 ns/iter) | 297.74 ns | 365.83 ns | 382.8 ns |
| Vixeny safe | 34.15 ns | (24.19 ns .. 45.99 ns/iter) | 34.33 ns | 45.37 ns | 45.65 ns |
| Vixeny unsafe | 4.76 ns | (4.28 ns .. 13.85 ns/iter) | 4.8 ns | 5.1 ns | 5.18 ns |## **Summary** for *One element type string*

### **Vixeny unsafe** 

- <span style="color:green">7.17x **faster**</span> than *Vixeny safe*
- <span style="color:green">57.22x **faster**</span> than *JSON*





## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 258.08 ns | (244.03 ns .. 292.19 ns/iter) | 270.84 ns | 291.14 ns | 291.84 ns |
| Vixeny | 19.35 ns | (15.25 ns .. 107.43 ns/iter) | 22.01 ns | 26.28 ns | 27.33 ns |## **Summary** for *One element type number*

### **Vixeny** 

- <span style="color:green">13.34x **faster**</span> than *JSON*





## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 426.57 ns | (418.37 ns .. 458.05 ns/iter) | 429.73 ns | 448.04 ns | 458.05 ns |
| Vixeny safe | 383.02 ns | (321.57 ns .. 658.47 ns/iter) | 400.59 ns | 428.3 ns | 658.47 ns |
| Vixeny unsafe | 5.12 ns | (4.55 ns .. 127.15 ns/iter) | 5.11 ns | 5.43 ns | 5.55 ns |## **Summary** for *Three elements type string*

### **Vixeny unsafe** 

- <span style="color:green">74.78x **faster**</span> than *Vixeny safe*
- <span style="color:green">83.28x **faster**</span> than *JSON*





## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 294.11 ns | (289.97 ns .. 316.89 ns/iter) | 295.63 ns | 312.91 ns | 316.89 ns |
| Vixeny safe | 144.7 ns | (137.64 ns .. 289.87 ns/iter) | 147.45 ns | 152.69 ns | 161.7 ns |
| Vixeny unsafe | 17.46 ns | (14.33 ns .. 135.68 ns/iter) | 20.18 ns | 22.51 ns | 23.31 ns |## **Summary** for *One nested element*

### **Vixeny unsafe** 

- <span style="color:green">8.29x **faster**</span> than *Vixeny safe*
- <span style="color:green">16.84x **faster**</span> than *JSON*


