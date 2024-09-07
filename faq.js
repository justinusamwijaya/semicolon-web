const faqList = [
  {
    Q: "What services do we offer?",
    A: "We provide a wide range of technology consulting services, including IT strategy development, software and application development, cybersecurity, cloud migration, system integration, AI integration, and technical support. We tailor our solutions to meet your unique business needs.",
  },
  {
    Q: "How does the process work?",
    A: "Our process begins with an initial consultation to understand your business challenges and objectives. We then perform an in-depth analysis, offer strategic recommendations, and help implement tailored solutions that align with your goals. You can book our schedule <a target='_blank' href='https://calendly.com/inquiries-semicolon/30min'>here</a>",
  },
  {
    Q: "Can we integrate your software with existing systems?",
    A: "Yes, the custom tailored software we make is intended to be able to integrate with the system that is existing within your system. It is our commitment to be able to answer the clients' needs through our works.",
  },
  {
    Q: "What development methodologies do we use?",
    A: "We use Agile methodology, with regular reviews and adjustments to ensure our system development continuously meets our client's evolving needs.",
  },
  {
    Q: "What industries do we specialize in?",
    A: "We serve a variety of industries including SMEs, finance, healthcare, retail, manufacturing, education, and more. Our team has experience in addressing the specific technology challenges and opportunities unique to each sector.",
  },
  {
    Q: "How do we ensure the security of your data?",
    A: "We take data security very seriously and implement industry-standard security measures to protect your information. This includes encryption, multi-factor authentication, regular audits, and strict data access protocols.",
  },
  {
    Q: "Do we offer support after implementation?",
    A: "Yes, we offer post-implementation support to ensure everything runs smoothly. This includes ongoing maintenance, troubleshooting, and optimization to adapt to evolving business needs, in a specific certain time range based on our agreement.",
  },
  {
    Q: "How do we charge for our services?",
    A: "We offer flexible pricing models depending on the project scope and client requirements. During the initial consultation, we will provide a clear breakdown of the costs involved and it would be stated on our service agreement.",
  },
  {
    Q: "How long does a typical project take?",
    A: "The project timeline varies based on the complexity and scope of the work. After an initial assessment, we provide a detailed timeline for each phase of the project, keeping you updated throughout the process.",
  },
  {
    Q: "What makes Semicolon Tech different from other tech consultants?",
    A: "Our approach is highly personalized, and we focus on building long-term relationships with our clients. We prioritize transparency, trust, and results-driven strategies, ensuring that we deliver solutions that truly meet your business needs that are aligned with our core visions; Integrity, Trust, Innovation and Commitment.",
  },
];

// Function to create a single FAQ item
function createFAQItem(faq) {
  const item = document.createElement("div");
  item.className = "faq-item";

  const headerContainer = document.createElement("div");
  headerContainer.className = "faq-header";

  const question = document.createElement("h3");
  question.textContent = faq.Q;

  const collapseButton = document.createElement("button");
  collapseButton.className = "collapse-button collapsed";
  collapseButton.setAttribute("aria-label", "Toggle answer");

  headerContainer.appendChild(question);
  headerContainer.appendChild(collapseButton);

  item.appendChild(headerContainer);

  const answer = document.createElement("p");
  answer.className = "faq-answer";
  answer.innerHTML = faq.A;
  item.appendChild(answer);

  // Add click event to toggle collapse
  headerContainer.addEventListener("click", () => {
    answer.classList.toggle("expanded");
    collapseButton.classList.toggle("collapsed");
    collapseButton.setAttribute(
      "aria-expanded",
      answer.classList.contains("expanded")
    );
  });

  return item;
}

// Function to render all FAQ items
function renderFAQs() {
  const faqWrapper = document.querySelector(".faq-wrapper");
  if (!faqWrapper) return;

  faqList.forEach((faq) => {
    const faqItem = createFAQItem(faq);
    faqWrapper.appendChild(faqItem);
  });
}

// Function to filter FAQ items based on search query
function filterFAQs(query) {
  const faqItems = document.querySelectorAll(".faq-item");
  query = query.toLowerCase();

  faqItems.forEach((item) => {
    const question = item.querySelector("h3").textContent.toLowerCase();
    const answer = item.querySelector("p").textContent.toLowerCase();

    if (question.includes(query) || answer.includes(query)) {
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
    }
  });
}

// Function to set up search functionality
function setupSearch() {
  const searchInput = document.getElementById("faq-search");
  const searchButton = document.getElementById("search-button");

  searchInput.addEventListener("input", () => {
    filterFAQs(searchInput.value);
  });

  searchButton.addEventListener("click", () => {
    filterFAQs(searchInput.value);
  });

  // Add keypress event listener for the Enter key
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      filterFAQs(searchInput.value);
    }
  });
}

// Modify the existing renderFAQs function
function renderFAQs() {
  const faqWrapper = document.querySelector(".faq-wrapper");
  if (!faqWrapper) return;

  faqList.forEach((faq) => {
    const faqItem = createFAQItem(faq);
    faqWrapper.appendChild(faqItem);
  });

  setupSearch(); // Call the setupSearch function after rendering FAQs
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", renderFAQs);
