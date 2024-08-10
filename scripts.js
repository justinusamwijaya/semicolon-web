// Utility function to check if an element is in viewport
function isElementInViewport(el, percentVisible = 30) {
  if (!el) return false;
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
  if (!navbar) return;

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
    if (currentSection.id === "what-we-do-section") {
      let serviceCards = document.querySelectorAll(".service-card");
      let seconds = 10;
      serviceCards.forEach((el) => {
        setTimeout(() => {
          el.className = "service-card scrolled";
        }, seconds);
        seconds += 100;
      });
      const serviceList = document.getElementById("service-list");
      if (serviceList) serviceList.className = "scrolled";
    }
    if (currentSection.id === "how-we-do-it-section") {
      const explanationCard = document.getElementById("explanation-card");
      const mobileCarousel = document.getElementById("mobile-carousel");
      if (explanationCard) explanationCard.className = "scrolled";
      if (mobileCarousel) mobileCarousel.className = "scrolled";
    }
  }
}

// How We Do It section step rotation
let currentStepIndex = 0;
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
    title: "Review",
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
  updateStep((currentStepIndex + 1) % stepInfo.length);
}

function updateStep(index) {
  const steps = document.querySelectorAll("#steps li");
  if (steps.length === 0) return;

  steps[currentStepIndex].classList.remove("selected");
  currentStepIndex = index;
  steps[currentStepIndex].classList.add("selected");
  updateExplanationCard(currentStepIndex);
}

function updateExplanationCard(index) {
  const explanationCard = document.getElementById("explanation-card");
  const explanationImg = document.getElementById("explanation-img");
  const explanationTitle = document.getElementById("explanation-title");
  const explanationText = document.getElementById("explanation-text");

  if (
    !explanationCard ||
    !explanationImg ||
    !explanationTitle ||
    !explanationText
  )
    return;

  explanationCard.style.opacity = 0;
  explanationImg.style.backgroundImage = `url('${stepInfo[index].image}')`;
  explanationTitle.textContent = stepInfo[index].title;
  explanationText.textContent = stepInfo[index].text;
  explanationCard.style.opacity = 1;
}

// Mobile carousel functionality
let currentIndex = 0;
let carouselInterval;

function initMobileCarousel() {
  const mobileCarousel = document.getElementById("mobile-carousel");
  if (!mobileCarousel) return;

  const carouselItems = mobileCarousel.querySelector(".carousel-items");
  const carouselDots = mobileCarousel.querySelector(".carousel-dots");

  if (!carouselItems || !carouselDots) return;

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
    dot.addEventListener("click", () => {
      goToSlide(index);
      stopCarouselRotation();
      startCarouselRotation();
    });
    carouselDots.appendChild(dot);
  });

  updateCarousel();
  setupTouchListeners();
  startCarouselRotation();
}

function updateCarousel() {
  const carouselItems = document.querySelector(
    "#mobile-carousel .carousel-items"
  );
  if (!carouselItems) return;

  carouselItems.style.transform = `translateX(-${currentIndex * 100}%)`;
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function startCarouselRotation(seconds = 5000) {
  carouselInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % stepInfo.length;
    updateCarousel();
  }, seconds);
}

function stopCarouselRotation() {
  clearInterval(carouselInterval);
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
  stopCarouselRotation();
  startCarouselRotation(10000);
}

function setupTouchListeners() {
  const carouselItems = document.querySelector(
    "#mobile-carousel .carousel-items"
  );
  if (!carouselItems) return;

  let startX, moveX;

  carouselItems.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopCarouselRotation();
  });

  carouselItems.addEventListener("touchmove", (e) => {
    moveX = e.touches[0].clientX;
    const diff = startX - moveX;
    if (Math.abs(diff) > 5) {
      e.preventDefault();
    }
  });

  carouselItems.addEventListener("touchend", () => {
    const diff = startX - moveX;
    if (diff > 50 && currentIndex < stepInfo.length - 1) {
      goToSlide(currentIndex + 1);
    } else if (diff < -50 && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      startCarouselRotation(10000);
    }
  });
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerMenuIcon = document.querySelector("#nav-burger-menu img");

  if (!mobileMenu || !burgerMenuIcon) return;

  mobileMenu.classList.toggle("opened");

  if (mobileMenu.classList.contains("opened")) {
    burgerMenuIcon.src = "./assets/X.svg";
  } else {
    burgerMenuIcon.src = "./assets/list.svg";
  }
}

// Event listeners and initialization
document.addEventListener("DOMContentLoaded", function () {
  // Common functionality for all pages
  window.addEventListener("scroll", updateNavbar);

  const navBurgerMenu = document.getElementById("nav-burger-menu");
  if (navBurgerMenu) {
    navBurgerMenu.addEventListener("click", toggleMobileMenu);
  }

  // Homepage specific functionality
  const stepsContainer = document.getElementById("steps");
  if (stepsContainer) {
    const steps = stepsContainer.querySelectorAll("li");
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

    // Initialize steps rotation
    steps[0].classList.add("selected");
    updateExplanationCard(0);
    startRotation();
  }

  // Initialize mobile carousel if on mobile
  if (window.innerWidth <= 570) {
    initMobileCarousel();
  }

  // Handle window resize for mobile carousel
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 570) {
      const carouselItems = document.querySelector(
        "#mobile-carousel .carousel-items"
      );
      if (carouselItems && carouselItems.children.length === 0) {
        initMobileCarousel();
      } else {
        updateCarousel();
        stopCarouselRotation();
        startCarouselRotation();
      }
    } else {
      stopCarouselRotation();
    }
  });
});

function addEnhancedLoadingScreen() {
  // Create loading overlay
  const overlay = document.createElement("div");
  overlay.id = "loading-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "9999";
  overlay.style.opacity = "1";
  overlay.style.transition = "opacity 0.5s ease-out";

  // Create loading spinner
  const spinner = document.createElement("div");
  spinner.style.border = "5px solid #f3f3f3";
  spinner.style.borderTop = "5px solid #3498db";
  spinner.style.borderRadius = "50%";
  spinner.style.width = "50px";
  spinner.style.height = "50px";
  spinner.style.animation = "spin 1s linear infinite";
  spinner.style.marginBottom = "20px";

  // Create progress bar container
  const progressContainer = document.createElement("div");
  progressContainer.style.width = "200px";
  progressContainer.style.height = "20px";
  progressContainer.style.backgroundColor = "#f3f3f3";
  progressContainer.style.borderRadius = "10px";
  progressContainer.style.overflow = "hidden";

  // Create progress bar
  const progressBar = document.createElement("div");
  progressBar.style.width = "0%";
  progressBar.style.height = "100%";
  progressBar.style.backgroundColor = "#3498db";
  progressBar.style.transition = "width 0.3s ease-out";

  progressContainer.appendChild(progressBar);

  // Create progress text
  const progressText = document.createElement("div");
  progressText.style.marginTop = "10px";
  progressText.textContent = "0%";

  // Add keyframes for spinner animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  overlay.appendChild(spinner);
  overlay.appendChild(progressContainer);
  overlay.appendChild(progressText);
  document.body.appendChild(overlay);

  // Function to get all elements with background images
  function getElementsWithBackgroundImages() {
    const elements = [];
    const allElements = document.getElementsByTagName("*");
    for (let i = 0; i < allElements.length; i++) {
      const computedStyle = window.getComputedStyle(allElements[i]);
      const backgroundImage =
        computedStyle.getPropertyValue("background-image");
      if (backgroundImage !== "none") {
        elements.push(allElements[i]);
      }
    }
    return elements;
  }

  // Function to preload an image
  function preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = url;
    });
  }

  // Function to update progress
  function updateProgress(loaded, total) {
    const progress = Math.round((loaded / total) * 100);
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
  }

  // Function to get all images, including those in the how-we-do-it section
  function getAllImages() {
    const images = [...document.images];
    const backgroundImageElements = getElementsWithBackgroundImages();

    // Add images from the how-we-do-it section
    const howWeDoItSection = document.getElementById("how-we-do-it-section");
    if (howWeDoItSection) {
      const sectionBackgroundImages =
        getElementsWithBackgroundImages(howWeDoItSection);
      backgroundImageElements.push(...sectionBackgroundImages);
    }

    return { images, backgroundImageElements };
  }

  // Get all images and background images
  const { images, backgroundImageElements } = getAllImages();

  // Create an array of promises for all images to load
  const imagePromises = [
    ...images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve; // Resolve on error to prevent the overlay from getting stuck
      });
    }),
    ...backgroundImageElements.map((el) => {
      const url = window
        .getComputedStyle(el)
        .getPropertyValue("background-image")
        .replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
      return preloadImage(url);
    }),
  ];

  const totalImages = imagePromises.length;
  let loadedImages = 0;

  // Wait for all images to load
  Promise.all(
    imagePromises.map((p) =>
      p.then(() => {
        loadedImages++;
        updateProgress(loadedImages, totalImages);
      })
    )
  )
    .then(() => {
      // All images are loaded, fade out the overlay
      overlay.style.opacity = "0";
      // Remove the overlay after the transition is complete
      setTimeout(() => {
        overlay.style.display = "none";
      }, 500); // This should match the transition duration
    })
    .catch((error) => {
      console.error("Error loading images:", error);
      // Fade out and remove the overlay even if there's an error
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
      }, 500);
    });
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", addEnhancedLoadingScreen);
