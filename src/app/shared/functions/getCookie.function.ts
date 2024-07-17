export function getCookie(name: string) {
  const regex = new RegExp(`(^| )${name}=([^;]+)`);
  const match = document.cookie.match(regex);
  return match ? match[2] : '';
}
