export function openMail() {
  const email = 'Silkcargo2@gmail.com';
  const subject = 'To SikCargo';
  const body = 'Здравствуйте. У меня вопрос на счет доставки.';

  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
