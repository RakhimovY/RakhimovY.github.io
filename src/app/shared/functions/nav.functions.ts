export function navToElement(tag: string) {
  const element = document.getElementById(tag);
  if (element)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
}
