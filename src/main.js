/* ==========================================================================
   APS DESIGN SYSTEM — CLIENT LOGIC & INTERACTIONS (v1.0)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll State (transparent -> navy at 60px, solid on subpages)
  const nav = document.querySelector('.site-nav');
  const handleScroll = () => {
    if (!nav) return;
    if (document.body.classList.contains('page-subpage') || window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Toggle
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Staggered Scroll Entrance Animations (IntersectionObserver)
  const animatedElements = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once animated, unobserve to maintain performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // 4. Copy Email Address & Direct Mail Handler
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailText = document.getElementById('copy-email-text');
  if (copyEmailBtn && copyEmailText) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'sales@apsinox.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = email;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        const originalText = copyEmailText.textContent;
        copyEmailText.textContent = 'Email Copied!';
        copyEmailBtn.style.borderColor = 'var(--aps-gold)';
        setTimeout(() => {
          copyEmailText.textContent = originalText;
          copyEmailBtn.style.borderColor = '';
        }, 2500);
      } catch (err) {
        console.error('Failed to copy email', err);
      }
    });
  }

  // 5. Scroll to Top Trigger
  const scrollTopBtn = document.getElementById('scroll-to-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Section 04 Spares Auto-Animating Carousel (Image 1 Architecture)
  const carouselTrack = document.getElementById('spares-carousel-track');
  const prevBtn = document.getElementById('spares-prev-btn');
  const nextBtn = document.getElementById('spares-next-btn');
  const indicatorsContainer = document.getElementById('spares-carousel-indicators');
  const carouselWrapper = document.getElementById('spares-carousel');

  if (carouselTrack && carouselWrapper) {
    const cards = carouselTrack.querySelectorAll('.spares-team-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let autoPlayTimer = null;

    const getVisibleCount = () => {
      if (window.innerWidth <= 640) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 4;
    };

    const getMaxIndex = () => {
      const visible = getVisibleCount();
      return Math.max(0, totalCards - visible);
    };

    const createIndicators = () => {
      if (!indicatorsContainer) return;
      indicatorsContainer.innerHTML = '';
      const maxIdx = getMaxIndex();
      for (let i = 0; i <= maxIdx; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoPlay();
        });
        indicatorsContainer.appendChild(dot);
      }
    };

    const updateSlidePosition = () => {
      const card = cards[0];
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const gap = parseInt(window.getComputedStyle(carouselTrack).gap) || 24;
      const offset = currentIndex * (cardWidth + gap);
      carouselTrack.style.transform = `translateX(-${offset}px)`;

      if (indicatorsContainer) {
        const dots = indicatorsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    };

    const goToSlide = (index) => {
      const maxIdx = getMaxIndex();
      if (index > maxIdx) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = maxIdx;
      } else {
        currentIndex = index;
      }
      updateSlidePosition();
    };

    const nextSlide = () => {
      goToSlide(currentIndex + 1);
    };

    const prevSlide = () => {
      goToSlide(currentIndex - 1);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
    }

    const startAutoPlay = () => {
      if (!autoPlayTimer) {
        autoPlayTimer = setInterval(nextSlide, 3500);
      }
    };

    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    };

    const resetAutoPlay = () => {
      stopAutoPlay();
      startAutoPlay();
    };

    carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
    carouselWrapper.addEventListener('mouseleave', startAutoPlay);

    let startX = 0;
    let isSwiping = false;

    carouselWrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
      stopAutoPlay();
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
      startAutoPlay();
    }, { passive: true });

    window.addEventListener('resize', () => {
      createIndicators();
      goToSlide(Math.min(currentIndex, getMaxIndex()));
    });

    createIndicators();
    startAutoPlay();
  }

  // 7. Interactive Fast-RFQ & BOM Selector Desk
  const rfqWidget = document.getElementById('fast-rfq-widget');
  if (rfqWidget) {
    const categoryPills = rfqWidget.querySelectorAll('.rfq-pill');
    const brandChips = rfqWidget.querySelectorAll('.rfq-chip');
    const partInput = document.getElementById('rfq-part-input');
    const urgencySelect = document.getElementById('rfq-urgency-select');
    const locationInput = document.getElementById('rfq-location-input');
    const previewText = document.getElementById('rfq-preview-text');
    const waBtn = document.getElementById('rfq-whatsapp-btn');
    const emailBtn = document.getElementById('rfq-email-btn');
    const copyBtn = document.getElementById('rfq-copy-btn');
    const copyText = document.getElementById('rfq-copy-text');

    let selectedCategory = 'Sanitary Pumps & Mechanical Seals';
    let selectedBrand = 'Alfa Laval';

    const getFormattedBOM = () => {
      const part = partInput?.value?.trim() || 'Standard OEM rebuild kit / specification on file';
      const urgency = urgencySelect?.value || 'Standard Maintenance';
      const location = locationInput?.value?.trim() || 'UAE / GCC';

      return {
        category: selectedCategory,
        brand: selectedBrand,
        part,
        urgency,
        location
      };
    };

    const updateRFQLinks = () => {
      const bom = getFormattedBOM();
      if (previewText) {
        previewText.textContent = `${bom.category} • ${bom.brand} • Spec: ${bom.part} • ${bom.urgency} • Dest: ${bom.location}`;
      }

      const waMessage = `Hello APS Inox Engineering Desk,\nI would like to request an RFQ:\n• Category: ${bom.category}\n• Brand/OEM: ${bom.brand}\n• Part/Model/Spec: ${bom.part}\n• Urgency: ${bom.urgency}\n• Plant Location: ${bom.location}\n\nPlease confirm availability and technical quotation within 48 hours.`;

      if (waBtn) {
        waBtn.href = `https://wa.me/971553606698?text=${encodeURIComponent(waMessage)}`;
      }

      if (emailBtn) {
        const emailSubject = `RFQ Request: ${bom.category} [${bom.brand}] - ${bom.urgency}`;
        const emailBody = `Dear APS Inox Engineering Desk,\n\nPlease provide a formal technical quotation and availability for the following inquiry:\n\n1. Equipment Category: ${bom.category}\n2. Target Manufacturer / OEM: ${bom.brand}\n3. Part Number / Model / Capacity: ${bom.part}\n4. Urgency Level: ${bom.urgency}\n5. Plant Delivery Destination: ${bom.location}\n\nService Level: Target 48-Hour RFQ Response\n\nKind regards,\n[Your Name / Company / Contact Phone]`;
        emailBtn.href = `mailto:sales@apsinox.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      }
    };

    categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        categoryPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-pressed', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
        selectedCategory = pill.getAttribute('data-category') || pill.textContent.trim();
        updateRFQLinks();
      });
    });

    brandChips.forEach(chip => {
      chip.addEventListener('click', () => {
        brandChips.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        selectedBrand = chip.getAttribute('data-brand') || chip.textContent.trim();
        updateRFQLinks();
      });
    });

    if (partInput) partInput.addEventListener('input', updateRFQLinks);
    if (urgencySelect) urgencySelect.addEventListener('change', updateRFQLinks);
    if (locationInput) locationInput.addEventListener('input', updateRFQLinks);

    if (copyBtn && copyText) {
      copyBtn.addEventListener('click', async () => {
        const bom = getFormattedBOM();
        const textToCopy = `APS Inox RFQ Inquiry:\n• Category: ${bom.category}\n• Brand/OEM: ${bom.brand}\n• Part/Model: ${bom.part}\n• Urgency: ${bom.urgency}\n• Destination: ${bom.location}\nTarget Desk: sales@apsinox.com | +971 553 606698`;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            const ta = document.createElement('textarea');
            ta.value = textToCopy;
            ta.style.position = 'fixed';
            ta.style.left = '-999999px';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            ta.remove();
          }
          const orig = copyText.textContent;
          copyText.textContent = 'Copied!';
          copyBtn.style.borderColor = 'var(--aps-gold)';
          setTimeout(() => {
            copyText.textContent = orig;
            copyBtn.style.borderColor = '';
          }, 2500);
        } catch (e) {
          console.error('Failed to copy', e);
        }
      });
    }

    // Initialize links on load
    updateRFQLinks();
  }
});

// ── WhatsApp float: hide when #contact is in viewport ──────────────────────
(function () {
  const waBtn = document.querySelector('.wa-float');
  const contactSection = document.getElementById('contact');
  if (!waBtn || !contactSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          waBtn.classList.add('wa-float--hidden');
        } else {
          waBtn.classList.remove('wa-float--hidden');
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(contactSection);
})();
