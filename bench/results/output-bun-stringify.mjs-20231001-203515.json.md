
# bun 1.0.3 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 71.4 ns | (60.36 ns .. 243.3 ns/iter) | 74.32 ns | 132.53 ns | 147.26 ns |
| Vixeny safe | 47.42 ns | (37.41 ns .. 199.74 ns/iter) | 50.88 ns | 103.03 ns | 113.52 ns |
| Vixeny unsafe | 10.21 ns | (1 ns .. 120.65 ns/iter) | 14.87 ns | 18.09 ns | 64.44 ns |## **Summary** for *One element type string*

### **Vixeny unsafe** 

- <span style="color:green">4.65x **faster**</span> than *Vixeny safe*
- <span style="color:green">7x **faster**</span> than *JSON*





## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 81.56 ns | (69.8 ns .. 205.21 ns/iter) | 86.2 ns | 125.97 ns | 128.91 ns |
| Vixeny | 26.98 ns | (22.03 ns .. 294.05 ns/iter) | 25.52 ns | 66.25 ns | 82.93 ns |## **Summary** for *One element type number*

### **Vixeny** 

- <span style="color:green">3.02x **faster**</span> than *JSON*





## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 113.09 ns | (95 ns .. 229.81 ns/iter) | 120.68 ns | 163.83 ns | 179.93 ns |
| Vixeny safe | 217.17 ns | (208.91 ns .. 284.89 ns/iter) | 214.09 ns | 280.66 ns | 283.89 ns |
| Vixeny unsafe | 45.99 ns | (39.03 ns .. 126.83 ns/iter) | 44.31 ns | 102.48 ns | 104.39 ns |## **Summary** for *Three elements type string*

### **Vixeny unsafe** 

- <span style="color:green">2.46x **faster**</span> than *JSON*
- <span style="color:green">4.72x **faster**</span> than *Vixeny safe*





## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 117.61 ns | (106.34 ns .. 188.47 ns/iter) | 125.09 ns | 130.46 ns | 167.42 ns |
| Vixeny safe | 79.72 ns | (73.22 ns .. 194.32 ns/iter) | 77.86 ns | 137.28 ns | 165.2 ns |
| Vixeny unsafe | 7.22 ns | (7.1 ns .. 9.65 ns/iter) | 7.22 ns | 8.22 ns | 8.28 ns |## **Summary** for *One nested element*

### **Vixeny unsafe** 

- <span style="color:green">11.04x **faster**</span> than *Vixeny safe*
- <span style="color:green">16.28x **faster**</span> than *JSON*


