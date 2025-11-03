// Mobile menu functionality
(function() {
  function initMenu() {
    console.log('Menu.js initializing...');
    
    // Get menu elements - support both old and new class names
    const menuTrigger = document.querySelector(".mobile-menu-trigger");
    const mobileMenu = document.querySelector(".mobile-menu-block") || document.querySelector(".menu-block");
    const closeMenu = document.querySelector("#closeBtn") || document.querySelector(".mobile-menu-close");
    const menuOverlays = document.querySelectorAll(".menu-overlay");
    const goBack = document.querySelector(".go-back");
    
    console.log('Menu elements found:', {
      menuTrigger: !!menuTrigger,
      mobileMenu: !!mobileMenu,
      closeMenu: !!closeMenu,
      menuOverlays: menuOverlays.length
    });
    
    // Check if elements exist
    if (!menuTrigger || !mobileMenu) {
      console.error('Required menu elements not found, retrying in 100ms...');
      setTimeout(initMenu, 100);
      return;
    }

    // Toggle menu function
    function toggleMenu() {
      console.log('Toggle menu called');
      const isActive = mobileMenu.classList.contains("active");
      
      mobileMenu.classList.toggle("active");
      menuOverlays.forEach(overlay => overlay.classList.toggle("active"));
      menuTrigger.classList.toggle("active");
      
      // Update ARIA attributes
      menuTrigger.setAttribute('aria-expanded', (!isActive).toString());
      
      // Prevent body scroll when menu is open
      if (!isActive) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }

    // Close menu function
    function closeMenuFunc() {
      console.log('Close menu called');
      mobileMenu.classList.remove("active");
      menuOverlays.forEach(overlay => overlay.classList.remove("active"));
      menuTrigger.classList.remove("active");
      
      // Update ARIA attributes
      menuTrigger.setAttribute('aria-expanded', 'false');
      
      document.body.style.overflow = "";
    }

    // Event listeners
    menuTrigger.addEventListener("click", function(e) {
      console.log('Menu trigger clicked');
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    if (closeMenu) {
      closeMenu.addEventListener("click", function(e) {
        console.log('Close button clicked');
        e.preventDefault();
        e.stopPropagation();
        closeMenuFunc();
      });
    }

    menuOverlays.forEach(overlay => {
      overlay.addEventListener("click", function(e) {
        console.log('Overlay clicked');
        e.preventDefault();
        closeMenuFunc();
      });
    });

    // Close menu when clicking on navigation links (but not dropdowns)
    const mobileNavLinks = mobileMenu.querySelectorAll('a:not(.drop-trigger)');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        console.log('Nav link clicked');
        // Small delay for better UX
        setTimeout(closeMenuFunc, 100);
      });
    });

    // Submenu navigation is handled by Navigation.astro
    // to avoid conflicts between the two scripts

    // Go back functionality
    if (goBack) {
      goBack.style.display = 'none'; // Hide by default
      
      goBack.addEventListener('click', function() {
        // This would handle going back in submenu navigation if implemented
      });
    }

    // Close menu on window resize if screen becomes large
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1024) {
        closeMenuFunc();
      }
    });
    
    console.log('Menu.js initialization complete');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    // DOM is already ready
    initMenu();
  }
})();