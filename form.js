
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("transferForm");
  const languageToggle = document.getElementById("languageToggle");
  const currencyInput = document.getElementById("currency");
  const amountInput = document.getElementById("amount");
  const currencySymbol = document.getElementById("currencySymbol");

  let language =
    localStorage.getItem("northstar-language") || "en";

  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    AFN: "؋"
  };

  const currencyNames = {
    en: {
      USD: "USD — US Dollar",
      EUR: "EUR — Euro",
      GBP: "GBP — British Pound",
      AFN: "AFN — Afghan Afghani"
    },
    fa: {
      USD: "USD — دالر آمریکایی",
      EUR: "EUR — یورو",
      GBP: "GBP — پوند بریتانیا",
      AFN: "AFN — افغانی افغانستان"
    }
  };

  function updateCurrency() {
    currencySymbol.textContent =
      symbols[currencyInput.value] || "$";

    [...currencyInput.options].forEach(option => {
      option.textContent =
        currencyNames[language][option.value];
    });
  }

  function updateLanguage() {
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "fa" ? "rtl" : "ltr";

    document.querySelectorAll("[data-en][data-fa]").forEach(element => {
      element.textContent = element.dataset[language];
    });

    document.querySelectorAll("[data-placeholder-en]").forEach(input => {
      input.placeholder =
        language === "fa"
          ? input.dataset.placeholderFa
          : input.dataset.placeholderEn;
    });

    languageToggle.textContent =
      language === "en" ? "فارسی" : "English";

    updateCurrency();
  }

  languageToggle.addEventListener("click", () => {
    language = language === "en" ? "fa" : "en";

    localStorage.setItem("northstar-language", language);
    updateLanguage();
  });

  currencyInput.addEventListener("change", updateCurrency);

  form.addEventListener("submit", event => {
    event.preventDefault();

    const sender = document.getElementById("sender").value.trim();
    const recipient = document.getElementById("recipient").value.trim();
    const amount = Number(amountInput.value);
    const currency = currencyInput.value;
    const note = document.getElementById("note").value.trim();

    if (!sender || !recipient) {
      alert(
        language === "fa"
          ? "لطفاً نام فرستنده و دریافت‌کننده را وارد کنید."
          : "Please enter both names."
      );
      return;
    }

    if (
      !Number.isFinite(amount) ||
      amount < 0.01 ||
      amount > 1000000
    ) {
      alert(
        language === "fa"
          ? "لطفاً مبلغ نمونه معتبر وارد کنید."
          : "Please enter a valid sample amount."
      );

      amountInput.focus();
      return;
    }

    const transfer = {
      sender,
      recipient,
      amount: amount.toFixed(2),
      currency,
      note,
      language
    };

    try {
      sessionStorage.setItem(
        "northstar-demo-transfer",
        JSON.stringify(transfer)
      );

      localStorage.setItem("northstar-language", language);

      window.location.href = "end.html";
    } catch {
      alert(
        language === "fa"
          ? "ذخیره اطلاعات ناموفق بود. لطفاً دوباره تلاش کنید."
          : "Could not save the preview details. Please try again."
      );
    }
  });

  updateLanguage();
});
