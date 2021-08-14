import { PerformanceObserver, performance } from 'perf_hooks'
import { solutions, grid } from './n-queens.js'

const arg = parseInt(process.argv[2])
const n = isNaN(arg) ? 8 : arg

let count = 0
let time = 0

const obs = new PerformanceObserver(items => {
  time += items.getEntries()[0].duration
  performance.clearMarks()
})

obs.observe({ entryTypes: ['measure'] })

performance.mark('A')
for (const solution of solutions(n)) {
  performance.measure('solution', 'A')
  count += 1
  const board = grid(solution)
  console.log(board.map(line => line.join(' ')).join('\n') + '\n')
  performance.mark('A')
}

console.log(`${count} solutions`)
console.log(`${n}-queens solved in ${Math.round(time)} ms`)
