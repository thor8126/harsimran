document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Active navigation link highlighting
  const currentLocation = window.location.pathname.split("/").pop();
  const navLinksAnchors = document.querySelectorAll(".nav-links a");

  navLinksAnchors.forEach((link) => {
    const linkPath = link.getAttribute("href");
    // Handle index.html as the root
    if (
      (currentLocation === "" || currentLocation === "index.html") &&
      linkPath === "index.html"
    ) {
      link.classList.add("active");
    } else if (linkPath === currentLocation) {
      link.classList.add("active");
    }
  });

  // Contact Form Validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    const validateField = (field, errorEl, minLength, message) => {
      const value = field.value.trim();
      const errorElement = document.getElementById(errorEl);
      if (value === "") {
        errorElement.textContent = `${message} is required.`;
        field.classList.add("invalid");
        return false;
      } else if (value.length < minLength) {
        errorElement.textContent = `${message} must be at least ${minLength} characters.`;
        field.classList.add("invalid");
        return false;
      } else {
        errorElement.textContent = "";
        field.classList.remove("invalid");
        return true;
      }
    };

    const validateEmailField = () => {
      const emailValue = emailInput.value.trim();
      const emailError = document.getElementById("emailError");
      if (emailValue === "") {
        emailError.textContent = "Email is required.";
        emailInput.classList.add("invalid");
        return false;
      } else if (!validateEmail(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
        emailInput.classList.add("invalid");
        return false;
      } else {
        emailError.textContent = "";
        emailInput.classList.remove("invalid");
        return true;
      }
    };

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const isNameValid = validateField(nameInput, "nameError", 2, "Name");
      const isEmailValid = validateEmailField();
      const isMessageValid = validateField(
        messageInput,
        "messageError",
        10,
        "Message"
      );

      if (isNameValid && isEmailValid && isMessageValid) {
        const successMessage = document.getElementById("successMessage");
        successMessage.classList.add("show");
        contactForm.reset();

        setTimeout(() => {
          successMessage.classList.remove("show");
        }, 5000);
      }
    });

    // Real-time validation on blur
    nameInput.addEventListener("blur", () =>
      validateField(nameInput, "nameError", 2, "Name")
    );
    emailInput.addEventListener("blur", validateEmailField);
    messageInput.addEventListener("blur", () =>
      validateField(messageInput, "messageError", 10, "Message")
    );
  }

  // Animate progress bars on skills page when visible
  const skillsPage = document.getElementById("skills");
  if (skillsPage) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progressFills =
              entry.target.querySelectorAll(".progress-fill");
            progressFills.forEach((fill) => {
              const width = fill.getAttribute("data-width");
              fill.style.width = width;
            });
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      { threshold: 0.5 }
    ); // Trigger when 50% of the element is visible

    observer.observe(skillsPage);
  }
});
