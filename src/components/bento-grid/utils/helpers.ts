export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const a = shuffled[i]
    const b = shuffled[j]
    if (a === undefined || b === undefined) {
      continue
    }
    shuffled[i] = b
    shuffled[j] = a
  }
  return shuffled
}

export function generateDateRange(totalDays: number): string[] {
  const dates: string[] = []
  const today = new Date()

  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(date.toISOString().split('T')[0] ?? '')
  }

  return dates
}
