# node v20.5.1 (x64-linux)

## Sign

| Name       | Time (Avg) | Range                      | p75      | p99      | p995     |
| ---------- | ---------- | -------------------------- | -------- | -------- | -------- |
| Jose       | 18.88 µs   | (13.79 µs .. 1.23 ms/iter) | 16.81 µs | 44.76 µs | 56.52 µs |
| Vixeny JWT | 9.46 µs    | (6.67 µs .. 2.58 ms/iter)  | 8.51 µs  | 15.86 µs | 18.95 µs |

### **Vixeny JWT**

- <span style="color:green">2x **faster**</span> than _Jose_

## verify

| Name       | Time (Avg) | Range                     | p75     | p99      | p995     |
| ---------- | ---------- | ------------------------- | ------- | -------- | -------- |
| Jose       | 21.03 µs   | (15.89 µs .. 1.4 ms/iter) | 18.8 µs | 40.97 µs | 47.53 µs |
| Vixeny JWT | 9.35 µs    | (7.41 µs .. 7.59 ms/iter) | 8.38 µs | 12.41 µs | 15.47 µs |

### **Vixeny JWT**

- <span style="color:green">2.25x **faster**</span> than _Jose_
