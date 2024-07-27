export function hasRussianChars(str: string) {
  // Регулярное выражение для русских символов (кириллица)
  const russianRegex = /[\u0400-\u04FF]/;
  return russianRegex.test(str);
}
