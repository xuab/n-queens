const cross = (a, b = a) => a.flatMap(x => b.map(y => [x, y]))

function* permutations (l) {
  if (l.length < 2) return yield l
  const [first, ...rest] = l
  for (const p of permutations(rest))
    for (const i of l.keys())
      yield [...p.slice(0, i), first, ...p.slice(i)]
}

export function* solutions (n) {
  const indices = [...Array(n).keys()]
  const positions = cross(indices)
  const keys = positions.map(p => p.join(','))

  const deltas = [...Array(n - 1).keys()].flatMap(i => [
    [i - n + 1, i - n + 1],
    [i + 1, i + 1],
    [n - i - 1, i - n + 1],
    [-i - 1, i + 1],
  ])

  const diags = new Map(positions.map((p) => [
    p.join(','),
    deltas
      .map(d => [d[0] + p[0], d[1] + p[1]].join(','))
      .filter(k => keys.includes(k)),
  ]))

  for (const p of permutations(indices)) {
    const keys = [...p.entries()].map(entry => entry.join(','))
    if (!keys.some(k1 => keys.some(k2 => diags.get(k2).includes(k1)))) {
      yield(p)
    }
  }
}

export function grid(positions) {
  const n = positions.length
  const grid = [...Array(n)].map(() => Array(n).fill('.'))
  for (const [x, y] of positions.entries()) {
    grid[x][y] = 'o'
  }
  return grid
}

