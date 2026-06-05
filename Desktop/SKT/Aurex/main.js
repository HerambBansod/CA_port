/* Interactive Scripts for AUREX Website */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.header');
  
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on load to set initial state
  }

  // 2. Mobile Hamburger Menu Drawer
  const menuToggle = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.drawer');
  const overlay = document.querySelector('.drawer-overlay');
  
  if (menuToggle && drawer && overlay) {
    const toggleMenu = () => {
      const isOpen = drawer.classList.toggle('open');
      overlay.classList.toggle('open', isOpen);
      
      // Update hamburger button visual (toggle icon if svg paths change)
      const paths = menuToggle.querySelectorAll('path');
      if (paths.length > 0) {
        if (isOpen) {
          // Change to Close icon (X)
          paths[0].setAttribute('d', 'M18 6L6 18');
          if (paths[1]) paths[1].setAttribute('d', 'M6 6l12 12');
        } else {
          // Restore Hamburger icon
          paths[0].setAttribute('d', 'M4 12h16');
          if (paths[1]) paths[1].setAttribute('d', 'M4 6h16');
          // Add a third line if it existed
          const path3 = menuToggle.querySelector('.hamburger-line-3');
          if (path3) path3.setAttribute('d', 'M4 18h16');
        }
      }
    };

    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    const drawerClose = document.querySelector('.drawer__close');
    if (drawerClose) {
      drawerClose.addEventListener('click', toggleMenu);
    }
    
    // Close drawer when link clicked
    const drawerLinks = drawer.querySelectorAll('.drawer__link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        // Restore hamburger paths
        const paths = menuToggle.querySelectorAll('path');
        if (paths.length > 0) {
          paths[0].setAttribute('d', 'M4 12h16');
          if (paths[1]) paths[1].setAttribute('d', 'M4 6h16');
        }
      });
    });
  }

  // 3. Floating Hero Card Dynamic Data
  // To simulate live B2B weather sensor feeds
  const windValue = document.getElementById('hero-wind');
  const rainValue = document.getElementById('hero-rain');
  const humidityValue = document.getElementById('hero-humidity');
  
  if (windValue || rainValue || humidityValue) {
    setInterval(() => {
      if (windValue) {
        // Wind speed slight fluctuation: 12.0 to 13.5 m/s
        const currentWind = (12.0 + Math.random() * 1.5).toFixed(1);
        windValue.textContent = `${currentWind} m/s`;
      }
      
      if (rainValue && Math.random() > 0.8) {
        // Rainfall updates occasionally: 24.8 to 25.4 mm
        const currentRain = (24.5 + Math.random() * 1.2).toFixed(1);
        rainValue.textContent = `${currentRain} mm`;
      }
      
      if (humidityValue && Math.random() > 0.7) {
        // Humidity fluctuates slightly around 74-76%
        const currentHumidity = Math.floor(73 + Math.random() * 4);
        humidityValue.textContent = `${currentHumidity}%`;
      }
    }, 4000);
  }

  // 4. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Animates only once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px' // Trigger slightly before element enters viewport
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // 5. Email Enquiry & Contact Form Submissions
  const emailBoxForm = document.querySelector('.enquiry-form');
  const mainContactForm = document.querySelector('.contact-form');
  
  if (emailBoxForm) {
    emailBoxForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = emailBoxForm.querySelector('.enquiry-form__input');
      const submitBtn = emailBoxForm.querySelector('.enquiry-form__button');
      
      if (emailInput && emailInput.value) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        const quickHoneypot = document.getElementById('quick-website');
        
        grecaptcha.ready(function() {
          grecaptcha.execute('6LfO_QgtAAAAAMBRmgSdhi9pQaAR7axbtvKyZgB4', {action: 'submit'}).then(function(token) {
            fetch('./send-email.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                type: 'quick',
                email: emailInput.value.trim(),
                website: quickHoneypot ? quickHoneypot.value.trim() : '',
                recaptcha_token: token
              })
            })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                emailInput.value = '';
                submitBtn.textContent = 'Enquiry Submitted';
                submitBtn.style.background = '#2FBF71';
                submitBtn.style.color = '#FFFFFF';
                submitBtn.style.borderColor = '#2FBF71';
                alert('Thank you! Your discussion request has been sent to our team in Singapore.');
              } else {
                alert('Error: ' + (data.message || 'Unable to submit enquiry. Please try again.'));
                submitBtn.disabled = false;
                submitBtn.textContent = 'Discuss Project';
              }
            })
            .catch(err => {
              console.error(err);
              alert('Network error. Please try again.');
              submitBtn.disabled = false;
              submitBtn.textContent = 'Discuss Project';
            });
          });
        });
      }
    });
  }
  
  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = mainContactForm.querySelector('.form-submit-btn');
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const companyInput = document.getElementById('contact-company');
      const roleInput = document.getElementById('contact-role');
      const sectorInput = document.getElementById('contact-sector');
      const messageInput = document.getElementById('contact-message');
      const contactHoneypot = document.getElementById('contact-website');
      const successState = document.querySelector('.form-success-state');
      
      // Basic Validation
      let isValid = true;
      const requiredInputs = mainContactForm.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#E5484D';
        } else {
          input.style.borderColor = '#D8E3EE';
        }
      });
      
      if (isValid) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';
        
        grecaptcha.ready(function() {
          grecaptcha.execute('6LfO_QgtAAAAAMBRmgSdhi9pQaAR7axbtvKyZgB4', {action: 'submit'}).then(function(token) {
            fetch('./send-email.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                type: 'detailed',
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                company: companyInput.value.trim(),
                role: roleInput ? roleInput.value.trim() : '',
                sector: sectorInput.value,
                message: messageInput.value.trim(),
                website: contactHoneypot ? contactHoneypot.value.trim() : '',
                recaptcha_token: token
              })
            })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                mainContactForm.style.display = 'none';
                if (successState) {
                  successState.style.display = 'flex';
                }
              } else {
                alert('Error: ' + (data.message || 'Unable to submit enquiry. Please try again.'));
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Project Enquiry';
              }
            })
            .catch(err => {
              console.error(err);
              alert('Network error. Please try again.');
              submitBtn.disabled = false;
              submitBtn.textContent = 'Submit Project Enquiry';
            });
          });
        });
      }
    });
  }

  // 6. Dynamic Copyright Year
  const copyrightElems = document.querySelectorAll('.footer__copyright');
  const currentYear = new Date().getFullYear();
  copyrightElems.forEach(elem => {
    elem.innerHTML = `&copy; ${currentYear} AUREX GLOBAL LLP. All rights reserved.`;
  });

  // 7. Magnetic Button Pull Effect
  const magneticButtons = document.querySelectorAll('.btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      // Pull button towards cursor coordinates (20% intensity)
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      btn.style.transition = 'transform 0.1s ease-out';
    });
    
    btn.addEventListener('mouseleave', () => {
      // Gracefully spring back
      btn.style.transform = '';
      btn.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
});
