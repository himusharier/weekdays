const button = document.getElementById('change-background');
const clientId = 'gu3_XFZW8WNQd5OoFa1R95Xmww1WnwxrjZP_ClhwJH0';

document.addEventListener('DOMContentLoaded', function () {
  const imageUrl = localStorage.getItem('imageUrl');
  const imageLocation = localStorage.getItem('imagelocation');
  if (imageUrl) {
    loadBackground(imageUrl, imageLocation);
  } else {
    loadDefaultBackground();
  }
});

const showLoading = () => {
  button.textContent = 'Loading...';
  button.disabled = true;
};

const hideLoading = () => {
  button.textContent = 'Change Background';
  button.disabled = false;
};

button.addEventListener('click', changeImage);

function loadBackground(imageUrl, imageLocation) {
  const background = document.querySelector('.background');
  const location = document.querySelector('.image-caption');
  background.style.background = `url(${imageUrl}) no-repeat center center fixed`;
  background.style.backgroundSize = 'cover';
  background.style.filter = 'brightness(0.8)';
  location.textContent = imageLocation;
}

function loadDefaultBackground() {
  const background = document.querySelector('.background');
  const location = document.querySelector('.image-caption');
  const defaultImageUrl = 'background.jpg';
  background.style.background = `url(${defaultImageUrl}) no-repeat center center fixed`;
  background.style.backgroundSize = 'cover';
  background.style.filter = 'brightness(0.8)';
  location.textContent = "Somewhere, Earth";
}

function changeImage() {
  showLoading();
  const location = document.querySelector('.image-caption');
  fetch(`https://api.unsplash.com/photos/random?client_id=${clientId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const imageUrl = data.urls.full; // full, raw, regular, small, small_s3, thumb
      const imageLocation = data.location.name || 'Somewhere, Earth';
      localStorage.setItem('imageUrl', imageUrl);
      localStorage.setItem('imagelocation', imageLocation);
      const image = new Image();
      image.onload = () => {
        loadBackground(imageUrl, imageLocation);
        hideLoading();
      };
      image.onerror = () => {
        console.error('Failed to load image');
        loadDefaultBackground(); // Load the default image if the fetched image fails to load
        hideLoading();
      };
      image.src = imageUrl;
      console.log('API called.');
    })
    .catch(error => {
      console.error(error);
      hideLoading();
    });
}

// Update background every 5 mins
setInterval(changeImage, 300000);

// Settings
const settingsIcon = document.querySelector('.settings-icon');
const settingsOptions = document.querySelector('.settings-options');

settingsIcon.addEventListener('click', () => {
  settingsOptions.style.display = settingsOptions.style.display === 'none' ? 'block' : 'none';
});

// Links
const linksIcon = document.querySelector('.links-icon');
const linksOptions = document.querySelector('.links-options');
