export function rollDice(sides = 6) {
  return Math.floor(Math.random() * sides) + 1;
}
