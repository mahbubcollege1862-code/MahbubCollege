/** "SHRAVAN kumar yadav" -> "Shravan Kumar Yadav": first letter of each word capitalised, the rest lower-case. */
export function toNameCase(value: string): string {
  return value.toLowerCase().replace(/(^|[\s\-.])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}
