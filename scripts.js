function isElementInViewport(el, percentVisible = 30) {
  let rect = el.getBoundingClientRect();
  let windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return (
    rect.top <= windowHeight * (1 - percentVisible / 100) &&
    rect.bottom >= windowHeight * (percentVisible / 100)
  );
}

// Navbar animation
function updateNavbar() {
  const navbar = document.getElementById("navbar");
  const navSections = document.querySelectorAll(".transparent-nav, .black-nav");
  let currentSection = null;

  if (document.body.scrollTop == 0) {
    navbar.className = "transparent-nav";
  } else {
    navbar.className = "black-nav";
  }

  navSections.forEach((section) => {
    if (isElementInViewport(section)) {
      currentSection = section;
    }
  });

  if (currentSection) {
    // console.log({ currentSection: currentSection.id });
    if (currentSection.id === "what-we-do-section") {
      let serviceCards = document.querySelectorAll(".service-card");
      // console.log({ serviceCards });
      let seconds = 10;
      serviceCards.forEach((el) => {
        setTimeout(() => {
          el.className = "service-card scrolled";
        }, seconds);
        seconds += 100;
      });
      document.getElementById("service-list").className = "scrolled";
    }
    if (currentSection.id === "how-we-do-it-section") {
      document.getElementById("explanation-card").className = "scrolled";
      document.getElementById("mobile-carousel").className = "scrolled";
    }
    // if (currentSection.classList.contains("transparent-nav")) {
    //   navbar.className = "transparent-nav";
    // } else if (currentSection.classList.contains("black-nav")) {
    //   navbar.className = "black-nav";
    // }
  }
}

// How We Do It section step rotation
let currentStepIndex = 0;
const steps = document.querySelectorAll("#steps li");
const explanationCard = document.getElementById("explanation-card");
const explanationImg = document.getElementById("explanation-img");
const explanationTitle = document.getElementById("explanation-title");
const explanationText = document.getElementById("explanation-text");

const stepInfo = [
  {
    title: "Planning",
    text: "We identify and understand your business objectives, scope and requirements before creating a project plan.",
    image: "./assets/home-step-planning.png",
  },
  {
    title: "Execution",
    text: "Our team of experts implements the project plan, developing your solution with precision and care.",
    image: "./assets/home-step-execution.png",
  },
  {
    title: "Polishing and Testing",
    text: "We rigorously test and refine the solution to ensure it meets the highest standards of quality and performance.",
    image: "./assets/home-step-review.png",
  },
  {
    title: "Handover",
    text: "We deliver the finished product, providing thorough documentation and support to ensure a smooth transition.",
    image: "./assets/home-step-handover.png",
  },
];

let rotationInterval;
let rotationTimeout;

function startRotation() {
  rotationInterval = setInterval(rotateSteps, 5000);
}

function rotateSteps() {
  updateStep((currentStepIndex + 1) % steps.length);
}

function updateStep(index) {
  steps[currentStepIndex].classList.remove("selected");
  currentStepIndex = index;
  steps[currentStepIndex].classList.add("selected");
  updateExplanationCard(currentStepIndex);
}

function updateExplanationCard(index) {
  explanationCard.style.opacity = 0;
  // setTimeout(() => {
  explanationImg.style.backgroundImage = `url('${stepInfo[index].image}')`;
  explanationTitle.textContent = stepInfo[index].title;
  explanationText.textContent = stepInfo[index].text;
  explanationCard.style.opacity = 1;
  // }, 500);
}

// Event listeners
window.addEventListener("scroll", updateNavbar);

// Step interaction
steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    clearInterval(rotationInterval);
    clearTimeout(rotationTimeout);

    updateStep(index);

    rotationTimeout = setTimeout(() => {
      startRotation();
    }, 10000);
  });
});

// Initial setup
updateNavbar();
steps[0].classList.add("selected");
updateExplanationCard(0);
startRotation();

const mobileCarousel = document.getElementById("mobile-carousel");
const carouselItems = mobileCarousel.querySelector(".carousel-items");
const carouselDots = mobileCarousel.querySelector(".carousel-dots");
let currentIndex = 0;
let startX, moveX;

function initMobileCarousel() {
  // Create carousel items
  stepInfo.forEach((step, index) => {
    const item = document.createElement("div");
    item.className = "carousel-item";
    item.innerHTML = `
      <div id="explanation-img" style="background-image: url('${step.image}')"></div>
      <h2>${step.title}</h2>
      <p>${step.text}</p>
    `;
    carouselItems.appendChild(item);

    // Create dot
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.addEventListener("click", () => goToSlide(index));
    carouselDots.appendChild(dot);
  });

  updateCarousel();
  setupTouchListeners();
}

function updateCarousel() {
  carouselItems.style.transform = `translateX(-${currentIndex * 100}%)`;
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function setupTouchListeners() {
  carouselItems.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carouselItems.addEventListener("touchmove", (e) => {
    moveX = e.touches[0].clientX;
    const diff = startX - moveX;
    if (Math.abs(diff) > 5) {
      // Prevent small unintentional movements
      e.preventDefault(); // Prevent scrolling
    }
  });

  carouselItems.addEventListener("touchend", () => {
    const diff = startX - moveX;
    if (diff > 50 && currentIndex < stepInfo.length - 1) {
      // Swipe left
      goToSlide(currentIndex + 1);
    } else if (diff < -50 && currentIndex > 0) {
      // Swipe right
      goToSlide(currentIndex - 1);
    }
  });
}

// Initialize mobile carousel
if (window.innerWidth <= 570) {
  initMobileCarousel();
}

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth <= 570) {
    if (carouselItems.children.length === 0) {
      initMobileCarousel();
    }
  }
});

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerMenuIcon = document.querySelector("#nav-burger-menu img");

  mobileMenu.classList.toggle("opened");

  if (mobileMenu.classList.contains("opened")) {
    burgerMenuIcon.src = "./assets/X.svg";
  } else {
    burgerMenuIcon.src = "./assets/list.svg";
  }
}

// The event listener remains the same
document.addEventListener("DOMContentLoaded", function () {
  const navBurgerMenu = document.getElementById("nav-burger-menu");
  navBurgerMenu.addEventListener("click", toggleMobileMenu);
});
