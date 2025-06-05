const burger = document.getElementById('burger');
const navbar = document.getElementById('navbar');
burger.addEventListener('click', () => {
  navbar.classList.toggle('open');
});


/* Slider */
// ----- SLIDER HOW IT WORKS -----
const slides = document.querySelectorAll('#howSlider .slide');
const prevBtn = document.getElementById('howPrev');
const nextBtn = document.getElementById('howNext');
const bulletsContainer = document.getElementById('howBullets');

let currentSlide = 0;

// Génère les bullets
if (bulletsContainer) {
  slides.forEach((_, i) => {
    let b = document.createElement('div');
    b.classList.add('bullet');
    if(i === 0) b.classList.add('active');
    b.addEventListener('click', () => showSlide(i));
    bulletsContainer.appendChild(b);
  });
}

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === n);
    bulletsContainer.children[i].classList.toggle('active', i === n);
  });
  currentSlide = n;
}
prevBtn.addEventListener('click', () => {
  let n = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(n);
});
nextBtn.addEventListener('click', () => {
  let n = (currentSlide + 1) % slides.length;
  showSlide(n);
});

// Optionnel : swipe mobile
let touchStartX = null;
slides[0].parentElement.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
slides[0].parentElement.addEventListener('touchend', e => {
  if (touchStartX !== null) {
    let dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) prevBtn.click();
    else if (dx < -50) nextBtn.click();
    touchStartX = null;
  }
});


/* Impact  */
// ----- Animation chiffres impact -----
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat .number');
    numbers.forEach(num => {
      const target = +num.dataset.count;
      let count = 0;
      const speed = Math.max(1, Math.floor(target / 60));
      const update = () => {
        count += speed;
        if (count > target) count = target;
        num.textContent = count.toLocaleString();
        if (count < target) requestAnimationFrame(update);
      };
      update();
    });
  }
  window.addEventListener('scroll', function checkImpactVisible() {
    const section = document.querySelector('.impact');
    if (section && section.getBoundingClientRect().top < window.innerHeight * 0.8) {
      animateNumbers();
      window.removeEventListener('scroll', checkImpactVisible);
    }
  });
  