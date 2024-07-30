export function openWhatsapp() {
  // Замените номер телефона на нужный
  let phoneNumber = '+77788743572'; // Формат: международный код + номер
  let message = 'Здравствуйте. У меня вопрос на счет доставки.'; // Замените на ваш текст

  // Создаем ссылку с предварительно заполненным сообщением
  let whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Открываем ссылку в новой вкладке
  window.open(whatsappUrl, '_blank');
}
