document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with the class "link-container"
    var linkContainers = document.querySelectorAll('.link-container');
  
    // Add a click event listener to each "link-container" element
    linkContainers.forEach(function (container) {
      container.addEventListener('click', function () {
        // Get the URL from the data-url attribute of the clicked element
        var url = container.getAttribute('data-url');
  
        // Set the window location to the URL
        window.location.href = url;
      });
    });
  });