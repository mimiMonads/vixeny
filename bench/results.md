
# node v20.5.1 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.49 µs | (1.21 µs .. 1.94 µs/iter) | 1.5 µs | 1.94 µs | 1.94 µs |
| Vixeny query | 70.94 ns | (62.59 ns .. 148.36 ns/iter) | 71.66 ns | 86.02 ns | 89.48 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.34 µs | (1.3 µs .. 1.58 µs/iter) | 1.34 µs | 1.58 µs | 1.58 µs |
| Vixeny query | 135.56 ns | (132.48 ns .. 173.8 ns/iter) | 135.79 ns | 163.1 ns | 169.46 ns |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 7.06 µs | (5.38 µs .. 290.87 µs/iter) | 7.38 µs | 12.93 µs | 14.52 µs |
| Vixeny query | 59.45 ns | (55.01 ns .. 204.77 ns/iter) | 56.26 ns | 122.01 ns | 170.15 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 4.11 µs | (3.59 µs .. 4.57 µs/iter) | 4.39 µs | 4.57 µs | 4.57 µs |
| Vixeny query | 174.74 ns | (139.76 ns .. 252.44 ns/iter) | 177.5 ns | 249.11 ns | 249.74 ns |

# bun 1.0.3 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 68.23 ns | (51.72 ns .. 208.11 ns/iter) | 69.64 ns | 114.05 ns | 124.97 ns |
| Vixeny safe | 54.55 ns | (40.72 ns .. 212.37 ns/iter) | 57.36 ns | 124.97 ns | 150.29 ns |
| Vixeny unsafe | 14.43 ns | (7.84 ns .. 174.85 ns/iter) | 16.32 ns | 45.97 ns | 72.55 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 79.08 ns | (71.75 ns .. 143.32 ns/iter) | 79.05 ns | 96.92 ns | 97.85 ns |
| Vixeny | 27.16 ns | (20.34 ns .. 119.98 ns/iter) | 26.58 ns | 84.77 ns | 90.56 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 112.04 ns | (96.62 ns .. 216.51 ns/iter) | 117.44 ns | 186.01 ns | 199.42 ns |
| Vixeny safe | 262.6 ns | (241.21 ns .. 473.87 ns/iter) | 258.73 ns | 353.17 ns | 382.01 ns |
| Vixeny unsafe | 53.12 ns | (40.68 ns .. 168.82 ns/iter) | 54.97 ns | 125.95 ns | 144.18 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 138.39 ns | (112.2 ns .. 196.73 ns/iter) | 152.52 ns | 178.09 ns | 193.17 ns |
| Vixeny safe | 88.18 ns | (82.92 ns .. 235.22 ns/iter) | 86.61 ns | 147.48 ns | 162.31 ns |
| Vixeny unsafe | 8.35 ns | (7.64 ns .. 11.58 ns/iter) | 9.32 ns | 9.45 ns | 9.48 ns |

# node v20.5.1 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 224.58 ns | (208.31 ns .. 328.15 ns/iter) | 231.51 ns | 271.73 ns | 276.3 ns |
| Vixeny safe | 28.02 ns | (23.12 ns .. 128.82 ns/iter) | 25.99 ns | 62.21 ns | 66.54 ns |
| Vixeny unsafe | 4.43 ns | (3.78 ns .. 9.02 ns/iter) | 4.86 ns | 6.4 ns | 6.48 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 250.26 ns | (211.48 ns .. 281.66 ns/iter) | 261.59 ns | 269.3 ns | 269.51 ns |
| Vixeny | 16.77 ns | (13.58 ns .. 25.61 ns/iter) | 18.34 ns | 20.58 ns | 21.26 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 468.21 ns | (386.08 ns .. 637.95 ns/iter) | 475.72 ns | 582.09 ns | 637.95 ns |
| Vixeny safe | 217.9 ns | (208.53 ns .. 250.02 ns/iter) | 220.18 ns | 240.69 ns | 247.49 ns |
| Vixeny unsafe | 4.39 ns | (3.88 ns .. 10.22 ns/iter) | 4.32 ns | 7.62 ns | 8.03 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 348.69 ns | (333.73 ns .. 382.59 ns/iter) | 353.17 ns | 378.83 ns | 382.59 ns |
| Vixeny safe | 91.54 ns | (79.3 ns .. 121.65 ns/iter) | 98.21 ns | 111.82 ns | 112.62 ns |
| Vixeny unsafe | 17.93 ns | (14.48 ns .. 28.8 ns/iter) | 20.7 ns | 23.68 ns | 24.45 ns |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 47.26 µs | (34.79 µs .. 1.33 ms/iter) | 53.74 µs | 103.2 µs | 260.34 µs |
| Vixeny JWT | 29.65 µs | (20.59 µs .. 483.27 µs/iter) | 32.6 µs | 72.83 µs | 89.81 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 48.67 µs | (36.11 µs .. 1.04 ms/iter) | 52.88 µs | 93.51 µs | 128.15 µs |
| Vixeny JWT | 0 ps | (0 ps .. 0 ps/iter) | 0 ps | 0 ps | 0 ps |

# bun 1.0.3 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.95 µs | (1.63 µs .. 3.05 µs/iter) | 2.05 µs | 3.05 µs | 3.05 µs |
| Vixeny query | 160.26 ns | (115.63 ns .. 816.01 ns/iter) | 159.36 ns | 291.67 ns | 434.77 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.83 µs | (1.68 µs .. 2.22 µs/iter) | 1.86 µs | 2.22 µs | 2.22 µs |
| Vixeny query | 227.59 ns | (192.81 ns .. 537.46 ns/iter) | 244.38 ns | 406.8 ns | 433.24 ns |

# bun 1.0.3 (x64-linux)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 38.41 µs | (21.18 µs .. 1.53 ms/iter) | 36.87 µs | 87.62 µs | 121.28 µs |
| Vixeny JWT | 3.89 µs | (2.72 µs .. 7.9 µs/iter) | 4.29 µs | 7.9 µs | 7.9 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 35.06 µs | (18.22 µs .. 1.74 ms/iter) | 33.66 µs | 83.67 µs | 121.06 µs |
| Vixeny JWT | 3.89 µs | (2.97 µs .. 3 ms/iter) | 3.64 µs | 11.4 µs | 13.19 µs |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 266.99 ns | (244.23 ns .. 611.86 ns/iter) | 268.47 ns | 490.07 ns | 611.86 ns |
| Vixeny safe | 39.05 ns | (36.32 ns .. 45.76 ns/iter) | 40.27 ns | 44.5 ns | 44.59 ns |
| Vixeny unsafe | 5.97 ns | (4.72 ns .. 15.24 ns/iter) | 6.01 ns | 6.36 ns | 6.68 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 295.86 ns | (247.45 ns .. 328.56 ns/iter) | 301.13 ns | 312.2 ns | 328.56 ns |
| Vixeny | 22.51 ns | (18.81 ns .. 94.58 ns/iter) | 24.31 ns | 26.1 ns | 26.69 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 365.21 ns | (351.35 ns .. 383.63 ns/iter) | 371.52 ns | 383.49 ns | 383.63 ns |
| Vixeny safe | 356.87 ns | (343.47 ns .. 522.21 ns/iter) | 359.78 ns | 476.55 ns | 522.21 ns |
| Vixeny unsafe | 5.93 ns | (5.36 ns .. 135.26 ns/iter) | 5.98 ns | 7.02 ns | 9.22 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 362.91 ns | (356.74 ns .. 393.09 ns/iter) | 365.52 ns | 383.33 ns | 393.09 ns |
| Vixeny safe | 174.73 ns | (168.61 ns .. 330.33 ns/iter) | 177.03 ns | 195.09 ns | 196.1 ns |
| Vixeny unsafe | 19.97 ns | (14.84 ns .. 154.91 ns/iter) | 22.13 ns | 32.21 ns | 35.28 ns |

# node v20.5.1 (x64-linux)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 20.37 µs | (14.49 µs .. 1.56 ms/iter) | 17.91 µs | 47.28 µs | 61.52 µs |
| Vixeny JWT | 11.48 µs | (9.05 µs .. 1.81 ms/iter) | 10.43 µs | 19.15 µs | 21.98 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 21.42 µs | (16.9 µs .. 1.43 ms/iter) | 19.35 µs | 41.31 µs | 50.08 µs |
| Vixeny JWT | 11.76 µs | (9.26 µs .. 3.73 ms/iter) | 10.59 µs | 18.43 µs | 20.91 µs |
