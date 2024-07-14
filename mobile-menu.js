document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.createElement("button");
  mobileMenuButton.id = "mobile-menu-button";
  mobileMenuButton.innerHTML = "☰";

  const navbar = document.querySelector("#navbar .container");
  navbar.appendChild(mobileMenuButton);

  const mobileMenu = document.createElement("div");
  mobileMenu.id = "mobile-menu";

  const menuItems = document.querySelectorAll("#menu-navbar .menu");
  menuItems.forEach((item) => {
    const clone = item.cloneNode(true);
    mobileMenu.appendChild(clone);
  });

  navbar.after(mobileMenu);

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.style.display =
      mobileMenu.style.display === "block" ? "none" : "block";
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !mobileMenu.contains(event.target) &&
      event.target !== mobileMenuButton
    ) {
      mobileMenu.style.display = "none";
    }
  });

  // Close mobile menu when resizing to larger screen
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      mobileMenu.style.display = "none";
    }
  });
});
