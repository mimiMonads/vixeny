
```bash
npm run build-all
```
# node v20.5.1 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 230.94 ns | (208.02 ns .. 362.06 ns/iter) | 239.71 ns | 298.34 ns | 320.21 ns |
| Vixeny safe | 26.33 ns | (23.12 ns .. 53.87 ns/iter) | 28.18 ns | 45.75 ns | 46.49 ns |
| Vixeny unsafe | 4.11 ns | (3.91 ns .. 16.18 ns/iter) | 4.09 ns | 4.73 ns | 6.25 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 218.03 ns | (211.8 ns .. 243.46 ns/iter) | 220.01 ns | 226.73 ns | 231.78 ns |
| Vixeny | 16.14 ns | (12.72 ns .. 30.64 ns/iter) | 17.87 ns | 18.75 ns | 18.98 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 398.49 ns | (386.41 ns .. 428.46 ns/iter) | 401.47 ns | 419.42 ns | 428.46 ns |
| Vixeny safe | 234.78 ns | (219.18 ns .. 288.54 ns/iter) | 239.34 ns | 281.38 ns | 284.36 ns |
| Vixeny unsafe | 4.4 ns | (4.06 ns .. 21.93 ns/iter) | 4.44 ns | 7.22 ns | 7.46 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 348.44 ns | (320.69 ns .. 401.26 ns/iter) | 355.07 ns | 390.95 ns | 401.26 ns |
| Vixeny safe | 103.62 ns | (98.99 ns .. 137.47 ns/iter) | 105.82 ns | 111.09 ns | 116.54 ns |
| Vixeny unsafe | 16.71 ns | (12.45 ns .. 32.37 ns/iter) | 19.17 ns | 23.2 ns | 24.41 ns |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 53.16 µs | (36.75 µs .. 968.74 µs/iter) | 59.3 µs | 120.2 µs | 317.29 µs |
| Vixeny JWT | 27.28 µs | (18.88 µs .. 499.94 µs/iter) | 30.86 µs | 67.9 µs | 80.81 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 47.29 µs | (34.92 µs .. 784.6 µs/iter) | 51.01 µs | 89.18 µs | 118.81 µs |
| Vixeny JWT | 0 ps | (0 ps .. 0 ps/iter) | 0 ps | 0 ps | 0 ps |

# bun 1.0.3 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 65.78 ns | (52.96 ns .. 199.65 ns/iter) | 65.66 ns | 106.43 ns | 114.14 ns |
| Vixeny safe | 53.43 ns | (40.55 ns .. 148.02 ns/iter) | 58.59 ns | 122.6 ns | 130.41 ns |
| Vixeny unsafe | 12.78 ns | (7.65 ns .. 82.64 ns/iter) | 15.53 ns | 59.79 ns | 65.15 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 79.68 ns | (74.39 ns .. 152.54 ns/iter) | 80.64 ns | 88.92 ns | 92.3 ns |
| Vixeny | 24.7 ns | (19.5 ns .. 223.13 ns/iter) | 23.41 ns | 72.58 ns | 77.4 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 108.87 ns | (88.89 ns .. 202.53 ns/iter) | 116.38 ns | 174.82 ns | 188.4 ns |
| Vixeny safe | 256.35 ns | (242.98 ns .. 533.71 ns/iter) | 252.6 ns | 321.06 ns | 350.22 ns |
| Vixeny unsafe | 53.89 ns | (40.85 ns .. 217.89 ns/iter) | 54.55 ns | 127.23 ns | 129.99 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 130.05 ns | (112.81 ns .. 183.38 ns/iter) | 133.77 ns | 148.44 ns | 175.89 ns |
| Vixeny safe | 88.66 ns | (82.69 ns .. 228.95 ns/iter) | 87.01 ns | 142.53 ns | 154.27 ns |
| Vixeny unsafe | 8.23 ns | (7.64 ns .. 14.15 ns/iter) | 8.63 ns | 9.44 ns | 9.57 ns |

# node v20.5.1 (x64-linux)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 19.85 µs | (14.44 µs .. 1.54 ms/iter) | 17.22 µs | 51.48 µs | 63.81 µs |
| Vixeny JWT | 11.44 µs | (8.85 µs .. 2.33 ms/iter) | 10.49 µs | 22.99 µs | 30.9 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 21.63 µs | (16.85 µs .. 1.61 ms/iter) | 20.13 µs | 40.63 µs | 55.13 µs |
| Vixeny JWT | 11.87 µs | (9.14 µs .. 4.66 ms/iter) | 11.01 µs | 19.55 µs | 23.36 µs |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 269.3 ns | (252.89 ns .. 519.11 ns/iter) | 272.96 ns | 323.6 ns | 519.11 ns |
| Vixeny safe | 38.97 ns | (36.09 ns .. 53.62 ns/iter) | 39.99 ns | 44.85 ns | 45.14 ns |
| Vixeny unsafe | 6.66 ns | (6.12 ns .. 30.09 ns/iter) | 6.64 ns | 6.99 ns | 7.3 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 255.68 ns | (239.76 ns .. 327.58 ns/iter) | 254.62 ns | 302.5 ns | 314.11 ns |
| Vixeny | 19.22 ns | (15.65 ns .. 104.71 ns/iter) | 20.91 ns | 22.85 ns | 23.52 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 358.8 ns | (347.11 ns .. 422.3 ns/iter) | 364.53 ns | 395.04 ns | 422.3 ns |
| Vixeny safe | 359.64 ns | (344.26 ns .. 537 ns/iter) | 359.57 ns | 516.29 ns | 537 ns |
| Vixeny unsafe | 6.04 ns | (5.42 ns .. 112.94 ns/iter) | 6.11 ns | 8.52 ns | 8.98 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 335.84 ns | (285.87 ns .. 368.36 ns/iter) | 351.51 ns | 366.8 ns | 368.36 ns |
| Vixeny safe | 176.41 ns | (169.18 ns .. 314.54 ns/iter) | 179.14 ns | 197.71 ns | 220.43 ns |
| Vixeny unsafe | 19.88 ns | (14.4 ns .. 119.51 ns/iter) | 22.81 ns | 29.33 ns | 30.69 ns |

# bun 1.0.3 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.81 µs | (1.61 µs .. 2.7 µs/iter) | 1.89 µs | 2.7 µs | 2.7 µs |
| Vixeny query | 140.27 ns | (117.98 ns .. 445.52 ns/iter) | 144.29 ns | 263.42 ns | 308.55 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.86 µs | (1.74 µs .. 2.39 µs/iter) | 1.87 µs | 2.39 µs | 2.39 µs |
| Vixeny query | 230.36 ns | (206.26 ns .. 463.05 ns/iter) | 233.46 ns | 395.18 ns | 418.95 ns |

# bun 1.0.3 (x64-linux)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 33.45 µs | (19.97 µs .. 2.05 ms/iter) | 31.4 µs | 80.92 µs | 111.45 µs |
| Vixeny JWT | 3.22 µs | (2.76 µs .. 4.51 µs/iter) | 3.57 µs | 4.51 µs | 4.51 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 30.54 µs | (17.82 µs .. 1.42 ms/iter) | 28.62 µs | 67.89 µs | 83.15 µs |
| Vixeny JWT | 3.71 µs | (3.45 µs .. 4.08 µs/iter) | 3.8 µs | 4.08 µs | 4.08 µs |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 6.96 µs | (5.29 µs .. 450.6 µs/iter) | 7.26 µs | 11.98 µs | 13.62 µs |
| Vixeny query | 57.23 ns | (45.86 ns .. 116.57 ns/iter) | 56.31 ns | 107.65 ns | 109.87 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 4.11 µs | (3.57 µs .. 4.52 µs/iter) | 4.34 µs | 4.52 µs | 4.52 µs |
| Vixeny query | 150.09 ns | (125.73 ns .. 187.61 ns/iter) | 162.37 ns | 168.78 ns | 169.34 ns |

# node v20.5.1 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.29 µs | (1.16 µs .. 1.95 µs/iter) | 1.3 µs | 1.95 µs | 1.95 µs |
| Vixeny query | 81.81 ns | (65.49 ns .. 135.92 ns/iter) | 85.14 ns | 93.31 ns | 94.03 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.42 µs | (1.32 µs .. 1.88 µs/iter) | 1.44 µs | 1.88 µs | 1.88 µs |
| Vixeny query | 137.59 ns | (132.16 ns .. 206.67 ns/iter) | 139.07 ns | 148.93 ns | 171.11 ns |

# node v20.5.1 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 230.94 ns | (208.02 ns .. 362.06 ns/iter) | 239.71 ns | 298.34 ns | 320.21 ns |
| Vixeny safe | 26.33 ns | (23.12 ns .. 53.87 ns/iter) | 28.18 ns | 45.75 ns | 46.49 ns |
| Vixeny unsafe | 4.11 ns | (3.91 ns .. 16.18 ns/iter) | 4.09 ns | 4.73 ns | 6.25 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 218.03 ns | (211.8 ns .. 243.46 ns/iter) | 220.01 ns | 226.73 ns | 231.78 ns |
| Vixeny | 16.14 ns | (12.72 ns .. 30.64 ns/iter) | 17.87 ns | 18.75 ns | 18.98 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 398.49 ns | (386.41 ns .. 428.46 ns/iter) | 401.47 ns | 419.42 ns | 428.46 ns |
| Vixeny safe | 234.78 ns | (219.18 ns .. 288.54 ns/iter) | 239.34 ns | 281.38 ns | 284.36 ns |
| Vixeny unsafe | 4.4 ns | (4.06 ns .. 21.93 ns/iter) | 4.44 ns | 7.22 ns | 7.46 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 348.44 ns | (320.69 ns .. 401.26 ns/iter) | 355.07 ns | 390.95 ns | 401.26 ns |
| Vixeny safe | 103.62 ns | (98.99 ns .. 137.47 ns/iter) | 105.82 ns | 111.09 ns | 116.54 ns |
| Vixeny unsafe | 16.71 ns | (12.45 ns .. 32.37 ns/iter) | 19.17 ns | 23.2 ns | 24.41 ns |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 53.16 µs | (36.75 µs .. 968.74 µs/iter) | 59.3 µs | 120.2 µs | 317.29 µs |
| Vixeny JWT | 27.28 µs | (18.88 µs .. 499.94 µs/iter) | 30.86 µs | 67.9 µs | 80.81 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 47.29 µs | (34.92 µs .. 784.6 µs/iter) | 51.01 µs | 89.18 µs | 118.81 µs |
| Vixeny JWT | 0 ps | (0 ps .. 0 ps/iter) | 0 ps | 0 ps | 0 ps |

# bun 1.0.3 (x64-linux)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 65.78 ns | (52.96 ns .. 199.65 ns/iter) | 65.66 ns | 106.43 ns | 114.14 ns |
| Vixeny safe | 53.43 ns | (40.55 ns .. 148.02 ns/iter) | 58.59 ns | 122.6 ns | 130.41 ns |
| Vixeny unsafe | 12.78 ns | (7.65 ns .. 82.64 ns/iter) | 15.53 ns | 59.79 ns | 65.15 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 79.68 ns | (74.39 ns .. 152.54 ns/iter) | 80.64 ns | 88.92 ns | 92.3 ns |
| Vixeny | 24.7 ns | (19.5 ns .. 223.13 ns/iter) | 23.41 ns | 72.58 ns | 77.4 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 108.87 ns | (88.89 ns .. 202.53 ns/iter) | 116.38 ns | 174.82 ns | 188.4 ns |
| Vixeny safe | 256.35 ns | (242.98 ns .. 533.71 ns/iter) | 252.6 ns | 321.06 ns | 350.22 ns |
| Vixeny unsafe | 53.89 ns | (40.85 ns .. 217.89 ns/iter) | 54.55 ns | 127.23 ns | 129.99 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 130.05 ns | (112.81 ns .. 183.38 ns/iter) | 133.77 ns | 148.44 ns | 175.89 ns |
| Vixeny safe | 88.66 ns | (82.69 ns .. 228.95 ns/iter) | 87.01 ns | 142.53 ns | 154.27 ns |
| Vixeny unsafe | 8.23 ns | (7.64 ns .. 14.15 ns/iter) | 8.63 ns | 9.44 ns | 9.57 ns |

# node v20.5.1 (x64-linux)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 19.85 µs | (14.44 µs .. 1.54 ms/iter) | 17.22 µs | 51.48 µs | 63.81 µs |
| Vixeny JWT | 11.44 µs | (8.85 µs .. 2.33 ms/iter) | 10.49 µs | 22.99 µs | 30.9 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 21.63 µs | (16.85 µs .. 1.61 ms/iter) | 20.13 µs | 40.63 µs | 55.13 µs |
| Vixeny JWT | 11.87 µs | (9.14 µs .. 4.66 ms/iter) | 11.01 µs | 19.55 µs | 23.36 µs |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One element type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 269.3 ns | (252.89 ns .. 519.11 ns/iter) | 272.96 ns | 323.6 ns | 519.11 ns |
| Vixeny safe | 38.97 ns | (36.09 ns .. 53.62 ns/iter) | 39.99 ns | 44.85 ns | 45.14 ns |
| Vixeny unsafe | 6.66 ns | (6.12 ns .. 30.09 ns/iter) | 6.64 ns | 6.99 ns | 7.3 ns |


## One element type number
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 255.68 ns | (239.76 ns .. 327.58 ns/iter) | 254.62 ns | 302.5 ns | 314.11 ns |
| Vixeny | 19.22 ns | (15.65 ns .. 104.71 ns/iter) | 20.91 ns | 22.85 ns | 23.52 ns |


## Three elements type string
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 358.8 ns | (347.11 ns .. 422.3 ns/iter) | 364.53 ns | 395.04 ns | 422.3 ns |
| Vixeny safe | 359.64 ns | (344.26 ns .. 537 ns/iter) | 359.57 ns | 516.29 ns | 537 ns |
| Vixeny unsafe | 6.04 ns | (5.42 ns .. 112.94 ns/iter) | 6.11 ns | 8.52 ns | 8.98 ns |


## One nested element
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| JSON | 335.84 ns | (285.87 ns .. 368.36 ns/iter) | 351.51 ns | 366.8 ns | 368.36 ns |
| Vixeny safe | 176.41 ns | (169.18 ns .. 314.54 ns/iter) | 179.14 ns | 197.71 ns | 220.43 ns |
| Vixeny unsafe | 19.88 ns | (14.4 ns .. 119.51 ns/iter) | 22.81 ns | 29.33 ns | 30.69 ns |

# bun 1.0.3 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.81 µs | (1.61 µs .. 2.7 µs/iter) | 1.89 µs | 2.7 µs | 2.7 µs |
| Vixeny query | 140.27 ns | (117.98 ns .. 445.52 ns/iter) | 144.29 ns | 263.42 ns | 308.55 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.86 µs | (1.74 µs .. 2.39 µs/iter) | 1.87 µs | 2.39 µs | 2.39 µs |
| Vixeny query | 230.36 ns | (206.26 ns .. 463.05 ns/iter) | 233.46 ns | 395.18 ns | 418.95 ns |

# bun 1.0.3 (x64-linux)

## Sign
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 33.45 µs | (19.97 µs .. 2.05 ms/iter) | 31.4 µs | 80.92 µs | 111.45 µs |
| Vixeny JWT | 3.22 µs | (2.76 µs .. 4.51 µs/iter) | 3.57 µs | 4.51 µs | 4.51 µs |


## verify
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| Jose | 30.54 µs | (17.82 µs .. 1.42 ms/iter) | 28.62 µs | 67.89 µs | 83.15 µs |
| Vixeny JWT | 3.71 µs | (3.45 µs .. 4.08 µs/iter) | 3.8 µs | 4.08 µs | 4.08 µs |

# deno 1.37.0 (x86_64-unknown-linux-gnu)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 6.96 µs | (5.29 µs .. 450.6 µs/iter) | 7.26 µs | 11.98 µs | 13.62 µs |
| Vixeny query | 57.23 ns | (45.86 ns .. 116.57 ns/iter) | 56.31 ns | 107.65 ns | 109.87 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 4.11 µs | (3.57 µs .. 4.52 µs/iter) | 4.34 µs | 4.52 µs | 4.52 µs |
| Vixeny query | 150.09 ns | (125.73 ns .. 187.61 ns/iter) | 162.37 ns | 168.78 ns | 169.34 ns |

# node v20.5.1 (x64-linux)

## One query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.29 µs | (1.16 µs .. 1.95 µs/iter) | 1.3 µs | 1.95 µs | 1.95 µs |
| Vixeny query | 81.81 ns | (65.49 ns .. 135.92 ns/iter) | 85.14 ns | 93.31 ns | 94.03 ns |


## multi query
| Name | Time (Avg) | Range | p75 | p99 | p995 |
|------|------------|-------|-----|-----|------|
| new URL | 1.42 µs | (1.32 µs .. 1.88 µs/iter) | 1.44 µs | 1.88 µs | 1.88 µs |
| Vixeny query | 137.59 ns | (132.16 ns .. 206.67 ns/iter) | 139.07 ns | 148.93 ns | 171.11 ns |
