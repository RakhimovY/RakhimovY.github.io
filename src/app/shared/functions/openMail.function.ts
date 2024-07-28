export function openMail() {
  const email = 'example@example.com';
  const subject = 'To SikCargo';
  const body = 'Здравствуйте. У меня вопрос на счет доставки.';

  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
