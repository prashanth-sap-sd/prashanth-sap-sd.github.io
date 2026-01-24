(function () {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a link (mobile)
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

// === Premium scroll-based background transitions ===
const bgMap = {
  "about": "linear-gradient(180deg, var(--bg1), var(--bg2))",
  "expertise": "linear-gradient(180deg, var(--bg2), var(--bg3))",
  "case-studies": "linear-gradient(180deg, var(--bg3), var(--bg4))",
  "diagrams": "linear-gradient(180deg, var(--bg4), var(--bg2))",
  "certifications": "linear-gradient(180deg, var(--bg2), var(--bg5))",
  "contact": "linear-gradient(180deg, var(--bg5), var(--bg1))",
};

const sections = Object.keys(bgMap)
  .map(id => document.getElementById(id))
  .filter(Boolean);

const setBg = (id) => {
  document.body.style.background = `
    radial-gradient(1200px 800px at 20% 10%, rgba(93,140,255,.18), transparent 60%),
    radial-gradient(900px 700px at 80% 20%, rgba(120,255,214,.12), transparent 55%),
    ${bgMap[id]}
  `;
};

if (sections.length) {
  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id && bgMap[visible.target.id]) {
      setBg(visible.target.id);
    }
  }, { threshold: [0.35, 0.55, 0.7] });

  sections.forEach(s => io.observe(s));
}
