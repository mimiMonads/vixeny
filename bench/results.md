
# node v20.5.1 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.32 µs | (1.17 µs .. 2.03 µs/iter) | 1.42 µs | 2.03 µs | 2.03 µs |
| Vixeny query | 83.2 ns | (73.71 ns .. 175.26 ns/iter) | 82.24 ns | 127.81 ns | 145.88 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.49 µs | (1.32 µs .. 1.93 µs/iter) | 1.62 µs | 1.93 µs | 1.93 µs |
| Vixeny query | 132.56 ns | (113.59 ns .. 249.56 ns/iter) | 141.12 ns | 149.44 ns | 160.81 ns |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 50.98 µs | (34 µs .. 1.05 ms/iter) | 57.23 µs | 119.83 µs | 288.1 µs |
| Vixeny JWT | 25.17 µs | (19.22 µs .. 479.13 µs/iter) | 23.46 µs | 54.45 µs | 68.27 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 44.23 µs | (34.97 µs .. 762.62 µs/iter) | 45.63 µs | 78.75 µs | 91.14 µs |
| Vixeny JWT | 0 ps | (0 ps .. 0 ps/iter) | 0 ps | 0 ps | 0 ps |

# bun 1.0.3 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.73 µs | (1.61 µs .. 2.59 µs/iter) | 1.69 µs | 2.59 µs | 2.59 µs |
| Vixeny query | 138.47 ns | (110.76 ns .. 433.96 ns/iter) | 148.61 ns | 296.34 ns | 325.41 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 2.13 µs | (1.95 µs .. 2.68 µs/iter) | 2.18 µs | 2.68 µs | 2.68 µs |
| Vixeny query | 229.09 ns | (196.52 ns .. 466.31 ns/iter) | 241.57 ns | 345.24 ns | 357.48 ns |

# node v20.5.1 (x64-linux)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 18.89 µs | (14.17 µs .. 1.26 ms/iter) | 16.62 µs | 37.8 µs | 64.93 µs |
| Vixeny JWT | 10.92 µs | (8.84 µs .. 1.64 ms/iter) | 9.62 µs | 18.45 µs | 21.45 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 20.5 µs | (16.38 µs .. 1.73 ms/iter) | 18.52 µs | 31.84 µs | 47 µs |
| Vixeny JWT | 11.36 µs | (9.05 µs .. 3.78 ms/iter) | 10.22 µs | 15.17 µs | 18.58 µs |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 275.73 ns | (256.19 ns .. 359.41 ns/iter) | 281.17 ns | 344.97 ns | 359.41 ns |
| Vixeny safe | 37.99 ns | (35.1 ns .. 48.73 ns/iter) | 38.91 ns | 44.86 ns | 44.89 ns |
| Vixeny unsafe | 6.02 ns | (5.53 ns .. 25.98 ns/iter) | 6.01 ns | 6.2 ns | 6.3 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 270.52 ns | (244.15 ns .. 330.03 ns/iter) | 298.53 ns | 308.37 ns | 330.03 ns |
| Vixeny | 19.24 ns | (15.42 ns .. 115.58 ns/iter) | 21.01 ns | 22.94 ns | 23.54 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 360.89 ns | (347.4 ns .. 375.66 ns/iter) | 365.3 ns | 375.59 ns | 375.66 ns |
| Vixeny safe | 354.06 ns | (340.69 ns .. 561.16 ns/iter) | 352.39 ns | 529.55 ns | 561.16 ns |
| Vixeny unsafe | 5.61 ns | (5.3 ns .. 96.71 ns/iter) | 5.59 ns | 6.48 ns | 8.28 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 296.72 ns | (290.32 ns .. 321.56 ns/iter) | 299.21 ns | 318.97 ns | 321.56 ns |
| Vixeny safe | 145.65 ns | (139.76 ns .. 270.99 ns/iter) | 148.07 ns | 154.45 ns | 156.58 ns |
| Vixeny unsafe | 18.17 ns | (14.56 ns .. 97.89 ns/iter) | 20.88 ns | 25.07 ns | 25.98 ns |

# bun 1.0.3 (x64-linux)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 33.47 µs | (22.18 µs .. 1.86 ms/iter) | 32.01 µs | 73.27 µs | 100.64 µs |
| Vixeny JWT | 3.18 µs | (2.68 µs .. 4.32 µs/iter) | 3.39 µs | 4.32 µs | 4.32 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 30.41 µs | (16.96 µs .. 2.58 ms/iter) | 29.67 µs | 66.28 µs | 73.37 µs |
| Vixeny JWT | 3.8 µs | (3.4 µs .. 5.16 µs/iter) | 3.94 µs | 5.16 µs | 5.16 µs |

# bun 1.0.3 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 64.89 ns | (53.13 ns .. 182.37 ns/iter) | 64.8 ns | 104.35 ns | 124.63 ns |
| Vixeny safe | 58.14 ns | (35.64 ns .. 221.81 ns/iter) | 70.49 ns | 140.95 ns | 182.78 ns |
| Vixeny unsafe | 12.79 ns | (7.87 ns .. 95.72 ns/iter) | 15.43 ns | 59.37 ns | 67.98 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 77.47 ns | (71.08 ns .. 143.89 ns/iter) | 77.76 ns | 123.77 ns | 127.03 ns |
| Vixeny | 27.69 ns | (22.32 ns .. 502.33 ns/iter) | 25.42 ns | 81.48 ns | 87.99 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 105.3 ns | (91.64 ns .. 194.65 ns/iter) | 111.05 ns | 150.62 ns | 157.44 ns |
| Vixeny safe | 258.19 ns | (242.66 ns .. 347.16 ns/iter) | 254.85 ns | 340.03 ns | 347.01 ns |
| Vixeny unsafe | 58.52 ns | (49.81 ns .. 128.2 ns/iter) | 59.09 ns | 114.04 ns | 120.12 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 142.07 ns | (123.83 ns .. 204.49 ns/iter) | 152.93 ns | 164.82 ns | 196.27 ns |
| Vixeny safe | 85.16 ns | (79.18 ns .. 157.82 ns/iter) | 83.75 ns | 135.86 ns | 147.17 ns |
| Vixeny unsafe | 8.13 ns | (7.24 ns .. 26.47 ns/iter) | 8.5 ns | 12.56 ns | 13.29 ns |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 6.92 µs | (5.39 µs .. 1.46 ms/iter) | 7.11 µs | 10.06 µs | 15.33 µs |
| Vixeny query | 57.23 ns | (45.93 ns .. 114.14 ns/iter) | 56.26 ns | 101.49 ns | 108.87 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 3.93 µs | (3.53 µs .. 4.58 µs/iter) | 4.36 µs | 4.58 µs | 4.58 µs |
| Vixeny query | 172.43 ns | (150.34 ns .. 346.63 ns/iter) | 188.33 ns | 202.9 ns | 204.13 ns |

# node v20.5.1 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 244.47 ns | (212.25 ns .. 335.7 ns/iter) | 264.51 ns | 324.99 ns | 326.96 ns |
| Vixeny safe | 28.53 ns | (23.13 ns .. 61.6 ns/iter) | 28.19 ns | 45.81 ns | 45.82 ns |
| Vixeny unsafe | 4.36 ns | (3.99 ns .. 8.01 ns/iter) | 4.59 ns | 5.55 ns | 6.68 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 227.75 ns | (204.11 ns .. 322.12 ns/iter) | 229.38 ns | 277.07 ns | 284.02 ns |
| Vixeny | 19.53 ns | (13.58 ns .. 32.63 ns/iter) | 21.56 ns | 22.61 ns | 23.07 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 466.86 ns | (386.99 ns .. 500.54 ns/iter) | 485.06 ns | 496.88 ns | 500.54 ns |
| Vixeny safe | 220.15 ns | (211.09 ns .. 393.25 ns/iter) | 220.23 ns | 302.43 ns | 341.88 ns |
| Vixeny unsafe | 4.07 ns | (3.83 ns .. 35.68 ns/iter) | 4.09 ns | 4.81 ns | 7.04 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 454.54 ns | (339.18 ns .. 677.63 ns/iter) | 537.84 ns | 664.61 ns | 677.63 ns |
| Vixeny safe | 99.8 ns | (85.12 ns .. 133.91 ns/iter) | 105.81 ns | 121.89 ns | 124.16 ns |
| Vixeny unsafe | 17.01 ns | (12.22 ns .. 40.78 ns/iter) | 18.9 ns | 29.64 ns | 32.15 ns |
