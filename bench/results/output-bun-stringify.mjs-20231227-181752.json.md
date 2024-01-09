# bun 1.0.20 (x64-linux)

## One element type string

| Name          | Time (Avg) | Range                        | p75      | p99      | p995      |
| ------------- | ---------- | ---------------------------- | -------- | -------- | --------- |
| JSON          | 62.84 ns   | (57.57 ns .. 198.22 ns/iter) | 66.28 ns | 76.09 ns | 76.71 ns  |
| Vixeny safe   | 41.94 ns   | (32.73 ns .. 335.54 ns/iter) | 43.94 ns | 91.94 ns | 108.77 ns |
| Vixeny unsafe | 3.26 ns    | (828.6 ps .. 106.48 ns/iter) | 6.19 ns  | 12.71 ns | 14.11 ns  |

### **Vixeny unsafe**

- <span style="color:green">12.85x **faster**</span> than _Vixeny safe_
- <span style="color:green">19.26x **faster**</span> than _JSON_

## One element type number

| Name   | Time (Avg) | Range                       | p75      | p99      | p995     |
| ------ | ---------- | --------------------------- | -------- | -------- | -------- |
| JSON   | 58.97 ns   | (55.92 ns .. 118 ns/iter)   | 58.73 ns | 69.01 ns | 73.54 ns |
| Vixeny | 22.57 ns   | (20.61 ns .. 90.02 ns/iter) | 21.86 ns | 60.25 ns | 68.61 ns |

### **Vixeny**

- <span style="color:green">2.61x **faster**</span> than _JSON_

## Three elements type string

| Name          | Time (Avg) | Range                        | p75       | p99       | p995      |
| ------------- | ---------- | ---------------------------- | --------- | --------- | --------- |
| JSON          | 98.02 ns   | (86.51 ns .. 157.24 ns/iter) | 104.6 ns  | 121.05 ns | 124.15 ns |
| Vixeny safe   | 171.15 ns  | (163.47 ns .. 264.5 ns/iter) | 168.81 ns | 216.08 ns | 230.16 ns |
| Vixeny unsafe | 37.82 ns   | (32.76 ns .. 109.83 ns/iter) | 36.27 ns  | 78.82 ns  | 82.88 ns  |

### **Vixeny unsafe**

- <span style="color:green">2.59x **faster**</span> than _JSON_
- <span style="color:green">4.52x **faster**</span> than _Vixeny safe_

## One nested element

| Name          | Time (Avg) | Range                        | p75      | p99       | p995      |
| ------------- | ---------- | ---------------------------- | -------- | --------- | --------- |
| JSON          | 88.65 ns   | (78.73 ns .. 239.61 ns/iter) | 98.77 ns | 110.11 ns | 112.96 ns |
| Vixeny safe   | 64.49 ns   | (61.11 ns .. 126.13 ns/iter) | 63.94 ns | 99.64 ns  | 104.71 ns |
| Vixeny unsafe | 7.02 ns    | (6.85 ns .. 9.81 ns/iter)    | 7.04 ns  | 7.55 ns   | 7.57 ns   |

### **Vixeny unsafe**

- <span style="color:green">9.18x **faster**</span> than _Vixeny safe_
- <span style="color:green">12.62x **faster**</span> than _JSON_
