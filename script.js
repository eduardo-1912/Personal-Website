// SIDEBAR
$(document).ready(function() {
    const navLinks = $(".nav-link");
  
    // Set active based on URL hash (or default to #home)
    function setActiveFromHash() {
      let hash = window.location.hash || "#home"; 
      let link = $('.nav-link[href="' + hash + '"]');
      
      // If the hash doesn't match any link, fall back to #home
      if (!link.length) {
        link = $('.nav-link[href="#home"]');
      }
  
      $(".nav-item").removeClass("active");
      link.parent().addClass("active");
    }
  
    // Update active as user scrolls
    function updateActiveOnScroll() {
      let scrollPos = $(window).scrollTop();
      let newActiveLink = null;
  
      navLinks.each(function() {
        let sectionId = $(this).attr("href");
        let sectionEl = $(sectionId);
        
        // Only check existing sections
        if (sectionEl.length) {
          let sectionOffset = sectionEl.offset().top - 70;
          let sectionHeight = sectionEl.outerHeight();
          
          if (scrollPos >= sectionOffset && scrollPos < (sectionOffset + sectionHeight)) {
            newActiveLink = $(this);
          }
        }
      });
  
      // Set the matching link active, or default to home
      $(".nav-item").removeClass("active");
      if (newActiveLink) {
        newActiveLink.parent().addClass("active");
      } else {
        $('.nav-link[href="#home"]').parent().addClass("active");
      }
    }
  

  
    // Initial setup
    setActiveFromHash();
    $(window).on("scroll", updateActiveOnScroll);
  });
  


// DOWNLOAD CV MODAL
  $(document).ready(function () {
    const $modal = $("#cv-modal");
    const $openModalBtn = $("#btn-download-cv");
    const $closeModalBtn = $("#btn-close-modal");
    const $downloadPtBtn = $("#btn-download-pt");
    const $downloadEnBtn = $("#btn-download-en");

    // Ensure modal is hidden on page load (extra safety)
    $modal.hide(); 

    // Open the modal when clicking "Download CV"
    $openModalBtn.on("click", function (event) {
        event.preventDefault(); // Prevent any unwanted behavior
        $modal.fadeIn(200); // Smooth fade-in effect
    });

    // Close the modal when clicking the close button
    $closeModalBtn.on("click", function () {
        $modal.fadeOut(200); // Smooth fade-out effect
    });

    // Close the modal when clicking outside the modal content
    $(window).on("click", function (event) {
        if ($(event.target).is($modal)) {
            $modal.fadeOut(200);
        }
    });

    // Download Portuguese CV
    $downloadPtBtn.on("click", function () {
        window.location.href = "assets/CV_Portuguese.pdf"; // Change to your actual file path
    });

    // Download English CV
    $downloadEnBtn.on("click", function () {
        window.location.href = "assets/CV_English.pdf"; // Change to your actual file path
    });
});


// CURRENT DATE
$(document).ready(function () {
  // Get today's date
  let today = new Date();

  // Format day and year
  let day = today.getDate();
  let year = today.getFullYear();

  // Format month as full name
  let monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ];
  let month = monthNames[today.getMonth()]; // Get month name

  // Create formatted date string
  let formattedDate = `${month} ${day}, ${year}`;

  // Set the formatted date inside the <p> element
  $("#current-date").text(formattedDate);
});
