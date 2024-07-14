document.addEventListener("DOMContentLoaded", function () {
  // Scroll to top immediately
  window.scrollTo(0, 0);

  // Prevent scroll during initial animation
  document.body.style.overflow = "hidden";

  // Set a timeout to allow scrolling after animation
  setTimeout(function () {
    document.body.style.overflow = "";
    // Scroll to top again after a slight delay
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 50);
  }, 10); // Adjusted to match the total animation time
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
