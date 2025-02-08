export function updateBalance(
  currentBalance: number,
  wagerAmount: number,
  multiplier: number
): number {
  return currentBalance + wagerAmount * multiplier;
}
