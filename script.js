document.addEventListener('DOMContentLoaded', function() {
  console.log('Script loaded');
  
  // Add menu toggle handler
  document.querySelector('.menu-toggle').addEventListener('change', function() {
    document.querySelector('.hamburger svg').classList.toggle('active');
    // Toggle scroll lock
    document.body.classList.toggle('menu-active');
  });

  document.querySelectorAll('.dropdown > a').forEach(function(dropdownToggle) {
    dropdownToggle.addEventListener('click', function(event) {
      // Only prevent default and handle click on mobile
      if (window.innerWidth <= 820) {
        event.preventDefault();
        const dropdown = this.parentElement;
        const dropdownContent = this.nextElementSibling;
        const arrow = this.querySelector('.arrow-down');
        if (dropdown.classList.contains('open')) {
          dropdown.classList.remove('open');
          dropdownContent.style.maxHeight = null;
          arrow.classList.remove('rotate');
        } else {
          document.querySelectorAll('.dropdown').forEach(function(d) {
            d.classList.remove('open');
            d.querySelector('.dropdown-content').style.maxHeight = null;
            d.querySelector('.arrow-down').classList.remove('rotate');
          });
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
});
