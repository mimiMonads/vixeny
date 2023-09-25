await Bun.build({
    entrypoints: ['./fun.ts'],
    outdir: './out',
    root: '.',
  })