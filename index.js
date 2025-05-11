/**
 * Angeles Cleaning - Main JavaScript
 * All website functionality in a single file
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile navigation
  initMobileNav();
  
  // Initialize booking popup
  initBookingPopup();
  
  // Initialize contact form
  initContactForm();
  
  // Initialize newsletter form
  initNewsletterForm();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  // Initialize calendar
  initCalendar();
  
  // Initialize slideshow
  initSlideshow();
});

/**
 * Initialize mobile navigation menu
 */
function initMobileNav() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Change the icon based on menu state
      const icon = this.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close mobile menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }
}

/**
 * Initialize booking popup functionality
 */
function initBookingPopup() {
  const bookingPopup = document.getElementById('booking-popup');
  const bookNowBtn = document.querySelector('.btn-book-now');
  const closePopupBtn = document.getElementById('close-popup');
  const bookingForm = document.getElementById('booking-form');
  
  // Show popup when clicking "Book Now" button
  if (bookNowBtn && bookingPopup) {
    bookNowBtn.addEventListener('click', function() {
      bookingPopup.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    });
  }
  
  // Close popup when clicking "Cancel" button
  if (closePopupBtn && bookingPopup) {
    closePopupBtn.addEventListener('click', function() {
      bookingPopup.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
  }
  
  // Close popup when clicking outside the popup
  window.addEventListener('click', function(event) {
    if (event.target === bookingPopup) {
      bookingPopup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // Handle booking form submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const name = document.getElementById('booking-name').value;
      const email = document.getElementById('booking-email').value;
      const phone = document.getElementById('booking-phone').value;
      const address = document.getElementById('booking-address').value;
      const date = document.getElementById('booking-date').value;
      const service = document.getElementById('booking-service').value;
      
      // Validate form fields
      if (!name || !email || !phone || !date || !service) {
        alert('Please fill in all required fields.');
        return;
      }
      
         // Send email using EmailJS
    const serviceId = 'service_wrhj469';
    const templateId = 'template_ufeoq0r';
    const userId = 'wapdNFB-3F2V85ECR';

    const templateParams = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      date: date,
      service: service
    };

    
    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);

        // Add a class to the booking date input to indicate it's booked
        const bookingDateInput = document.getElementById('booking-date');
        if (bookingDateInput) {
          bookingDateInput.classList.add('booked');
        }

        // Close the popup and reset the form
        bookingPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
        bookingForm.reset();
      }, (err) => {
        console.log('FAILED...', err);
      });


      // Display success message (in a real application, this would send data to a server)
      alert(`Booking submitted successfully!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nService: ${service}\n\nWe will contact you shortly to confirm your booking.`);
      
      // Close popup and reset form
      bookingPopup.style.display = 'none';
      document.body.style.overflow = 'auto';
      bookingForm.reset();
    });
  }
}

/**
 * Initialize contact form functionality
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Validate form fields
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Display success message (in a real application, this would send data to a server)
      alert(`Message sent successfully!\n\nName: ${name}\nEmail: ${email}\n\nWe will get back to you as soon as possible.`);
      
      // Reset form
      contactForm.reset();
    });
  }
}

/**
 * Initialize newsletter subscription
 */
function initNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // Display success message (in a real application, this would send data to a server)
        alert(`Thank you for subscribing to our newsletter!\n\nEmail: ${email}`);
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Utility function to format a date as MM/DD/YYYY
 * @param {Date} date - The date to format
 * @return {string} Formatted date string
 */
function formatDate(date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
}

/**
 * Initialize the booking calendar
 */
function initCalendar() {
  const calendarEl = document.getElementById('calendar');
  
  if (calendarEl) {
    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Initialize the current month's calendar
    generateCalendar(currentYear, currentMonth);
  }
}

/**
 * Generate the calendar for a specific month and year
 * @param {number} year - The year to generate the calendar for
 * @param {number} month - The month to generate the calendar for (0-11)
 */
function generateCalendar(year, month) {
  const calendarEl = document.getElementById('calendar');
  
  if (!calendarEl) {
    return;
  }
  
  // Get the first day of the month and the number of days in the month
  const firstDay = new Date(year, month, 1).getDay(); // 0 (Sunday) to 6 (Saturday)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Month names for the header
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Create the table element
  let calendarHTML = `
    <div class="calendar-header">
      <button id="prev-month" class="calendar-nav-btn"><i class="fas fa-chevron-left"></i></button>
      <h3>${monthNames[month]} ${year}</h3>
      <button id="next-month" class="calendar-nav-btn"><i class="fas fa-chevron-right"></i></button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  // Add days to the calendar
  let date = 1;
  
  // Create calendar rows
  for (let i = 0; i < 6; i++) {
    // Break if we've reached the end of the month
    if (date > daysInMonth) {
      break;
    }
    
    calendarHTML += '<tr>';
    
    // Create calendar cells for each day of the week
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay) || date > daysInMonth) {
        // Empty cell
        calendarHTML += '<td></td>';
      } else {
        // Determine if this is a weekend (Saturday or Sunday)
        const isWeekend = (j === 0 || j === 6);
        // Cell class based on weekday/weekend
        const cellClass = isWeekend ? 'weekend' : 'weekday';
        
        // Generate the date string (YYYY-MM-DD) for the data attribute
        const monthStr = (month + 1).toString().padStart(2, '0');
        const dateStr = date.toString().padStart(2, '0');
        const fullDateStr = `${year}-${monthStr}-${dateStr}`;
        
        // Create the cell
        calendarHTML += `<td class="${cellClass}" data-date="${fullDateStr}" onclick="handleDateClick(this)">${date}</td>`;
        
        date++;
      }
    }
    
    calendarHTML += '</tr>';
  }
  
  calendarHTML += `
      </tbody>
    </table>
  `;
  
  // Set the calendar HTML
  calendarEl.innerHTML = calendarHTML;
  
  // Add event listeners for the navigation buttons
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', function() {
      let newMonth = month - 1;
      let newYear = year;
      
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
      
      generateCalendar(newYear, newMonth);
    });
  }
  
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', function() {
      let newMonth = month + 1;
      let newYear = year;
      
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      
      generateCalendar(newYear, newMonth);
    });
  }
}

/**
 * Handle calendar date click event
 * @param {HTMLElement} cell - The clicked calendar cell
 */
function handleDateClick(cell) {
  if (!cell || cell.classList.contains('weekend')) {
    return; // Don't do anything for weekend cells
  }
  
  const dateStr = cell.getAttribute('data-date');
  
  if (!dateStr) {
    return;
  }
  
  // Format the date for display (MM/DD/YYYY)
  const dateParts = dateStr.split('-');
  const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
  
  // Set the date in the booking form
  const bookingDateInput = document.getElementById('booking-date');
  if (bookingDateInput) {
    bookingDateInput.value = formattedDate;
  }
  
  // Show the booking popup
  const bookingPopup = document.getElementById('booking-popup');
  if (bookingPopup) {
    bookingPopup.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
  }
}

/**
 * Initialize the slideshow functionality
 */
function initSlideshow() {
  const slideshowContainer = document.getElementById('slideshow-container');
  
  if (!slideshowContainer) {
    return;
  }
  
  // Define slideshow image sources (using placeholder images via Unsplash)
  const imageSources = [
    'IMG_20250319_163127.jpg',
    'https://source.unsplash.com/random/800x600/?clean+bathroom',
    'https://source.unsplash.com/random/800x600/?clean+living+room',
    'https://source.unsplash.com/random/800x600/?clean+house',
    'https://source.unsplash.com/random/800x600/?cleaning+service',
    'https://source.unsplash.com/random/800x600/?mop+cleaning',
    'https://source.unsplash.com/random/800x600/?vacuum+cleaner',
    'https://source.unsplash.com/random/800x600/?clean+office'
  ];
  
  // Create image elements
  let slideshowHTML = '';
  
  imageSources.forEach((src, index) => {
    slideshowHTML += `<img src="${src}" alt="Cleaning Service Image ${index + 1}" class="slideshow-image${index === 0 ? ' active' : ''}">`;
  });
  
  // Add images to the slideshow container
  slideshowContainer.innerHTML = slideshowHTML;
  
  // Get all slideshow images
  const images = slideshowContainer.querySelectorAll('.slideshow-image');
  
  // Set up slideshow navigation
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      navigateSlideshow('prev');
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      navigateSlideshow('next');
    });
  }
  
  // Set up automatic slideshow
  let slideshowInterval = setInterval(() => {
    navigateSlideshow('next');
  }, 5000); // Change slides every 5 seconds
  
  // Pause slideshow on hover
  slideshowContainer.addEventListener('mouseenter', function() {
    clearInterval(slideshowInterval);
  });
  
  // Resume slideshow on mouse leave
  slideshowContainer.addEventListener('mouseleave', function() {
    slideshowInterval = setInterval(() => {
      navigateSlideshow('next');
    }, 5000);
  });
}

/**
 * Navigate the slideshow in the specified direction
 * @param {string} direction - The direction to navigate ('prev' or 'next')
 */
function navigateSlideshow(direction) {
  const slideshowContainer = document.getElementById('slideshow-container');
  
  if (!slideshowContainer) {
    return;
  }
  
  // Find the currently active image
  const activeImage = slideshowContainer.querySelector('.slideshow-image.active');
  
  if (!activeImage) {
    return;
  }
  
  // Remove active class from current image
  activeImage.classList.remove('active');
  
  // Determine the next image based on direction
  let nextImage;
  
  if (direction === 'next') {
    nextImage = activeImage.nextElementSibling;
    
    // If there is no next image, loop back to the first one
    if (!nextImage || !nextImage.classList.contains('slideshow-image')) {
      nextImage = slideshowContainer.querySelector('.slideshow-image:first-child');
    }
  } else {
    nextImage = activeImage.previousElementSibling;
    
    // If there is no previous image, loop to the last one
    if (!nextImage || !nextImage.classList.contains('slideshow-image')) {
      nextImage = slideshowContainer.querySelector('.slideshow-image:last-child');
    }
  }
  
  // Add active class to the next image
  if (nextImage) {
    nextImage.classList.add('active');
  }
}

// Make handleDateClick function available globally
window.handleDateClick = handleDateClick;
