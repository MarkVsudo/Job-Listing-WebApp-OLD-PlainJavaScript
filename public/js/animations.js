// GSAP Animations

gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.from(
  ["#categories h2", "#categories h4", ".categories-block", ".btn-categories"],
  {
    y: -50,
    opacity: 0,
    stagger: 0.3,
    duration: 1,
    scrollTrigger: {
      trigger: "#categories",
      start: "top-=200px center",
    },
  }
);

gsap.from(".process-sub", {
  x: 100,
  opacity: 0,
  stagger: 0.3,
  duration: 0.5,
  scrollTrigger: {
    trigger: "#process",
    start: "top-=200px center",
  },
});

gsap.from(
  [
    "#learnFromExperts h2",
    "#learnFromExperts h4",
    ".experts-main-img",
    ".experts-tutorial",
  ],
  {
    y: -50,
    opacity: 0,
    stagger: 0.3,
    duration: 1,
    scrollTrigger: {
      trigger: "#learnFromExperts",
      start: "top-=200px center",
    },
  }
);

gsap.from(["#mission h2", ".mission-block"], {
  y: -50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#mission",
    start: "top-=200px center",
  },
});

gsap.from("#mission .mission-text", {
  x: -50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#mission",
    start: "top center",
  },
});

gsap.from("#mission .mission-img", {
  x: 50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#mission",
    start: "top center",
  },
});

gsap.from(".vocation-block", {
  y: -50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#vocation",
    start: "top-=200px center",
  },
});

gsap.from("#vocation .vocation-text", {
  x: -50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#vocation",
    start: "top center",
  },
});

gsap.from("#vocation img", {
  x: 50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: "#vocation",
    start: "top center",
  },
});

gsap.to(".first-stat", {
  text: {
    value: 7856,
    speed: 0.2,
    stagger: 0.2,
  },
  ease: "linear",
  roundProps: { innerHTML: 1 },
});

gsap.to(".second-stat", {
  text: {
    value: 2004,
    speed: 0.2,
    stagger: 0.2,
  },
  ease: "linear",
  roundProps: { innerHTML: 1 },
});

gsap.to([".home-ellipse-bg", ".ellipse-categories-bg"], {
  y: 20,
  duration: 1.5,
  ease: "power1.inOut",
  yoyo: true,
  repeat: -1,
});

// Back to top button functionality

const backTopBtn = document.querySelector(".back-top-btn");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 75) {
    backTopBtn.classList.add("active");
  } else {
    backTopBtn.classList.remove("active");
  }
});

// Enabling tooltips in bootstrap

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
