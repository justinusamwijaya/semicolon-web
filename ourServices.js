// Define the services data structure
const servicesData = [
  {
    title: "Website Development Services",
    content: [
      {
        icon: "Desktop",
        title: "Custom Website Design & Redesign",
        description:
          "Create a unique online presence or refresh your existing site to better align with your brand.",
      },
      {
        icon: "Devices",
        title: "Responsive Web Development",
        description:
          "Ensure your website looks and works flawlessly across desktops, tablets, and smartphones.",
      },
      {
        icon: "ShoppingBag",
        title: "E-Commerce Solution",
        description:
          "Build secure, user-friendly online stores that boost sales and enhance shopping experiences.",
      },
      {
        icon: "ImagesSquare",
        title: "Content Management System (CMS)",
        description:
          "Easily manage and update your website content with intuitive CMS platforms.",
      },
      {
        icon: "TextAa",
        title: "Search Engine Optimization (SEO)",
        description:
          "Improve search engine rankings and attract more traffic with targeted SEO strategies.",
      },
      {
        icon: "Wrench",
        title: "Website Maintenance & Support",
        description:
          "Keep your website running smoothly with regular updates, security checks, and expert support.",
      },
      {
        icon: "AppWindow",
        title: "Web-App Development",
        description:
          "Develop custom applications tailored to your business needs with advanced technology.",
      },
      {
        icon: "Palette",
        title: "UI/UX Design",
        description:
          "Design interfaces that are visually appealing and provide an intuitive user experience.",
      },
      {
        icon: "Gauge",
        title: "Performance Optimization",
        description:
          "Enhance your website's speed and efficiency for a better user experience and improved search rankings.",
      },
    ],
  },
  {
    title: "ERP Systems",
    content: [
      {
        icon: "Database",
        title: "Centralized Data Management",
        description:
          "Consolidate all business data into a single, accurate, and accessible database.",
      },
      {
        icon: "Coins",
        title: "Financial Management",
        description:
          "Automate accounting processes and gain real-time financial insights.",
      },
      {
        icon: "PersonSimpleCircle",
        title: "Human Resource Management",
        description:
          "Build secure, user-friendly online stores that boost sales and enhance shopping experiences.",
      },
      {
        icon: "TreasureChest",
        title: "Supply Chain & Inventory Management",
        description:
          "Optimize inventory levels, orders, and deliveries to boost efficiency and reduce costs.",
      },
      {
        icon: "People",
        title: "Customer Relationship Management (CRM)",
        description:
          "Manage customer interactions, sales pipelines, and support with integrated CRM tools.",
      },
      {
        icon: "Factory",
        title: "Manufacturing & Production",
        description:
          "Oversee production planning, scheduling, and quality control for timely delivery and high standards.",
      },
      {
        icon: "PresentationChart",
        title: "Analytics & Reporting",
        description:
          "Generate reports and dashboards for actionable insights and data-driven decision-making.",
      },
      {
        icon: "Folders",
        title: "Project Management",
        description:
          "Manage projects with tools for planning, execution, and monitoring, including timelines, resource allocation, and task management.",
      },
      {
        icon: "Scan",
        title: "Scalability & Customization",
        description:
          "Adapt and scale the ERP system to meet evolving business needs with customizable features.",
      },
      {
        icon: "IntersectSquare",
        title: "Integration Capabilities",
        description:
          "Seamlessly connect with other software systems to enhance functionality and ensure smooth data flow.",
      },
    ],
  },
  {
    title: "On Demand Services",
    content: [
      {
        icon: "Code",
        title: "Tailored Development",
        description:
          "Create software that addresses your unique business challenges and requirements.",
      },
      {
        icon: "ArrowsOut",
        title: "Scalability",
        description:
          "Build robust systems that adapt and grow with your business.",
      },
      {
        icon: "Graph",
        title: "Advanced Technologies",
        description:
          "Employ cutting-edge technology for high-performance solutions.",
      },
      {
        icon: "User",
        title: "User Centric Design",
        description: "Design intuitive and engaging user experiences.",
      },
      {
        icon: "CellSignalFull",
        title: "Full Lifecycle Support",
        description:
          "Offer comprehensive support from initial consultation through development, deployment, and maintenance.",
      },
    ],
  },
  {
    title: "Tech Consultation",
    content: [
      {
        icon: "Strategy",
        title: "Strategic Planning",
        description:
          "Develop technology roadmaps that align with your business goals and drive growth.",
      },
      {
        icon: "Scroll",
        title: "IT Assessment",
        description:
          "Evaluate your current IT environment to pinpoint areas for improvement and innovation.",
      },
      {
        icon: "TerminalWindow",
        title: "Technology Implementation",
        description:
          "Recommend and assist with adopting technologies to enhance efficiency and productivity.",
      },
      {
        icon: "ShieldPlus",
        title: "Cybersecurity Guidance",
        description:
          "Strengthen your cybersecurity posture with robust strategies and best practices.",
      },
      {
        icon: "Swap",
        title: "Digital Transformation",
        description:
          "Support your business in navigating digital transformation for long-term success.",
      },
    ],
  },
  // Add more service categories here if needed
];

// Function to create a service item
function createServiceItem(item) {
  const serviceItem = document.createElement("div");
  serviceItem.className = "service-item";

  const iconContainer = document.createElement("div");
  iconContainer.className = "icon-container";

  // Create img element for SVG icon
  const icon = document.createElement("img");
  icon.src = `./assets/${item.icon}.svg`;
  icon.alt = `${item.title} icon`;
  icon.className = "service-icon";

  iconContainer.appendChild(icon);

  const contentContainer = document.createElement("div");
  contentContainer.className = "content-container";

  const title = document.createElement("h3");
  title.textContent = item.title;

  const description = document.createElement("p");
  description.textContent = item.description;

  contentContainer.appendChild(title);
  contentContainer.appendChild(description);

  serviceItem.appendChild(iconContainer);
  serviceItem.appendChild(contentContainer);

  return serviceItem;
}

// Function to create a service section
function createServiceSection(service) {
  const section = document.createElement("section");
  section.className = "service-section";

  const title = document.createElement("h2");
  title.textContent = service.title;
  section.appendChild(title);

  const servicesGrid = document.createElement("div");
  servicesGrid.className = "services-grid";

  service.content.forEach((item) => {
    servicesGrid.appendChild(createServiceItem(item));
  });

  section.appendChild(servicesGrid);
  return section;
}

// Function to render all services
function renderServices() {
  const mainContent = document.querySelector("main");
  if (!mainContent) return;

  const ctaSection = mainContent.querySelector("#cta-section");
  if (!ctaSection) return;

  servicesData.forEach((service) => {
    const serviceSection = createServiceSection(service);
    mainContent.insertBefore(serviceSection, ctaSection);
  });
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", renderServices);
