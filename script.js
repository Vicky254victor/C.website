// ===== HERO SLIDESHOW =====
let slideIndex = 0;
let slideTimer;

function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (slides.length === 0) return;

  slideIndex = n;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slides[slideIndex].classList.add('active');
  if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

function nextSlide() {
  showSlide(slideIndex + 1);
}

function prevSlide() {
  showSlide(slideIndex - 1);
}

function goToSlide(n) {
  showSlide(n);
  resetTimer();
}

function resetTimer() {
  clearInterval(slideTimer);
  slideTimer = setInterval(nextSlide, 5000);
}

// ===== CART DRAWER =====
function initCartDrawer() {
  const cartBtn = document.getElementById('cart-btn');
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.querySelector('.cart-drawer__overlay');
  const closeBtn = document.querySelector('.cart-close');

  if (cartBtn && drawer) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeCart);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCart);
  }
}

function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

// ===== LEFT SIDE MENU =====
function initSideMenu() {
  const menu = document.getElementById('side-menu');
  const trigger = document.getElementById('menu-trigger');
  const overlay = menu?.querySelector('.side-menu__overlay');
  const closeBtn = menu?.querySelector('.side-menu__close');

  function openMenu() {
    if (menu) {
      menu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (menu) {
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (trigger) trigger.addEventListener('click', openMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  menu?.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (link.hash && document.getElementById(link.hash.slice(1))) {
        closeMenu();
      }
    });
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu?.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Stagger animation for menu links
  const links = menu?.querySelectorAll('.side-menu__links li');
  if (links) {
    links.forEach((link, i) => {
      link.style.opacity = '0';
      link.style.transform = 'translateX(-12px)';
      link.style.transition = `opacity 0.3s ease ${i * 0.03}s, transform 0.3s ease ${i * 0.03}s`;
    });

    // Observe when menu opens to animate in
    const observer = new MutationObserver(() => {
      if (menu.classList.contains('is-open')) {
        links.forEach(link => {
          link.style.opacity = '1';
          link.style.transform = 'translateX(0)';
        });
      } else {
        links.forEach(link => {
          link.style.opacity = '0';
          link.style.transform = 'translateX(-12px)';
        });
      }
    });
    observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
  }
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== WISHLIST TOGGLE =====
function initWishlist() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
    });
  });
}

// ===== IMAGE LAZY LOAD PLACEHOLDER =====
function initImageLoad() {
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
      img.parentElement?.classList?.add('is-image-loaded');
    } else {
      img.addEventListener('load', () => {
        img.parentElement?.classList?.add('is-image-loaded');
      });
      img.addEventListener('error', () => {
        // Keep placeholder on error
      });
    }
  });
}

// ===== SEARCH FOCUS ANIMATION =====
function initSearch() {
  const searchInput = document.querySelector('.search-container input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchInput.parentElement.classList.add('focused');
    });
    searchInput.addEventListener('blur', () => {
      searchInput.parentElement.classList.remove('focused');
    });
  }
}

// ===== PRODUCT BUTTON RIPPLE =====
function initButtons() {
  document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Add brief pressed animation
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
    });
  });

  // Hero shop button
  document.querySelectorAll('.hero-shop-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productsSection = document.querySelector('.shop-latest');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== COLOR DOT SELECT =====
function initColorDots() {
  document.querySelectorAll('.product-card').forEach(card => {
    const dots = card.querySelectorAll('.color-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        dots.forEach(d => d.classList.remove('selected'));
        dot.classList.add('selected');
      });
    });
  });
}

// ===== SMOOTH SCROLL FOR NAV LINKS =====
function initSmoothScroll() {
  document.querySelectorAll('.nav-left ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const productsSection = document.querySelector('.shop-latest');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== HEADER SCROLL SHADOW =====
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
    }
  }, { passive: true });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Start slideshow
  showSlide(0);
  slideTimer = setInterval(nextSlide, 5000);

  // Slideshow arrow buttons
  const prevBtn = document.querySelector('.slideshow-nav.prev');
  const nextBtn = document.querySelector('.slideshow-nav.next');
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });

  // Dot navigation
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Init all modules
  initCartDrawer();
  initSideMenu();
  initScrollProgress();
  initBackToTop();
  initWishlist();
  initImageLoad();
  initSearch();
  initButtons();
  initColorDots();
  initSmoothScroll();
  initHeaderScroll();
});
