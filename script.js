document.addEventListener("DOMContentLoaded", function () {
  let sidebarHTML = document.querySelector(".sidebar")?.outerHTML; // Store sidebar HTML
  let navbarHTML = document.querySelector(".navbar")?.outerHTML; // Store navbar HTML

  function toggleNavigation() {
      let sidebar = document.querySelector(".sidebar");
      let navbar = document.querySelector(".navbar");

      if (window.innerWidth >= 992) {
          // Remove navbar if it exists
          if (navbar) navbar.remove();

          // Append sidebar if missing
          if (!document.querySelector(".sidebar") && sidebarHTML) {
              document.body.insertAdjacentHTML("afterbegin", sidebarHTML);
              restoreSettings(); // Restore settings when sidebar is added
          }
      } else {
          // Remove sidebar if it exists
          if (sidebar) sidebar.remove();

          // Append navbar if missing
          if (!document.querySelector(".navbar") && navbarHTML) {
              document.body.insertAdjacentHTML("afterbegin", navbarHTML);
              restoreSettings(); // Restore settings when navbar is added
          }
      }
  }

  // Restore language settings and date after switching layout
  function restoreSettings() {
      restoreLanguageSettings();
      updateCurrentDate();
      setActiveFromHash();
      updateActiveOnScroll(); // Ensure correct active state on load
  }

  // Update the current date based on the selected language
  function updateCurrentDate() {
      const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
      formatDate(savedLanguage);
  }

  // Format date based on the selected language
  function formatDate(lang) {
      let today = new Date();
      let day = today.getDate();
      let year = today.getFullYear();

      let months = {
          en: [
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
          ],
          pt: [
              "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
              "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
          ]
      };

      let month = months[lang][today.getMonth()];
      let formattedDate = lang === "pt"
          ? `${day} de ${month}, ${year}` // Example: "4 de Março, 2025"
          : `${month} ${day}, ${year}`; // Example: "March 4, 2025"

      let dateElement = document.querySelector("#current-date");
      if (dateElement) {
          dateElement.textContent = formattedDate;
      }
  }

  // Switch language dynamically
  function switchLanguage(lang) {
      document.querySelectorAll("[data-en]").forEach(el => {
          el.textContent = el.getAttribute(`data-${lang}`);
      });

      formatDate(lang);
      localStorage.setItem("selectedLanguage", lang);
  }

  // Restore language settings
  function restoreLanguageSettings() {
      const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
      const radioInput = document.querySelector(`.radio input[value="${savedLanguage}"]`);
      if (radioInput) {
          radioInput.checked = true;
      }
      switchLanguage(savedLanguage);
  }

  // Ensure one navigation item is always active
  function setActiveFromHash() {
      let hash = window.location.hash || "#home";
      let link = document.querySelector(`.nav-link[href="${hash}"]`);

      if (!link) {
          link = document.querySelector('.nav-link[href="#home"]'); // Default to Home
      }

      document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
      if (link) {
          link.parentElement.classList.add("active");
      }
  }

  // Update the active navigation item based on scroll
  function updateActiveOnScroll() {
      let scrollPos = window.scrollY;
      let newActiveLink = null;

      document.querySelectorAll(".nav-link").forEach(link => {
          let sectionId = link.getAttribute("href");
          let sectionEl = document.querySelector(sectionId);

          if (sectionEl) {
              let sectionOffset = sectionEl.offsetTop - 70;
              let sectionHeight = sectionEl.offsetHeight;

              if (scrollPos >= sectionOffset && scrollPos < (sectionOffset + sectionHeight)) {
                  newActiveLink = link;
              }
          }
      });

      document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
      if (newActiveLink) {
          newActiveLink.parentElement.classList.add("active");
      } else {
          document.querySelector('.nav-link[href="#home"]').parentElement.classList.add("active");
      }
  }

  // Run functions on page load
  toggleNavigation();
  restoreSettings();

  // Run functions when resizing the window
  window.addEventListener("resize", function () {
      toggleNavigation();
      restoreSettings();
  });

  // Ensure clicking a nav-item sets it as active
  document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", function () {
          document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
          this.parentElement.classList.add("active");
      });
  });

  // Event listener for language switching
  document.addEventListener("change", function (event) {
      if (event.target.name === "radio") {
          switchLanguage(event.target.value);
      }
  });

  // Run scroll update on page load and when scrolling
  updateActiveOnScroll();
  window.addEventListener("scroll", updateActiveOnScroll);
});

document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.querySelector(".custom-toggler");
    const navbar = document.querySelector("#navbarNavAltMarkup");
    let bsNavbar = new bootstrap.Collapse(navbar, { toggle: false });

    // Handle toggler click
    toggler.addEventListener("click", function () {
        if (navbar.classList.contains("show")) {
            bsNavbar.hide(); // Manually close navbar
        } else {
            bsNavbar.show(); // Manually open navbar
        }
    });

    // Ensure icon updates when navbar starts opening
    navbar.addEventListener("show.bs.collapse", function () {
        toggler.classList.add("open");
    });

    // Ensure icon updates when navbar starts closing
    navbar.addEventListener("hide.bs.collapse", function () {
        toggler.classList.remove("open");
    });

    // Close navbar when clicking outside
    document.addEventListener("click", function (event) {
        let isNavbarOpen = navbar.classList.contains("show");
        let isClickInside = navbar.contains(event.target) || toggler.contains(event.target);

        if (isNavbarOpen && !isClickInside) {
            bsNavbar.hide(); // Force Bootstrap to close navbar
            toggler.classList.remove("open"); // Ensure icon resets
        }
    });
});
