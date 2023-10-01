
# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 273.23 ns | (242.93 ns .. 375.01 ns/iter) | 297.87 ns | 357.51 ns | 375.01 ns |
| Vixeny safe | 37.49 ns | (33.46 ns .. 41.54 ns/iter) | 37.62 ns | 39.99 ns | 40.86 ns |
| Vixeny unsafe | 5.61 ns | (5.15 ns .. 21.77 ns/iter) | 5.6 ns | 5.99 ns | 6.08 ns |## **Summary** for *One element type string*

### **Vixeny unsafe** 

- <span style="color:green">6.68x **faster**</span> than *Vixeny safe*
- <span style="color:green">48.68x **faster**</span> than *JSON*





## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 266.8 ns | (241.99 ns .. 359.44 ns/iter) | 271.23 ns | 358.03 ns | 359.44 ns |
| Vixeny | 22.8 ns | (17.72 ns .. 46.24 ns/iter) | 24.93 ns | 26.35 ns | 27.19 ns |## **Summary** for *One element type number*

### **Vixeny** 

- <span style="color:green">11.7x **faster**</span> than *JSON*





## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 433.85 ns | (416.46 ns .. 443.92 ns/iter) | 440.19 ns | 443.76 ns | 443.92 ns |
| Vixeny safe | 382.7 ns | (339.13 ns .. 616.97 ns/iter) | 419.57 ns | 454.27 ns | 616.97 ns |
| Vixeny unsafe | 5.64 ns | (5.17 ns .. 76.4 ns/iter) | 5.63 ns | 6.03 ns | 6.09 ns |## **Summary** for *Three elements type string*

### **Vixeny unsafe** 

- <span style="color:green">67.82x **faster**</span> than *Vixeny safe*
- <span style="color:green">76.88x **faster**</span> than *JSON*





## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 300.05 ns | (295.27 ns .. 323.83 ns/iter) | 303.01 ns | 322.02 ns | 323.83 ns |
| Vixeny safe | 148.24 ns | (142.85 ns .. 270.27 ns/iter) | 150.53 ns | 159.58 ns | 162.31 ns |
| Vixeny unsafe | 18.3 ns | (14.83 ns .. 85.78 ns/iter) | 21.16 ns | 23.85 ns | 25.31 ns |## **Summary** for *One nested element*

### **Vixeny unsafe** 

- <span style="color:green">8.1x **faster**</span> than *Vixeny safe*
- <span style="color:green">16.4x **faster**</span> than *JSON*


