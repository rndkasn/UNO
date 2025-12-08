// ===== ANIMASI SCROLL ===== 
document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer untuk animasi saat elemen masuk viewport
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe semua elemen yang ingin di-animate
  document.querySelectorAll('.nama-kelompok li, .step, .info-card, .feature-card').forEach(el => {
    el.classList.add('fade-in-hidden');
    observer.observe(el);
  });
});

// ===== SMOOTH SCROLL ===== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== HEADER ANIMATION ===== 
const header = document.querySelector('.header');
const headerTitle = document.querySelector('.header h1');
const headerSubtitle = document.querySelector('.header .subtitle');

// Animasi fade-in saat halaman dimuat
window.addEventListener('load', function() {
  headerTitle.style.animation = 'slideDown 0.6s ease-out';
  headerSubtitle.style.animation = 'slideDown 0.8s ease-out 0.2s both';
});

// ===== SCROLL PARALLAX EFFECT ===== 
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  
  // Parallax pada header
  if (header) {
    header.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
  }
});

// ===== BUTTON HOVER EFFECT ===== 
const btnPrimary = document.querySelector('.btn-primary');
if (btnPrimary) {
  btnPrimary.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });

  btnPrimary.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
}

// ===== COUNTER ANIMATION ===== 
function animateCounter(element, target, duration = 1000) {
  let current = 0;
  const increment = target / (duration / 10);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 10);
}

// Animate step numbers saat visible
const stepNumbers = document.querySelectorAll('.step-number');
const counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const number = parseInt(entry.target.textContent);
      animateCounter(entry.target, number, 800);
    }
  });
}, { threshold: 0.5 });

stepNumbers.forEach(number => counterObserver.observe(number));

// ===== DYNAMIC NAV HIGHLIGHT ===== 
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('class');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
}

// ===== DARK MODE TOGGLE (Optional) ===== 
function initDarkMode() {
  const darkModeBtn = document.querySelector('.dark-mode-toggle');
  const isDarkMode = localStorage.getItem('darkMode');

  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }

  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
  }
}

initDarkMode();

// ===== MOBILE MENU (jika ada) ===== 
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Close menu saat link diklik
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });
  }
}

initMobileMenu();

// ===== LAZY LOADING IMAGES ===== 
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// ===== ADD ANIMATIONS CSS ===== 
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in-hidden {
    opacity: 0;
    transform: translateY(20px);
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }

  /* Stagger animation untuk list items */
  .nama-kelompok li:nth-child(1) { animation-delay: 0s; }
  .nama-kelompok li:nth-child(2) { animation-delay: 0.1s; }
  .nama-kelompok li:nth-child(3) { animation-delay: 0.2s; }
  .nama-kelompok li:nth-child(4) { animation-delay: 0.3s; }
  .nama-kelompok li:nth-child(5) { animation-delay: 0.4s; }
  .nama-kelompok li:nth-child(6) { animation-delay: 0.5s; }

  .step:nth-child(1) { animation-delay: 0s; }
  .step:nth-child(2) { animation-delay: 0.1s; }
  .step:nth-child(3) { animation-delay: 0.2s; }
  .step:nth-child(4) { animation-delay: 0.3s; }

  .feature-card:nth-child(1) { animation-delay: 0s; }
  .feature-card:nth-child(2) { animation-delay: 0.1s; }
  .feature-card:nth-child(3) { animation-delay: 0.2s; }
  .feature-card:nth-child(4) { animation-delay: 0.3s; }

  /* Dark mode styles */
  body.dark-mode {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  }

  body.dark-mode .container {
    background-color: #0f3460;
    color: #e0e0e0;
  }

  body.dark-mode .header,
  body.dark-mode .cta-section {
    background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
  }

  body.dark-mode .nama-kelompok {
    background-color: #1a1a2e;
    border-bottom-color: #16213e;
  }

  body.dark-mode .nama-kelompok li,
  body.dark-mode .step,
  body.dark-mode .info-card {
    background-color: #16213e;
    color: #e0e0e0;
  }

  body.dark-mode .step h3,
  body.dark-mode .info-card h3 {
    color: #e94560;
  }

  body.dark-mode .project-info {
    background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
  }

  body.dark-mode .feature-card {
    background: #16213e;
  }
`;
document.head.appendChild(style);

// ===== CONSOLE LOG ===== 
console.log('✨ Jemuran Otomatis Berbasis Arduino - Website Loaded');
console.log('📱 Version: 1.0.0');
console.log('👨‍💻 Developed with ❤️');