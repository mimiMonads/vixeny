# deno 1.39.1 (x86_64-unknown-linux-gnu)

## One element type string

| Name          | Time (Avg) | Range                        | p75       | p99       | p995      |
| ------------- | ---------- | ---------------------------- | --------- | --------- | --------- |
| JSON          | 212.41 ns  | (167.6 ns .. 246.37 ns/iter) | 216.11 ns | 238.61 ns | 238.87 ns |
| Vixeny safe   | 24.97 ns   | (23.87 ns .. 37.79 ns/iter)  | 24.82 ns  | 35.94 ns  | 36.4 ns   |
| Vixeny unsafe | 4.13 ns    | (4.07 ns .. 12.33 ns/iter)   | 4.12 ns   | 4.46 ns   | 4.5 ns    |

### **Vixeny unsafe**

- <span style="color:green">6.05x **faster**</span> than _Vixeny safe_
- <span style="color:green">51.45x **faster**</span> than _JSON_

## One element type number

| Name   | Time (Avg) | Range                         | p75       | p99       | p995      |
| ------ | ---------- | ----------------------------- | --------- | --------- | --------- |
| JSON   | 161.5 ns   | (158.19 ns .. 236.59 ns/iter) | 163.19 ns | 197.03 ns | 234.28 ns |
| Vixeny | 14.18 ns   | (11.38 ns .. 57.66 ns/iter)   | 15.68 ns  | 16.77 ns  | 17.22 ns  |

### **Vixeny**

- <span style="color:green">11.39x **faster**</span> than _JSON_

## Three elements type string

| Name          | Time (Avg) | Range                         | p75       | p99       | p995      |
| ------------- | ---------- | ----------------------------- | --------- | --------- | --------- |
| JSON          | 234.7 ns   | (228.61 ns .. 243.78 ns/iter) | 236.44 ns | 241.11 ns | 241.99 ns |
| Vixeny safe   | 249.38 ns  | (244.41 ns .. 322.76 ns/iter) | 250.44 ns | 255.68 ns | 256.23 ns |
| Vixeny unsafe | 4.17 ns    | (3.72 ns .. 6.82 ns/iter)     | 4.15 ns   | 4.52 ns   | 4.86 ns   |

### **Vixeny unsafe**

- <span style="color:green">56.32x **faster**</span> than _JSON_
- <span style="color:green">59.84x **faster**</span> than _Vixeny safe_

## One nested element

| Name          | Time (Avg) | Range                         | p75       | p99       | p995      |
| ------------- | ---------- | ----------------------------- | --------- | --------- | --------- |
| JSON          | 195.54 ns  | (191.27 ns .. 204.89 ns/iter) | 197.95 ns | 203.93 ns | 204.28 ns |
| Vixeny safe   | 95.6 ns    | (92.45 ns .. 101.5 ns/iter)   | 95.98 ns  | 100.27 ns | 100.81 ns |
| Vixeny unsafe | 14.06 ns   | (10.99 ns .. 40.16 ns/iter)   | 16.41 ns  | 18.56 ns  | 19.11 ns  |

### **Vixeny unsafe**

- <span style="color:green">6.8x **faster**</span> than _Vixeny safe_
- <span style="color:green">13.91x **faster**</span> than _JSON_
