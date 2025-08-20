// Toggle menu for mobile
function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Highlight active nav on scroll ----------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    const y = window.pageYOffset || document.documentElement.scrollTop;
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 80;
      if (y >= top) current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ---------- Section animations ----------
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.2 }
  );
  sections.forEach((s) => observer.observe(s));

  // ---------- Safe contact form handler ----------
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();
      if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
      }
      alert("Message sent successfully!");
      this.reset();
    });
  }

  // =================================================================
  // Mobile-only MENU CATEGORY SLIDESHOW
  // Keeps each category grid (Starters/Main/Drinks/Desserts) intact,
  // but shows them one at a time, auto-sliding every 2s.
  // =================================================================
  const deviceIsMobile = (() => {
    const ua = navigator.userAgent || "";
    const touch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
    const smallSide = Math.min(screen.width || 0, screen.height || 0);
    const looksLikePhone = smallSide && smallSide <= 820;
    return /Android|iPhone|iPad|iPod|Windows Phone|Mobi/i.test(ua) || (touch && looksLikePhone);
  })();

  const allCategories = document.querySelectorAll(".menu-section"); 
  // assumes each category (Starters, Main, Drinks, Desserts) is wrapped in `.menu-section`

  if (deviceIsMobile && allCategories.length > 1) {
    const wrapper = document.querySelector(".menu-wrapper");
    if (wrapper) {
      // Flex wrapper for sliding
      Object.assign(wrapper.style, {
        display: "flex",
        flexWrap: "nowrap",
        overflow: "hidden",
        transform: "translateX(0%)",
        transition: "transform 0.6s ease-in-out",
        willChange: "transform",
      });

      allCategories.forEach((cat) => {
        Object.assign(cat.style, {
          flex: "0 0 100%",
          maxWidth: "100%",
          margin: "0",
        });
      });

      let index = 0;
      let timerId = null;

      const goTo = (i) => {
        index = i % allCategories.length;
        wrapper.style.transform = `translateX(-${index * 100}%)`;
      };

      const next = () => goTo(index + 1);

      const start = () => {
        if (timerId) clearInterval(timerId);
        timerId = setInterval(next, 2000);
      };
      const stop = () => timerId && clearInterval(timerId);

      goTo(0);
      start();

      wrapper.addEventListener("touchstart", stop, { passive: true });
      wrapper.addEventListener("touchend", start, { passive: true });
    }
  }
});
