document.addEventListener("DOMContentLoaded", function () { 
    let sidebarHTML = document.querySelector(".sidebar")?.outerHTML; // Store sidebar HTML
    let navbarHTML = document.querySelector(".navbar")?.outerHTML; // Store navbar HTML

    function toggleNavigation() {
        let sidebar = document.querySelector(".sidebar");
        let navbar = document.querySelector(".navbar");

        if (window.innerWidth >= 992) {
            if (navbar) navbar.remove(); // Remove navbar if it exists
            if (!document.querySelector(".sidebar")) { // Append sidebar if missing
                document.body.insertAdjacentHTML("afterbegin", sidebarHTML);
                restoreSettings();
            }
        } else {
            if (sidebar) sidebar.remove(); // Remove sidebar if it exists
            if (!document.querySelector(".navbar")) { // Append navbar if missing
                document.body.insertAdjacentHTML("afterbegin", navbarHTML);
                restoreSettings();
                setupNavbarToggler(); // Ensure toggler works when navbar is reinserted
            }
        }
    }

    // Restore language settings, active section, and date
    function restoreSettings() {
        restoreLanguageSettings();
        updateCurrentDate();
        setActiveFromHash();
        updateActiveOnScroll();
    }

    // Ensure proper navbar toggler functionality when re-adding navbar
    function setupNavbarToggler() {
        const toggler = document.querySelector(".custom-toggler");
        const navbar = document.querySelector("#navbarNavAltMarkup");
        if (!toggler || !navbar) return;

        let bsNavbar = new bootstrap.Collapse(navbar, { toggle: false });

        // Handle toggler click
        toggler.addEventListener("click", function () {
            if (navbar.classList.contains("show")) {
                bsNavbar.hide();
            } else {
                bsNavbar.show();
            }
        });

        // Update icon on navbar open
        navbar.addEventListener("show.bs.collapse", function () {
            toggler.classList.add("open");
        });

        // Update icon on navbar close
        navbar.addEventListener("hide.bs.collapse", function () {
            toggler.classList.remove("open");
        });

        // Close navbar when clicking outside
        document.addEventListener("click", function (event) {
            let isNavbarOpen = navbar.classList.contains("show");
            let isClickInside = navbar.contains(event.target) || toggler.contains(event.target);

            if (isNavbarOpen && !isClickInside) {
                bsNavbar.hide();
                toggler.classList.remove("open");
            }
        });

        // Close navbar when clicking toggler (if it's already open)
        toggler.addEventListener("click", function () {
            if (navbar.classList.contains("show")) {
                bsNavbar.hide();
                toggler.classList.remove("open");
            }
        });
    }

    // Update date based on selected language
    function updateCurrentDate() {
        const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
        formatDate(savedLanguage);
    }

    // Format date correctly based on selected language
    function formatDate(lang) {
        let today = new Date();
        let day = today.getDate();
        let year = today.getFullYear();

        let months = {
            en: ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"],
            pt: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        };

        let month = months[lang][today.getMonth()];
        let formattedDate = lang === "pt"
            ? `${day} de ${month}, ${year}`
            : `${month} ${day}, ${year}`;

        let dateElement = document.querySelector("#current-date");
        if (dateElement) {
            dateElement.textContent = formattedDate;
        }
    }

    // Restore language settings from localStorage
    function restoreLanguageSettings() {
        const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
        const radioInput = document.querySelector(`.radio input[value="${savedLanguage}"]`);
        if (radioInput) {
            radioInput.checked = true;
        }
        switchLanguage(savedLanguage);
    }

    // Update text content dynamically based on language
    function switchLanguage(lang) {
        document.documentElement.lang = lang; // Update the <html> lang attribute
    
        // Update all elements with data-en and data-pt attributes
        document.querySelectorAll("[data-en]").forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    
        formatDate(lang);
        localStorage.setItem("selectedLanguage", lang);
    
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

    // Update active navigation based on scroll
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
    setupNavbarToggler();

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


// CLOSE CV DROPDOWN ON ITEM CLICK
document.addEventListener("DOMContentLoaded", function () {
    const cvDropdown = document.getElementById("cv-dropdown");
    const collapseInstance = new bootstrap.Collapse(cvDropdown, { toggle: false });

    // Fechar o dropdown ao clicar num item
    document.querySelectorAll(".cv-dropdown-item").forEach(item => {
        item.addEventListener("click", function () {
            collapseInstance.hide();
        });
    });

    // Fechar o dropdown ao clicar fora dele
    document.addEventListener("click", function (event) {
        const button = document.getElementById("btn-download-cv");
        
        // Se clicar fora do dropdown e do botão que o ativa, fecha-o
        if (!cvDropdown.contains(event.target) && !button.contains(event.target)) {
            collapseInstance.hide();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const showMoreBtn = document.getElementById("show-more-btn");
    const collapsedElement = document.getElementById("collapsed-certificates");

    function handleButtonClick() {
        if (!showMoreBtn) return;

        // Adicionar fade-out ao texto e ícone
        showMoreBtn.classList.add("button-fade");

        // Trocar o texto a meio da transição
        setTimeout(() => {
            showMoreBtn.classList.remove("button-fade"); // Remover fade-out para voltar a aparecer
        }, 200); // A meio da transição do collapse
    }

    // Ligar o evento ao botão
    if (showMoreBtn) {
        showMoreBtn.addEventListener("click", handleButtonClick);
    }
});
