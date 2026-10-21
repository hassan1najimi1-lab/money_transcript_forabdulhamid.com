const languageToggle = document.getElementById("languageToggle");

let currentLanguage = "en";

languageToggle.addEventListener("click", function () {
  currentLanguage = currentLanguage === "en" ? "fa" : "en";

  const isPersian = currentLanguage === "fa";

  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = isPersian ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-fa]").forEach(element => {
    element.textContent = isPersian
      ? element.dataset.fa
      : element.dataset.en;
  });

  languageToggle.textContent = isPersian ? "English" : "فارسی";
});