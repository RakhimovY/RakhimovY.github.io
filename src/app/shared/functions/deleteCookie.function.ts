export function getCookie(name: string) {
  return document.cookie.split(';').some((c) => {
    return c.trim().startsWith(name + '=');
  });
}
