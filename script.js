document.addEventListener('DOMContentLoaded', function() {
  console.log('Script loaded');
  
  // Add scroll event handler for navbar shadow
  window.addEventListener('scroll', function() {
    if (window.innerWidth <= 820) {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 0) {
        navbar.classList.add('shadow');
      } else {
        navbar.classList.remove('shadow');
      }
    }
  });

  // Add menu toggle handler
  document.querySelector('.menu-toggle').addEventListener('change', function() {
    document.querySelector('.hamburger svg').classList.toggle('active');
    // Toggle scroll lock
    document.body.classList.toggle('menu-active');
  });

  document.querySelectorAll('.dropdown > a').forEach(function(dropdownToggle) {
    dropdownToggle.addEventListener('click', function(event) {
      if (window.innerWidth <= 820) {
        event.preventDefault();
        const dropdown = this.parentElement;
        const dropdownContent = this.nextElementSibling;
        const arrow = this.querySelector('.arrow-down');
        
        // Close all other dropdowns first
        document.querySelectorAll('.dropdown').forEach(function(d) {
          if (d !== dropdown) {
            d.classList.remove('open');
            d.querySelector('.dropdown-content').style.maxHeight = null;
            d.querySelector('.arrow-down').classList.remove('rotate');
          }
        });

        // Only open the dropdown, no toggle
        if (!dropdown.classList.contains('open')) {
          dropdown.classList.add('open');
          dropdownContent.style.maxHeight = dropdownContent.scrollHeight + 'px';
          arrow.classList.add('rotate');
        }
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 820 && !event.target.closest('.dropdown') && !event.target.closest('.menu-toggle')) {
      document.querySelectorAll('.dropdown').forEach(function(dropdown) {
        dropdown.classList.remove('open');
        dropdown.querySelector('.dropdown-content').style.maxHeight = null;
        dropdown.querySelector('.arrow-down').classList.remove('rotate');
      });
    }
  });

  // Close menu on swipe right
  let touchstartX = 0;
  let touchendX = 0;

  document.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
  }, false);

  document.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    if (touchendX > touchstartX + 50 && document.body.classList.contains('menu-active')) {
      document.querySelector('.menu-toggle').checked = false;
      document.querySelector('.hamburger svg').classList.remove('active');
      document.body.classList.remove('menu-active');
    }
  }, false);
});
