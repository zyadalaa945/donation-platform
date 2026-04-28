// متغيرات لحفظ بيانات التبرع
let currentAmount = 0;
let currentItem = "";
let selectedMethod = "";

// ------------------- فتح نافذة اختيار طريقة الدفع -------------------
function openPaymentMethod(amount, item) {
  currentAmount = amount;
  currentItem = item;
  document.getElementById("paymentMethodModal").style.display = "flex";
}

function openCustomPayment(sector) {
  let amount = document.getElementById("customAmount").value;
  if (amount && amount > 0) {
    currentAmount = amount;
    currentItem = `${sector} - تبرع بقيمة ${amount} جنيه`;
    document.getElementById("paymentMethodModal").style.display = "flex";
  } else {
    alert("⚠️ من فضلك أدخل مبلغ صحيح");
  }
}

function closePaymentMethod() {
  document.getElementById("paymentMethodModal").style.display = "none";
}

// ------------------- فيزا -------------------
function showVisaForm() {
  selectedMethod = "visa";
  document.getElementById("paymentMethodModal").style.display = "none";
  document.getElementById("visaModal").style.display = "flex";
}

function closeVisaForm() {
  document.getElementById("visaModal").style.display = "none";
}

function processVisaPayment() {
  let cardNumber = document.getElementById("cardNumber").value;
  let expiryDate = document.getElementById("expiryDate").value;
  let cvv = document.getElementById("cvv").value;
  let cardName = document.getElementById("cardName").value;

  // محاكاة عملية التحقق
  if (cardNumber.length === 16 && cardName.length > 2 && expiryDate.length > 3 && cvv.length === 3) {
    // محاكاة نجاح عشوائي (90% نجاح، 10% فشل)
    let isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      showResult(true, "✅ تم الدفع بنجاح 💖", `شكراً لتبرعك بقيمة ${currentAmount} جنيه لـ ${currentItem}`);
    } else {
      showResult(false, "❌ فشل الدفع", "يرجى التأكد من رصيدك أو استخدام طريقة دفع أخرى");
    }
    closeVisaForm();
    clearVisaForm();
  } else {
    showResult(false, "❌ بيانات غير صحيحة", "يرجى إدخال بيانات البطاقة بشكل صحيح (16 رقم للبطاقة، 3 أرقام CVV)");
    closeVisaForm();
  }
}

function clearVisaForm() {
  document.getElementById("cardNumber").value = "";
  document.getElementById("expiryDate").value = "";
  document.getElementById("cvv").value = "";
  document.getElementById("cardName").value = "";
}

// ------------------- فودافون كاش -------------------
function showVodafoneForm() {
  selectedMethod = "vodafone";
  document.getElementById("paymentMethodModal").style.display = "none";
  document.getElementById("vodafoneModal").style.display = "flex";
}

function closeVodafoneForm() {
  document.getElementById("vodafoneModal").style.display = "none";
}

function processVodafonePayment() {
  let phoneNumber = document.getElementById("vodafoneNumber").value;
  let pin = document.getElementById("vodafonePin").value;

  // محاكاة التحقق: الرقم يبدأ بـ 010 أو 011 أو 012 وطوله 11 رقم، والرقم السري 6 أرقام
  let isValidPhone = /^01[0125][0-9]{8}$/.test(phoneNumber);
  let isValidPin = /^[0-9]{6}$/.test(pin);

  if (isValidPhone && isValidPin) {
    // محاكاة نجاح عشوائي (85% نجاح، 15% فشل)
    let isSuccess = Math.random() > 0.15;
    
    if (isSuccess) {
      showResult(true, "✅ تم الدفع بنجاح 💖", `شكراً لتبرعك بقيمة ${currentAmount} جنيه عبر فودافون كاش`);
    } else {
      showResult(false, "❌ فشل الدفع", "يرجى التأكد من رصيد محفظتك أو الاتصال بخدمة العملاء");
    }
    closeVodafoneForm();
    clearVodafoneForm();
  } else {
    showResult(false, "❌ بيانات غير صحيحة", "يرجى إدخال رقم محفظة صحيح (11 رقم يبدأ بـ 010/011/012) والرقم السري المكون من 6 أرقام");
    closeVodafoneForm();
  }
}

function clearVodafoneForm() {
  document.getElementById("vodafoneNumber").value = "";
  document.getElementById("vodafonePin").value = "";
}

// ------------------- نافذة النتيجة -------------------
function showResult(success, title, message) {
  let resultModal = document.getElementById("resultModal");
  let resultIcon = document.getElementById("resultIcon");
  let resultTitle = document.getElementById("resultTitle");
  let resultMessage = document.getElementById("resultMessage");

  if (success) {
    resultIcon.innerHTML = "✅";
    resultIcon.style.color = "#2e7d32";
    resultTitle.textContent = title;
    resultMessage.textContent = message;
  } else {
    resultIcon.innerHTML = "❌";
    resultIcon.style.color = "#d32f2f";
    resultTitle.textContent = title;
    resultMessage.textContent = message;
  }

  resultModal.style.display = "flex";
}

function closeResult() {
  document.getElementById("resultModal").style.display = "none";
  // إعادة تعيين المتغيرات
  currentAmount = 0;
  currentItem = "";
}

// ------------------- إغلاق القائمة في الجوال -------------------
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    navLinks.classList.toggle("show");
  }
}

// إغلاق النوافذ إذا ضغط المستخدم خارجها
window.onclick = function(event) {
  let modals = document.getElementsByClassName("modal");
  for (let i = 0; i < modals.length; i++) {
    if (event.target === modals[i]) {
      modals[i].style.display = "none";
    }
  }
}