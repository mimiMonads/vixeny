# bun 1.0.3 (x64-linux)

## Sign

| Name       | Time (Avg) | Range                      | p75     | p99      | p995     |
| ---------- | ---------- | -------------------------- | ------- | -------- | -------- |
| Jose       | 32.75 µs   | (21.32 µs .. 1.38 ms/iter) | 31.4 µs | 67.25 µs | 91.33 µs |
| Vixeny JWT | 2.31 µs    | (2.06 µs .. 2.99 µs/iter)  | 2.44 µs | 2.99 µs  | 2.99 µs  |

### **Vixeny JWT**

- <span style="color:green">14.15x **faster**</span> than _Jose_

## verify

| Name       | Time (Avg) | Range                      | p75      | p99      | p995     |
| ---------- | ---------- | -------------------------- | -------- | -------- | -------- |
| Jose       | 30.26 µs   | (17.34 µs .. 1.14 ms/iter) | 29.49 µs | 60.45 µs | 69.83 µs |
| Vixeny JWT | 3.46 µs    | (3.02 µs .. 4.13 µs/iter)  | 3.65 µs  | 4.13 µs  | 4.13 µs  |

### **Vixeny JWT**

- <span style="color:green">8.74x **faster**</span> than _Jose_
