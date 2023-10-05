# bun 1.0.3 (x64-linux)

## One element type string

| Name          | Time (Avg) | Range                        | p75      | p99       | p995      |
| ------------- | ---------- | ---------------------------- | -------- | --------- | --------- |
| JSON          | 73.79 ns   | (60.64 ns .. 217.96 ns/iter) | 75.08 ns | 118.29 ns | 136.65 ns |
| Vixeny safe   | 53.47 ns   | (40.38 ns .. 168.8 ns/iter)  | 61.31 ns | 107.01 ns | 114.17 ns |
| Vixeny unsafe | 8.04 ns    | (1.04 ns .. 111.48 ns/iter)  | 14.38 ns | 17.75 ns  | 53.09 ns  |

### **Vixeny unsafe**

- <span style="color:green">6.65x **faster**</span> than _Vixeny safe_
- <span style="color:green">9.17x **faster**</span> than _JSON_

## One element type number

| Name   | Time (Avg) | Range                        | p75      | p99      | p995     |
| ------ | ---------- | ---------------------------- | -------- | -------- | -------- |
| JSON   | 82.56 ns   | (78.15 ns .. 139.56 ns/iter) | 83.94 ns | 87.74 ns | 91.83 ns |
| Vixeny | 23.41 ns   | (19.5 ns .. 103.91 ns/iter)  | 22.26 ns | 71.35 ns | 76.47 ns |

### **Vixeny**

- <span style="color:green">3.53x **faster**</span> than _JSON_

## Three elements type string

| Name          | Time (Avg) | Range                         | p75       | p99       | p995      |
| ------------- | ---------- | ----------------------------- | --------- | --------- | --------- |
| JSON          | 117.26 ns  | (107.36 ns .. 166.22 ns/iter) | 115.6 ns  | 143.1 ns  | 148.5 ns  |
| Vixeny safe   | 215.18 ns  | (200.09 ns .. 357.81 ns/iter) | 211.69 ns | 281.99 ns | 284.18 ns |
| Vixeny unsafe | 47.02 ns   | (41.77 ns .. 106.46 ns/iter)  | 45.1 ns   | 100.56 ns | 101.88 ns |

### **Vixeny unsafe**

- <span style="color:green">2.49x **faster**</span> than _JSON_
- <span style="color:green">4.58x **faster**</span> than _Vixeny safe_

## One nested element

| Name          | Time (Avg) | Range                         | p75       | p99       | p995      |
| ------------- | ---------- | ----------------------------- | --------- | --------- | --------- |
| JSON          | 122.68 ns  | (110.33 ns .. 188.61 ns/iter) | 130.32 ns | 134.28 ns | 140.11 ns |
| Vixeny safe   | 77.35 ns   | (72.94 ns .. 129.36 ns/iter)  | 76.75 ns  | 116.59 ns | 125.57 ns |
| Vixeny unsafe | 7.17 ns    | (7.1 ns .. 11.55 ns/iter)     | 7.17 ns   | 7.44 ns   | 7.55 ns   |

### **Vixeny unsafe**

- <span style="color:green">10.79x **faster**</span> than _Vixeny safe_
- <span style="color:green">17.11x **faster**</span> than _JSON_
