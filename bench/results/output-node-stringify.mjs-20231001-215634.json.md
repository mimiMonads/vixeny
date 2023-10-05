# node v20.5.1 (x64-linux)

## One element type string

| Name          | Time (Avg) | Range                        | p75       | p99       | p995      |
| ------------- | ---------- | ---------------------------- | --------- | --------- | --------- |
| JSON          | 246.42 ns  | (212.47 ns .. 310.9 ns/iter) | 260.68 ns | 302.35 ns | 304.53 ns |
| Vixeny safe   | 25.78 ns   | (23.12 ns .. 59.11 ns/iter)  | 28.18 ns  | 46.43 ns  | 46.44 ns  |
| Vixeny unsafe | 4.08 ns    | (3.9 ns .. 6.09 ns/iter)     | 4.06 ns   | 4.47 ns   | 4.49 ns   |

### **Vixeny unsafe**

- <span style="color:green">6.31x **faster**</span> than _Vixeny safe_
- <span style="color:green">60.35x **faster**</span> than _JSON_

## One element type number

| Name   | Time (Avg) | Range                         | p75       | p99       | p995     |
| ------ | ---------- | ----------------------------- | --------- | --------- | -------- |
| JSON   | 213.17 ns  | (205.79 ns .. 238.83 ns/iter) | 215.34 ns | 224.78 ns | 229.1 ns |
| Vixeny | 16.21 ns   | (13.17 ns .. 25.15 ns/iter)   | 17.8 ns   | 18.66 ns  | 19.12 ns |

### **Vixeny**

- <span style="color:green">13.15x **faster**</span> than _JSON_

## Three elements type string

| Name          | Time (Avg) | Range                         | p75       | p99       | p995      |
| ------------- | ---------- | ----------------------------- | --------- | --------- | --------- |
| JSON          | 398.33 ns  | (391.99 ns .. 431.03 ns/iter) | 399.71 ns | 414.01 ns | 431.03 ns |
| Vixeny safe   | 218.65 ns  | (212.04 ns .. 260.92 ns/iter) | 219.89 ns | 241.92 ns | 248.97 ns |
| Vixeny unsafe | 6.16 ns    | (5.95 ns .. 7.71 ns/iter)     | 6.22 ns   | 6.55 ns   | 6.66 ns   |

### **Vixeny unsafe**

- <span style="color:green">35.5x **faster**</span> than _Vixeny safe_
- <span style="color:green">64.66x **faster**</span> than _JSON_

## One nested element

| Name          | Time (Avg) | Range                        | p75       | p99       | p995     |
| ------------- | ---------- | ---------------------------- | --------- | --------- | -------- |
| JSON          | 335.03 ns  | (330.92 ns .. 365.9 ns/iter) | 336.92 ns | 360.64 ns | 365.9 ns |
| Vixeny safe   | 88.01 ns   | (80.76 ns .. 100.08 ns/iter) | 90.06 ns  | 96.19 ns  | 97.67 ns |
| Vixeny unsafe | 15.41 ns   | (12.64 ns .. 36.97 ns/iter)  | 17.75 ns  | 19.71 ns  | 21.87 ns |

### **Vixeny unsafe**

- <span style="color:green">5.71x **faster**</span> than _Vixeny safe_
- <span style="color:green">21.74x **faster**</span> than _JSON_
