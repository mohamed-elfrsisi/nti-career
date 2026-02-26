document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // Intersection Observer for Scroll Animations
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate__animated", "animate__fadeInUp");
        entry.target.style.opacity = "1";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe category cards for scroll animation
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Observe section header
  const sectionHeader = document.querySelector(".section-header");
  if (sectionHeader) {
    observer.observe(sectionHeader);
  }

  // ==========================================
  // Carousel Touch/Swipe Support Enhancement
  // ==========================================
  const carousel = document.getElementById("categoriesCarousel");
  if (carousel) {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    carousel.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    carousel.addEventListener("touchend", handleTouchEnd, { passive: true });

    function handleTouchStart(e) {
      touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      const carouselInstance = bootstrap.Carousel.getInstance(carousel);

      if (!carouselInstance) return;

      if (swipeDistance < -minSwipeDistance) {
        // Swipe left - next slide
        carouselInstance.next();
      } else if (swipeDistance > minSwipeDistance) {
        // Swipe right - previous slide
        carouselInstance.prev();
      }
    }
  }

  // ==========================================
  // Navbar Scroll Effect
  // ==========================================
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add background blur on scroll
    if (currentScroll > 100) {
      navbar.style.background = "rgba(0, 51, 102, 0.95)";
      navbar.style.backdropFilter = "blur(10px)";
      navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
    } else {
      navbar.style.background = "transparent";
      navbar.style.backdropFilter = "none";
      navbar.style.boxShadow = "none";
    }

    lastScroll = currentScroll;
  });

  // ==========================================
  // Search Form Interaction
  // ==========================================
  const searchForm = document.querySelector(".search-form");
  if (searchForm) {
    const searchInputs = searchForm.querySelectorAll(
      ".form-control, .form-select",
    );

    searchInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.closest(".input-group").style.transform = "scale(1.02)";
        this.closest(".input-group").style.transition = "transform 0.3s ease";
      });

      input.addEventListener("blur", function () {
        this.closest(".input-group").style.transform = "scale(1)";
      });
    });
  }

  // ==========================================
  // PARTNERS MARQUEE
  // ==========================================

  const partnersMarquee = document.getElementById("partnersMarquee");

  if (partnersMarquee) {
    // Clone logos for infinite seamless loop
    const logos = partnersMarquee.innerHTML;
    partnersMarquee.innerHTML = logos + logos;

    // Pause on hover effect
    const wrapper = document.querySelector(".partners-marquee-wrapper");

    wrapper.addEventListener("mouseenter", () => {
      partnersMarquee.style.animationPlayState = "paused";
    });

    wrapper.addEventListener("mouseleave", () => {
      partnersMarquee.style.animationPlayState = "running";
    });

    // Dynamic speed based on scroll
    let lastScrollY = window.scrollY;
    let baseSpeed = 50; // seconds  

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      const scrollSpeed = Math.abs(currentScrollY - lastScrollY);

      if (scrollSpeed > 0.222) { //5
        // Speed up when scrolling
        partnersMarquee.style.animationDuration = `${baseSpeed * 5}s`;
      } else {
        // Normal speed
        partnersMarquee.style.animationDuration = `${baseSpeed}s`;
      }

      lastScrollY = currentScrollY;
    });

    // Click on partner logo
    document.querySelectorAll(".partner-logo").forEach((logo) => {
      logo.addEventListener("click", function () {
        const companyName = this.querySelector("img").alt;
        // Could open modal or redirect to company page
        console.log(`Clicked on ${companyName}`);
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);
      });
    });
  }

  // ==========================================
  // Category Card Click Handler
  // ==========================================
  const categoryCardsClick = document.querySelectorAll(".category-card");
  categoryCardsClick.forEach((card) => {
    card.addEventListener("click", function (e) {
      // If not clicking the link directly, trigger the link
      if (!e.target.closest(".category-link")) {
        const link = this.querySelector(".category-link");
        if (link) {
          // Add click animation
          this.style.transform = "scale(0.98)";
          setTimeout(() => {
            this.style.transform = "";
            // Simulate navigation (replace with actual URL)
            console.log("Navigating to:", link.getAttribute("href"));
          }, 150);
        }
      }
    });
  });

  // ==========================================
  // Smooth Scroll for Navigation Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ==========================================
  // Counter Animation for Hero Badge
  // ==========================================
  const badgeCount = document.querySelector(".badge-count");
  if (badgeCount) {
    const targetNumber = parseInt(badgeCount.textContent.replace(/,/g, ""));
    animateCounter(badgeCount, 0, targetNumber, 2000);
  }

  function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * (end - start) + start);
      element.textContent = currentCount.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
});

// section 3
// Save button functionality for Latest Jobs Section
document.querySelectorAll('.btn-save').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('saved');
        const icon = this.querySelector('i');
        if (this.classList.contains('saved')) {
            icon.classList.remove('fa-regular', 'fa-bookmark');
            icon.classList.add('fa-solid', 'fa-bookmark');
            // Optional: Add a subtle animation
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        } else {
            icon.classList.remove('fa-solid', 'fa-bookmark');
            icon.classList.add('fa-regular', 'fa-bookmark');
        }
    });
});

// Initialize carousel with touch support for mobile
document.addEventListener('DOMContentLoaded', function() {
    const jobsCarousel = document.getElementById('jobsCarousel');
    if (jobsCarousel) {
        // Enable swipe on mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        jobsCarousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        jobsCarousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next slide
                bootstrap.Carousel.getInstance(jobsCarousel).next();
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right - previous slide
                bootstrap.Carousel.getInstance(jobsCarousel).prev();
            }
        }
    }
});
// ==========================================
// LATEST JOBS DUAL CAROUSEL FUNCTIONALITY
// ==========================================
// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        const cards = document.querySelectorAll('.track-card');
        
        cards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});
// ==========================================
// CONTACT FORM HANDLING
// ==========================================

const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".btn-submit");
    const originalText = submitBtn.innerHTML;

    // Validation
    let isValid = true;
    const requiredFields = this.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      const errorSpan = field.parentElement.querySelector(".form-error");

      if (!field.value.trim()) {
        isValid = false;
        field.classList.add("error");
        if (errorSpan) errorSpan.classList.add("show");
      } else {
        field.classList.remove("error");
        if (errorSpan) errorSpan.classList.remove("show");
      }
    });

    // Email validation
    const emailField = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField && !emailRegex.test(emailField.value)) {
      isValid = false;
      emailField.classList.add("error");
      emailField.parentElement
        .querySelector(".form-error")
        .classList.add("show");
    }

    if (!isValid) return;

    // Loading state
    submitBtn.classList.add("loading");
    submitBtn.innerHTML = "جاري الإرسال...";

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Success
    contactForm.style.display = "none";
    successMessage.classList.add("show");

    // Reset button
    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = originalText;
  });

  // Real-time validation
  const inputs = contactForm.querySelectorAll(
    ".form-input, .form-textarea, .form-select",
  );
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.classList.add("error");
        this.parentElement.querySelector(".form-error")?.classList.add("show");
      } else {
        this.classList.remove("error");
        this.parentElement
          .querySelector(".form-error")
          ?.classList.remove("show");
      }
    });

    input.addEventListener("input", function () {
      this.classList.remove("error");
      this.parentElement.querySelector(".form-error")?.classList.remove("show");
    });
  });
}

// Reset form function
window.resetForm = function () {
  if (contactForm && successMessage) {
    contactForm.reset();
    contactForm.style.display = "flex";
    successMessage.classList.remove("show");
  }
};
        // ==========================================
        // FOOTER FUNCTIONALITY
        // ==========================================

        // Newsletter Form
        const newsletterForm = document.getElementById("newsletterForm");
        if (newsletterForm) {
            newsletterForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const btn = this.querySelector(".newsletter-btn");
                const input = this.querySelector(".newsletter-input");

                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
                    btn.style.background = "#28a745";
                    input.value = "";

                    setTimeout(() => {
                        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
                        btn.style.background = "";
                    }, 2000);
                }, 1500);
            });
        }

        // Footer Stats Counter
        const footerStats = document.querySelectorAll(".footer-stat-number");
        const footerStatsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target;
                        const finalNumber = parseInt(target.getAttribute("data-count"));
                        const suffix = target.parentElement.textContent.includes("%") ? "%" : "+";

                        animateCounter(target, 0, finalNumber, 2000, suffix);
                        footerStatsObserver.unobserve(target);
                    }
                });
            },
            { threshold: 0.5 },
        );

        footerStats.forEach((stat) => footerStatsObserver.observe(stat));

        // Back to Top Button
        const backToTop = document.getElementById("backToTop");
        if (backToTop) {
            window.addEventListener("scroll", () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add("show");
                } else {
                    backToTop.classList.remove("show");
                }
            });

            backToTop.addEventListener("click", (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }

        // Enhanced Counter Function with suffix
        function animateCounter(element, start, end, duration, suffix = "") {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentCount = Math.floor(progress * (end - start) + start);
                element.textContent =
                    currentCount.toLocaleString() + (suffix === "%" ? "%" : "+");
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }