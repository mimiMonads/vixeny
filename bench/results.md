
# node v20.5.1 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.25 µs | (1.17 µs .. 1.77 µs/iter) | 1.24 µs | 1.77 µs | 1.77 µs |
| Vixeny query | 82.49 ns | (74.67 ns .. 185.58 ns/iter) | 82.87 ns | 108.15 ns | 112.34 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.41 µs | (1.31 µs .. 1.87 µs/iter) | 1.41 µs | 1.87 µs | 1.87 µs |
| Vixeny query | 125.47 ns | (118.52 ns .. 156.95 ns/iter) | 126.33 ns | 131.27 ns | 132.98 ns |

# node v20.5.1 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 266.03 ns | (255.05 ns .. 337.8 ns/iter) | 266.87 ns | 315.68 ns | 337.8 ns |
| Vixeny safe | 25.52 ns | (23.12 ns .. 52.41 ns/iter) | 28.18 ns | 46.71 ns | 47.28 ns |
| Vixeny unsafe | 4.1 ns | (3.87 ns .. 6.99 ns/iter) | 4.09 ns | 4.34 ns | 4.49 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 219.68 ns | (212.52 ns .. 246.93 ns/iter) | 221.74 ns | 232.59 ns | 234.49 ns |
| Vixeny | 26.02 ns | (22.46 ns .. 31.47 ns/iter) | 27.67 ns | 28.77 ns | 29.26 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 396.59 ns | (388.89 ns .. 410.19 ns/iter) | 398.69 ns | 404.28 ns | 410.19 ns |
| Vixeny safe | 220.69 ns | (212.26 ns .. 260.15 ns/iter) | 221.5 ns | 243.86 ns | 248.73 ns |
| Vixeny unsafe | 4.04 ns | (3.87 ns .. 7.3 ns/iter) | 4.09 ns | 4.21 ns | 4.35 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 340.75 ns | (335.39 ns .. 353.77 ns/iter) | 342.66 ns | 350.97 ns | 353.77 ns |
| Vixeny safe | 97.47 ns | (83.18 ns .. 107.7 ns/iter) | 99.98 ns | 104.84 ns | 105.44 ns |
| Vixeny unsafe | 15.5 ns | (12.6 ns .. 26.37 ns/iter) | 17.99 ns | 19.73 ns | 20.13 ns |

# node v20.5.1 (x64-linux)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 18.93 µs | (14.09 µs .. 1.14 ms/iter) | 16.86 µs | 36.46 µs | 58.23 µs |
| Vixeny JWT | 10.66 µs | (8.45 µs .. 1.64 ms/iter) | 9.51 µs | 17.88 µs | 19.36 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 23.54 µs | (19.53 µs .. 1.31 ms/iter) | 21.71 µs | 31.75 µs | 48.03 µs |
| Vixeny JWT | 11.37 µs | (8.76 µs .. 3.65 ms/iter) | 10.36 µs | 16.02 µs | 18.5 µs |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 43 µs | (32.57 µs .. 1.25 ms/iter) | 49.33 µs | 92.59 µs | 244.54 µs |
| Vixeny JWT | 24.57 µs | (17.95 µs .. 442.61 µs/iter) | 23.53 µs | 56.54 µs | 68.85 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 50.88 µs | (41.21 µs .. 860.64 µs/iter) | 54.13 µs | 92.36 µs | 106.99 µs |
| Vixeny JWT | 0 ps | (0 ps .. 0 ps/iter) | 0 ps | 0 ps | 0 ps |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 7.25 µs | (5.35 µs .. 269.91 µs/iter) | 8.3 µs | 9.3 µs | 12.08 µs |
| Vixeny query | 89.51 ns | (56.08 ns .. 159.47 ns/iter) | 100.32 ns | 152.52 ns | 155.54 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 3.68 µs | (3.55 µs .. 4.56 µs/iter) | 3.67 µs | 4.56 µs | 4.56 µs |
| Vixeny query | 134.61 ns | (126.23 ns .. 205.34 ns/iter) | 134.77 ns | 201.35 ns | 204.98 ns |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 266.97 ns | (243.3 ns .. 373.65 ns/iter) | 291.21 ns | 357.1 ns | 373.65 ns |
| Vixeny safe | 37.59 ns | (34.06 ns .. 46.66 ns/iter) | 37.38 ns | 43.16 ns | 43.28 ns |
| Vixeny unsafe | 5.17 ns | (4.66 ns .. 19.22 ns/iter) | 5.3 ns | 5.85 ns | 6.09 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 251.48 ns | (246.14 ns .. 282.36 ns/iter) | 253.66 ns | 264.21 ns | 268.12 ns |
| Vixeny | 22.51 ns | (19.02 ns .. 89.06 ns/iter) | 24.32 ns | 25.57 ns | 25.99 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 359.91 ns | (348.84 ns .. 390.02 ns/iter) | 365.69 ns | 372.8 ns | 390.02 ns |
| Vixeny safe | 350.42 ns | (343.4 ns .. 514.87 ns/iter) | 350.02 ns | 385 ns | 514.87 ns |
| Vixeny unsafe | 5.88 ns | (5.55 ns .. 69.92 ns/iter) | 6.06 ns | 7 ns | 9.05 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 328.03 ns | (287 ns .. 361.17 ns/iter) | 352.26 ns | 360.11 ns | 361.17 ns |
| Vixeny safe | 174.8 ns | (169.12 ns .. 280.68 ns/iter) | 177.83 ns | 186.37 ns | 186.95 ns |
| Vixeny unsafe | 19.1 ns | (14.76 ns .. 122.45 ns/iter) | 20.97 ns | 26.29 ns | 27.25 ns |

# bun 1.0.3 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 72.62 ns | (60.94 ns .. 270.46 ns/iter) | 74.86 ns | 126.15 ns | 134.56 ns |
| Vixeny safe | 46.18 ns | (34.89 ns .. 120.56 ns/iter) | 50.6 ns | 106 ns | 109.47 ns |
| Vixeny unsafe | 9.75 ns | (1.19 ns .. 138.11 ns/iter) | 14.46 ns | 26.2 ns | 64.25 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 84.16 ns | (73.24 ns .. 147.92 ns/iter) | 89.13 ns | 127.78 ns | 132.41 ns |
| Vixeny | 32.17 ns | (27.51 ns .. 450.3 ns/iter) | 30.1 ns | 88.96 ns | 95.17 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 113.87 ns | (90.3 ns .. 203.12 ns/iter) | 127.46 ns | 165.43 ns | 175.74 ns |
| Vixeny safe | 220.32 ns | (209.36 ns .. 276.94 ns/iter) | 220.49 ns | 275.04 ns | 276.34 ns |
| Vixeny unsafe | 46.57 ns | (39.44 ns .. 150.49 ns/iter) | 44.62 ns | 98.71 ns | 103.01 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 127.09 ns | (111.64 ns .. 186.88 ns/iter) | 133 ns | 157.89 ns | 169.41 ns |
| Vixeny safe | 75.42 ns | (71.21 ns .. 127.86 ns/iter) | 74.75 ns | 114.36 ns | 115.48 ns |
| Vixeny unsafe | 8.4 ns | (8.26 ns .. 12.08 ns/iter) | 8.38 ns | 8.96 ns | 8.96 ns |

# bun 1.0.3 (x64-linux)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 39.85 µs | (24.43 µs .. 1.67 ms/iter) | 38.07 µs | 85.14 µs | 117.18 µs |
| Vixeny JWT | 3.24 µs | (2.64 µs .. 4.3 µs/iter) | 3.44 µs | 4.3 µs | 4.3 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 34.05 µs | (24.44 µs .. 1.46 ms/iter) | 32.63 µs | 69.58 µs | 78.41 µs |
| Vixeny JWT | 4.02 µs | (3.38 µs .. 4.62 µs/iter) | 4.28 µs | 4.62 µs | 4.62 µs |

# bun 1.0.3 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.83 µs | (1.65 µs .. 3.06 µs/iter) | 1.86 µs | 3.06 µs | 3.06 µs |
| Vixeny query | 135.5 ns | (118.45 ns .. 277.27 ns/iter) | 131.4 ns | 232.08 ns | 261.22 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.81 µs | (1.74 µs .. 2.26 µs/iter) | 1.81 µs | 2.26 µs | 2.26 µs |
| Vixeny query | 219.67 ns | (193.21 ns .. 301.15 ns/iter) | 226.91 ns | 291.01 ns | 294.14 ns |
