const clock = document.querySelector('.clock');
const message = document.querySelector('.message');
const timeFormatCheckbox = document.getElementById('time-format');

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let meridian = "";
  let messageText = '';

  // Check if 12-hour format is enabled
  const timeFormat = localStorage.getItem('timeFormat') || '12-hour';
  timeFormatCheckbox.checked = timeFormat === '12-hour';
  if (timeFormat === '12-hour') {
    if (hours >= 5 && hours < 12) {
      messageText = 'Good morning';
    } else if (hours >= 12 && hours < 18) {
      messageText = 'Good afternoon';
    } else {
      messageText = 'Good evening';
    }
    // Convert to 12-hour format
    meridian = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  } else {
    if (hours >= 5 && hours < 12) {
      messageText = 'Good morning';
    } else if (hours >= 12 && hours < 18) {
      messageText = 'Good afternoon';
    } else {
      messageText = 'Good evening';
    }
    meridian = "";
  }

  // Update the clock
  clock.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${meridian}`;

  // Update the message
  message.textContent = `Hello Razon, ${messageText}!`;

  // Request the next animation frame
  requestAnimationFrame(updateClock);
}

// Update the clock every 100 milliseconds
setInterval(updateClock, 100);

timeFormatCheckbox.addEventListener('click', () => {
  const timeFormat = timeFormatCheckbox.checked ? '12-hour' : '24-hour';
  localStorage.setItem('timeFormat', timeFormat);
  updateClock();
});

// Start the clock by requesting the first animation frame
requestAnimationFrame(updateClock);
