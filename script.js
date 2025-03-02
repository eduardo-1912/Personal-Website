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
  