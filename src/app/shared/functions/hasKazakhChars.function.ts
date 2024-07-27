export function hasKazakhChars(str: string) {
  // Пример регулярного выражения для казахских символов
  const kazakhRegex = /[\u0400-\u04FF\u05B0-\u05BB]/;
  return kazakhRegex.test(str);
}
