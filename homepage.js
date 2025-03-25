const calendar = document.getElementById('calendar');

const daysInMonth = 31;
const calendarHTML = `
  <h2>Calendar</h2>
  <div id="legend">
    <div class="legend-item">
      <div class="circle available"></div>
      <span>Available</span>
    </div>
    <div class="legend-item">
      <div class="circle unavailable"></div>
      <span>Unavailable</span>
    </div>
  </div>
  <table>
    <tr>
      <th>Sun</th>
      <th>Mon</th>
      <th>Tue</th>
      <th>Wed</th>
      <th>Thu</th>
      <th>Fri</th>
      <th>Sat</th>
    </tr>
    ${getCalendarRows(daysInMonth)}
  </table>
`;

calendar.innerHTML = calendarHTML;

function getCalendarRows(daysInMonth) {
  let rows = '';
  let day = 1;
  for (let i = 0; i < 5; i++) {
    rows += '<tr>';
    for (let j = 0; j < 7; j++) {
      if (day <= daysInMonth) {
        rows += `<td data-day="${day}" class="day-${day}">${day}</td>`;
        day++;
      } else {
        rows += '<td></td>';
      }
    }
    rows += '</tr>';
  }
  return rows;
}

// Add event listener to each table cell
const tableCells = document.querySelectorAll('#calendar td');
tableCells.forEach((cell) => {
  if (cell.dataset.day) {
    cell.addEventListener('click', () => {
      const day = cell.dataset.day;
      createPopupWindow(day);
    });
  }
});

// Function to create popup window
function createPopupWindow(day) {
  // Check if a popup window already exists
  const existingPopup = document.querySelector('.popup-window');
  if (existingPopup) {
    existingPopup.remove();
  }

  const popupHTML = `
    <div class="popup-window">
      <h2>Day ${day}</h2>
      <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br><br>
        <label for="phone">Phone Number:</label>
        <input type="text" id="phone" name="phone"><br><br>
        <label for="address">Address:</label>
        <input type="text" id="address" name="address"><br><br>
        <label for="time">Time:</label>
        <select id="time" name="time">
          <option value="9:00 AM">9:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="1:00 PM">1:00 PM</option>
          <option value="2:00 PM">2:00 PM</option>
          <option value="3:00 PM">3:00 PM</option>
          <option value="4:00 PM">4:00 PM</option>
          <option value="5:00 PM">5:00 PM</option>
        </select><br><br>
        <input type="submit" value="Send">
      </form>
      <button class="close-button">Close</button>
    </div>
  `;

  const popupWindow = document.createElement('div');
  popupWindow.innerHTML = popupHTML;
  document.body.appendChild(popupWindow);

  // Add event listener to close button
  const closeButton = popupWindow.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    popupWindow.remove();
  });

  // Add event listener to form submit
  const form = popupWindow.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = event.target.querySelector('#name').value;
    const phone = event.target.querySelector('#phone').value;
    const address = event.target.querySelector('#address').value;
    const time = event.target.querySelector('#time').value;

    // Send email using EmailJS
    const serviceId = 'service_wrhj469';
    const templateId = 'template_ufeoq0r';
    const userId = 'wapdNFB-3F2V85ECR';

    const templateParams = {
      name: name,
      phone: phone,
      address: address,
      time: time,
      day: day // Include the selected day in the email
    };

    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);

        // Get the day box element
        const dayBox = document.querySelector(`.day-${day}`);

        // Add a class to the day box to fill it with red color
        dayBox.classList.add('booked');

        // Close the popup window
        popupWindow.remove();
      }, (err) => {
        console.log('FAILED...', err);
      });
  });
}

// Select all slideshow images
const images = document.querySelectorAll('.slideshow-image');
let currentIndex = 0;

// Function to show the next image
function showNextImage() {
  // Remove the 'active' class from the current image
  images[currentIndex].classList.remove('active');

  // Update the index to the next image
  currentIndex = (currentIndex + 1) % images.length;

  // Add the 'active' class to the new current image
  images[currentIndex].classList.add('active');
}

// Set an interval to change the image every 5 seconds
setInterval(showNextImage, 5000);

// Initialize the first image as active
if (images.length > 0) {
  images[currentIndex].classList.add('active');
}