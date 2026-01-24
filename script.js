(function () {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const btn = document.getElementById("menuBtn");
  const mobile = document.getElementById("mobileNav");

  if (btn && mobile) {
    btn.addEventListener("click", () => {
      const isOpen = mobile.classList.toggle("show");
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    mobile.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobile.classList.remove("show");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
