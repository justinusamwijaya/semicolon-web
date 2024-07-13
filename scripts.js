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

  // Typing animation
  function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      document.getElementById("slogan").innerHTML =
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 50);
    } else if (typeof fnCallback == "function") {
      setTimeout(fnCallback, 50);
    }
  }

  // Start the typing animation after the initial fade-in
  setTimeout(function () {
    typeWriter("Driven by Innovation, Built on Trust", 0, function () {
      // Animation is complete
    });
  }, 1000); // Adjust this delay as needed to match your fade-in duration
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
