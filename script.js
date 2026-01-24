(function () {
  const navbtn = document.getElementById("navbtn");
  const mobile = document.getElementById("mobile");

  if (navbtn && mobile) {
    navbtn.addEventListener("click", () => {
      const isOpen = mobile.classList.toggle("show");
      navbtn.setAttribute("aria-expanded", String(isOpen));
    });

    // close menu on click
    mobile.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        mobile.classList.remove("show");
        navbtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
