/**
 * Naman Construction Solutions - Main JavaScript
 * Handles navigation, animations, carousels, modals, booking wizard & forms
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- 1. STICKY HEADER & SCROLL-TO-TOP ---
  const header = document.querySelector('.site-header');
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', function () {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (header) {
      if (scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 2. MOBILE NAVIGATION DRAWER ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');
  const mobileDropdownTriggers = document.querySelectorAll('.mobile-has-submenu > a');

  function openMobileNav() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  mobileDropdownTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const parent = this.parentElement;
      const submenu = parent.querySelector('.mobile-submenu');
      if (submenu) {
        submenu.classList.toggle('open');
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-chevron-down');
          icon.classList.toggle('fa-chevron-up');
        }
      }
    });
  });

  // --- 3. ANIMATED COUNTER ON SCROLL ---
  const counters = document.querySelectorAll('.counter-number');
  let countersAnimated = false;

  function runCounters() {
    counters.forEach(function (counter) {
      const target = +counter.getAttribute('data-target') || parseInt(counter.innerText, 10) || 0;
      const suffix = counter.getAttribute('data-suffix') || '+';
      let count = 0;
      const duration = 1800; // 1.8 seconds
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quadratic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        count = Math.floor(easeProgress * target);
        counter.innerText = count + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.innerText = target + suffix;
        }
      }

      requestAnimationFrame(update);
    });
  }

  if (counters.length > 0) {
    const counterSection = document.querySelector('.counter-bar');
    if (counterSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            runCounters();
          }
        });
      }, { threshold: 0.3 });
      observer.observe(counterSection);
    } else {
      runCounters();
    }
  }

  // --- 3b. HERO BANNER SLIDER (3 sliding background images) ---
  const heroTrack = document.querySelector('.hero-track');
  if (heroTrack) {
    const heroSlides = Array.from(heroTrack.children);
    const heroCount = heroSlides.length;
    const heroDots = document.querySelector('.hero-dots');
    const heroPrev = document.querySelector('.hero-prev');
    const heroNext = document.querySelector('.hero-next');
    const HERO_MS = 900;
    let heroIdx = 0;
    let heroBusy = false;
    let heroTimer = null;

    // clone first slide at the end so the loop keeps sliding forward
    heroTrack.appendChild(heroSlides[0].cloneNode(true));

    if (heroDots) {
      for (let i = 0; i < heroCount; i++) {
        const d = document.createElement('span');
        d.className = 'hero-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => heroGo(i));
        heroDots.appendChild(d);
      }
    }

    function heroPaint(animate) {
      heroTrack.style.transition = animate ? `transform ${HERO_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : 'none';
      heroTrack.style.transform = `translateX(-${heroIdx * 100}%)`;
      if (heroDots) {
        Array.from(heroDots.children).forEach((d, i) => d.classList.toggle('active', i === heroIdx % heroCount));
      }
    }

    function heroGo(i) {
      if (heroBusy) return;
      heroBusy = true;
      heroIdx = i;
      heroPaint(true);
      heroReset();
      setTimeout(() => {
        if (heroIdx >= heroCount) { heroIdx = 0; heroPaint(false); }
        heroBusy = false;
      }, HERO_MS + 30);
    }

    function heroNextSlide() { heroGo(heroIdx + 1); }
    function heroPrevSlide() {
      if (heroBusy) return;
      if (heroIdx === 0) {
        heroIdx = heroCount;
        heroPaint(false);
        void heroTrack.offsetWidth;
      }
      heroGo(heroIdx - 1);
    }

    function heroStart() { heroTimer = setInterval(heroNextSlide, 6000); }
    function heroReset() { clearInterval(heroTimer); heroStart(); }

    if (heroNext) heroNext.addEventListener('click', heroNextSlide);
    if (heroPrev) heroPrev.addEventListener('click', heroPrevSlide);
    heroPaint(false);
    heroStart();
  }

  // --- 4. TESTIMONIALS CAROUSEL (3 at a time, slides one by one) ---
  const carouselTrack = document.querySelector('.testimonial-track');
  const carouselContainer = document.querySelector('.testimonial-carousel-container');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (carouselTrack && carouselContainer) {
    const realSlides = Array.from(carouselTrack.querySelectorAll('.testimonial-slide'));
    const total = realSlides.length;
    const SLIDE_MS = 700;
    let idx = 0;
    let busy = false;
    let autoPlayTimer = null;

    // clones of the first 3 slides at the end => seamless forward loop
    for (let i = 0; i < Math.min(3, total); i++) {
      const c = realSlides[i].cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      carouselTrack.appendChild(c);
    }

    if (dotsContainer && dotsContainer.children.length === 0) {
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
      }
    }

    function perView() {
      const v = parseInt(getComputedStyle(carouselContainer).getPropertyValue('--per-view'), 10);
      return v || 3;
    }

    function paint(animate) {
      carouselTrack.style.transition = animate ? `transform ${SLIDE_MS}ms ease-in-out` : 'none';
      carouselTrack.style.transform = `translateX(-${idx * (100 / perView())}%)`;
      if (dotsContainer) {
        Array.from(dotsContainer.children).forEach((d, i) => d.classList.toggle('active', i === idx % total));
      }
    }

    function goTo(i) {
      if (busy) return;
      busy = true;
      idx = i;
      paint(true);
      resetAutoplay();
      setTimeout(() => {
        if (idx >= total) { idx = idx - total; paint(false); }
        busy = false;
      }, SLIDE_MS + 30);
    }

    function nextSlide() { goTo(idx + 1); }
    function prevSlide() {
      if (busy) return;
      if (idx === 0) {
        idx = total;
        paint(false);
        void carouselTrack.offsetWidth;
      }
      goTo(idx - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    function startAutoplay() { autoPlayTimer = setInterval(nextSlide, 3500); }
    function resetAutoplay() { clearInterval(autoPlayTimer); startAutoplay(); }

    paint(false);
    startAutoplay();

    // Pause on hover
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    carouselContainer.addEventListener('mouseleave', () => { clearInterval(autoPlayTimer); startAutoplay(); });

    // Re-position on resize (per-view changes)
    window.addEventListener('resize', () => paint(false));

    // Touch swipe support
    let startX = 0;
    carouselTrack.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    carouselTrack.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
    }, { passive: true });
  }

  // --- 5. GALLERY FILTER & LIGHTBOX ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter || category.includes(filter)) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; }, 20);
          } else {
            item.style.opacity = '0';
            setTimeout(() => { item.style.display = 'none'; }, 250);
          }
        });
      });
    });
  }

  // Lightbox view
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach(card => {
    card.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', function () {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // --- 6. BOOKING APPOINTMENT WIZARD (BOOKLY-STYLE) ---
  const wizard = document.getElementById('bookingWizard');
  if (wizard) {
    let currentStep = 1;
    const totalSteps = 5;

    const stepHeaders = wizard.querySelectorAll('.wizard-step');
    const stepPanes = wizard.querySelectorAll('.wizard-step-pane');
    const prevStepBtn = wizard.querySelector('#wizardPrevBtn');
    const nextStepBtn = wizard.querySelector('#wizardNextBtn');

    // Selected state
    let bookingData = {
      service: 'Building Construction',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      name: '',
      phone: '',
      email: '',
      address: '',
      notes: ''
    };

    function showStep(step) {
      currentStep = step;
      stepHeaders.forEach((sh, idx) => {
        const stepNum = idx + 1;
        sh.classList.remove('active', 'completed');
        if (stepNum === currentStep) {
          sh.classList.add('active');
        } else if (stepNum < currentStep) {
          sh.classList.add('completed');
        }
      });

      stepPanes.forEach((sp, idx) => {
        sp.classList.toggle('active', idx + 1 === currentStep);
      });

      // Update button labels & visibility
      if (prevStepBtn) {
        prevStepBtn.style.display = currentStep > 1 && currentStep < totalSteps ? 'inline-flex' : 'none';
      }

      if (nextStepBtn) {
        if (currentStep === totalSteps - 1) {
          nextStepBtn.innerText = 'Confirm & Book Appointment';
          nextStepBtn.className = 'btn btn-accent';
        } else if (currentStep === totalSteps) {
          nextStepBtn.style.display = 'none';
        } else {
          nextStepBtn.innerText = 'Next Step';
          nextStepBtn.className = 'btn btn-primary';
          nextStepBtn.style.display = 'inline-flex';
        }
      }

      // Step 4: Populate summary
      if (currentStep === 4) {
        const summaryService = document.getElementById('sumService');
        const summaryDateTime = document.getElementById('sumDateTime');
        const summaryClient = document.getElementById('sumClient');
        const summaryContact = document.getElementById('sumContact');

        if (summaryService) summaryService.innerText = bookingData.service;
        if (summaryDateTime) summaryDateTime.innerText = `${bookingData.date} at ${bookingData.time}`;
        if (summaryClient) summaryClient.innerText = bookingData.name || 'Not provided';
        if (summaryContact) summaryContact.innerText = `${bookingData.phone || '-'} | ${bookingData.email || '-'}`;
      }

      // Step 5: Generate random booking code
      if (currentStep === 5) {
        const refIdSpan = document.getElementById('bookingRefId');
        if (refIdSpan) {
          const randNum = Math.floor(1000 + Math.random() * 9000);
          refIdSpan.innerText = `NCS-2026-${randNum}`;
        }
      }
    }

    // Service radio selection
    const serviceRadios = wizard.querySelectorAll('input[name="booking_service"]');
    serviceRadios.forEach(radio => {
      radio.addEventListener('change', function () {
        bookingData.service = this.value;
        wizard.querySelectorAll('.service-radio-card').forEach(c => c.classList.remove('selected'));
        this.closest('.service-radio-card').classList.add('selected');
      });
    });

    // Time slot selection
    const timeSlots = wizard.querySelectorAll('.time-slot-btn');
    timeSlots.forEach(btn => {
      btn.addEventListener('click', function () {
        timeSlots.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        bookingData.time = this.innerText.trim();
      });
    });

    const datePicker = wizard.querySelector('#bookingDate');
    if (datePicker) {
      datePicker.value = bookingData.date;
      datePicker.addEventListener('change', function () {
        bookingData.date = this.value;
      });
    }

    if (nextStepBtn) {
      nextStepBtn.addEventListener('click', function () {
        if (currentStep === 3) {
          // Validate step 3 fields
          const nameInput = wizard.querySelector('#clientName');
          const phoneInput = wizard.querySelector('#clientPhone');
          const emailInput = wizard.querySelector('#clientEmail');
          const addressInput = wizard.querySelector('#clientAddress');
          const notesInput = wizard.querySelector('#clientNotes');

          if (!nameInput || !nameInput.value.trim()) {
            alert('Please enter your full name.');
            nameInput && nameInput.focus();
            return;
          }
          if (!phoneInput || !phoneInput.value.trim()) {
            alert('Please enter your phone number.');
            phoneInput && phoneInput.focus();
            return;
          }

          bookingData.name = nameInput.value.trim();
          bookingData.phone = phoneInput.value.trim();
          bookingData.email = emailInput ? emailInput.value.trim() : '';
          bookingData.address = addressInput ? addressInput.value.trim() : '';
          bookingData.notes = notesInput ? notesInput.value.trim() : '';
        }

        if (currentStep < totalSteps) {
          showStep(currentStep + 1);
        }
      });
    }

    if (prevStepBtn) {
      prevStepBtn.addEventListener('click', function () {
        if (currentStep > 1) {
          showStep(currentStep - 1);
        }
      });
    }
  }

  // --- 7. CONTACT & INQUIRY FORM SUBMISSION ---
  const contactForms = document.querySelectorAll('.ajax-contact-form');
  contactForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';
      }

      setTimeout(() => {
        let msgBox = form.querySelector('.form-status-msg');
        if (!msgBox) {
          msgBox = document.createElement('div');
          msgBox.className = 'form-status-msg';
          form.appendChild(msgBox);
        }
        msgBox.innerHTML = `
          <div style="background: #E8F5E9; color: #2E7D32; border: 1px solid #A5D6A7; padding: 14px 18px; border-radius: 6px; margin-top: 15px; font-weight: 500;">
            <i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. Our Bargarh engineering team will get in touch with you shortly.
          </div>
        `;
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }, 900);
    });
  });

  // --- 8. BIT ASSIST FLOATING CHAT WIDGET ---
  const bitBtn = document.querySelector('.bit-assist-btn');
  const bitBox = document.querySelector('.bit-assist-box');
  const bitClose = document.querySelector('.bit-assist-close');

  if (bitBtn && bitBox) {
    bitBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      bitBox.classList.toggle('open');
    });

    if (bitClose) {
      bitClose.addEventListener('click', function () {
        bitBox.classList.remove('open');
      });
    }

    document.addEventListener('click', function (e) {
      if (!bitBox.contains(e.target) && !bitBtn.contains(e.target)) {
        bitBox.classList.remove('open');
      }
    });
  }
});
