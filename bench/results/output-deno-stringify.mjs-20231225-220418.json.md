
# deno 1.39.1 (x86_64-unknown-linux-gnu)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 216 ns | (168.2 ns .. 244.47 ns/iter) | 219.97 ns | 238.18 ns | 239.38 ns |
| Vixeny safe | 27.84 ns | (25.3 ns .. 42.49 ns/iter) | 28.06 ns | 39.07 ns | 39.13 ns |
| Vixeny unsafe | 4.1 ns | (3.72 ns .. 12.33 ns/iter) | 4.09 ns | 4.43 ns | 4.49 ns |## **Summary** for *One element type string*

### **Vixeny unsafe** 

- <span style="color:green">6.78x **faster**</span> than *Vixeny safe*
- <span style="color:green">52.64x **faster**</span> than *JSON*





## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 153.6 ns | (149.72 ns .. 180 ns/iter) | 155.22 ns | 170.88 ns | 173.87 ns |
| Vixeny | 14.25 ns | (11.35 ns .. 93.46 ns/iter) | 15.62 ns | 17.14 ns | 18.66 ns |## **Summary** for *One element type number*

### **Vixeny** 

- <span style="color:green">10.78x **faster**</span> than *JSON*





## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 235.35 ns | (230.87 ns .. 244.81 ns/iter) | 236.84 ns | 241.82 ns | 242.28 ns |
| Vixeny safe | 244.25 ns | (238.62 ns .. 315.19 ns/iter) | 245.23 ns | 253.13 ns | 253.83 ns |
| Vixeny unsafe | 4.13 ns | (3.65 ns .. 5.59 ns/iter) | 4.12 ns | 4.46 ns | 4.49 ns |## **Summary** for *Three elements type string*

### **Vixeny unsafe** 

- <span style="color:green">56.97x **faster**</span> than *JSON*
- <span style="color:green">59.13x **faster**</span> than *Vixeny safe*





## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 194.14 ns | (190.04 ns .. 205.19 ns/iter) | 196.16 ns | 203.35 ns | 203.6 ns |
| Vixeny safe | 99.02 ns | (96.16 ns .. 105.77 ns/iter) | 99.36 ns | 104.47 ns | 104.91 ns |
| Vixeny unsafe | 14.08 ns | (10.9 ns .. 33.6 ns/iter) | 16.26 ns | 18.58 ns | 19.55 ns |## **Summary** for *One nested element*

### **Vixeny unsafe** 

- <span style="color:green">7.03x **faster**</span> than *Vixeny safe*
- <span style="color:green">13.79x **faster**</span> than *JSON*


