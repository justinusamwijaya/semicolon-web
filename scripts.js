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
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
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
