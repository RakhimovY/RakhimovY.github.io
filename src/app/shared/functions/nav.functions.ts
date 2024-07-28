export function navToElement(tag: string) {
  const element = document.getElementById(tag);
  console.log(tag);
  console.log(element);
  if (element)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
}
