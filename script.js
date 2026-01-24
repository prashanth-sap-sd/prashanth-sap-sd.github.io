// Mobile nav + footer year + premium scroll tint (luxury minimal)
(() => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll-based background tinting (subtle, premium)
  const themes = {
    hero:   { a: "#070A12", b: "#0B1020", glow: "rgba(124,140,255,.20)" },
    about:  { a: "#070A12", b: "#0B0F22", glow: "rgba(102,227,255,.16)" },
    expertise:{a:"#060A14", b:"#0A1024", glow: "rgba(124,140,255,.16)" },
    cases:  { a: "#050A12", b: "#0A1226", glow: "rgba(255,255,255,.10)" },
    diagrams:{a:"#050A12", b:"#081024", glow: "rgba(102,227,255,.14)" },
    certs:  { a: "#050912", b: "#0A0F22", glow: "rgba(124,140,255,.12)" },
    contact:{ a: "#050812", b: "#090F22", glow: "rgba(255,255,255,.10)" }
  };

  const sections = Array.from(document.querySelectorAll("[data-theme]"));
  if (!sections.length) return;

  const lerp = (x, y, a) => x + (y - x) * a;

  const hexToRgb = (hex) => {
    const h = hex.replace("#", "").trim();
    const full = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
    const num = parseInt(full, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  const rgbToHex = ({ r, g, b }) => {
    const to = (n) => n.toString(16).padStart(2, "0");
    return `#${to(r)}${to(g)}${to(b)}`;
  };

  const mixHex = (h1, h2, t) => {
    const a = hexToRgb(h1), b = hexToRgb(h2);
    return rgbToHex({
      r: Math.round(lerp(a.r, b.r, t)),
      g: Math.round(lerp(a.g, b.g, t)),
      b: Math.round(lerp(a.b, b.b, t)),
    });
  };

  const getActive = () => {
    const vh = window.innerHeight || 800;
    const mid = vh * 0.45;

    let best = { el: sections[0], dist: Infinity };
    for (const el of sections) {
      const r = el.getBoundingClientRect();
      const dist = Math.abs((r.top + r.height * 0.35) - mid);
      if (dist < best.dist) best = { el, dist };
    }
    return best.el;
  };

  let lastKey = null;
  const applyTheme = () => {
    const el = getActive();
    const key = el.getAttribute("data-theme");
    if (!themes[key]) return;

    if (lastKey === key) return;
    lastKey = key;

    const root = document.documentElement;
    root.style.setProperty("--bgA", themes[key].a);
    root.style.setProperty("--bgB", themes[key].b);
    // glow is handled via body::before, we just mod opacity for richness
    document.body.style.setProperty("--glow", themes[key].glow);
  };

  // Slightly smoother transitions
  document.documentElement.style.transition = "background 600ms ease";
  document.body.style.transition = "background 600ms ease";

  // Update on scroll/resize
  applyTheme();
  window.addEventListener("scroll", applyTheme, { passive: true });
  window.addEventListener("resize", applyTheme);

})();
