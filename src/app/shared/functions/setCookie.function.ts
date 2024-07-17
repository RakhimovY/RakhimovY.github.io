export function setCookieFunction(name: string, value: string) {
  document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
}
