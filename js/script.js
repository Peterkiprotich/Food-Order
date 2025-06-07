// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu button
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    nav.insertBefore(mobileMenuBtn, nav.firstChild);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('mobile-menu-open');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('mobile-menu-open');
        });
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.reviews-client-E, .reviews-client-H');
const testimonialContainer = document.querySelector('.reviews-view');

function showTestimonial(index) {
    // Adjust for mobile view
    const itemsToShow = window.innerWidth < 768 ? 1 : 2;
    
    // Calculate the transform value
    const transformValue = -index * (100 / itemsToShow) + '%';
    testimonialContainer.style.transform = `translateX(${transformValue})`;
    
    // Update current testimonial index
    currentTestimonial = index;
}

function nextTestimonial() {
    const itemsToShow = window.innerWidth < 768 ? 1 : 2;
    const maxIndex = testimonials.length - itemsToShow;
    
    if (currentTestimonial < maxIndex) {
        showTestimonial(currentTestimonial + 1);
    } else {
        showTestimonial(0); // Loop back to first
    }
}

function prevTestimonial() {
    const itemsToShow = window.innerWidth < 768 ? 1 : 2;
    
    if (currentTestimonial > 0) {
        showTestimonial(currentTestimonial - 1);
    } else {
        showTestimonial(testimonials.length - itemsToShow); // Loop to last
    }
}

// Partners Carousel
const partnersTrack = document.getElementById('partnersTrack');
const partnerItems = document.querySelectorAll('.partner-item');
let partnerPosition = 0;
const partnerItemWidth = partnerItems[0].offsetWidth;
const partnersVisible = Math.floor(document.querySelector('.partners-slider').offsetWidth / partnerItemWidth);

function movePartners(direction) {
    const trackWidth = partnerItems.length * partnerItemWidth;
    const maxPosition = -(trackWidth - (partnersVisible * partnerItemWidth));
    
    if (direction === 'next') {
        partnerPosition = Math.max(partnerPosition - partnerItemWidth, maxPosition);
    } else {
        partnerPosition = Math.min(partnerPosition + partnerItemWidth, 0);
    }
    
    partnersTrack.style.transform = `translateX(${partnerPosition}px)`;
}

// Auto-rotate partners
let partnerInterval = setInterval(() => movePartners('next'), 3000);

// Pause on hover
document.querySelector('.partners-slider').addEventListener('mouseenter', () => {
    clearInterval(partnerInterval);
});

document.querySelector('.partners-slider').addEventListener('mouseleave', () => {
    partnerInterval = setInterval(() => movePartners('next'), 3000);
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
document.querySelectorAll('details').forEach((detail, index) => {
    // Close all FAQs except first one on mobile
    if (window.innerWidth < 768 && index !== 0) {
        detail.removeAttribute('open');
    }
    
    detail.addEventListener('toggle', function() {
        if (this.open && window.innerWidth < 768) {
            // Close other FAQs when opening one on mobile
            document.querySelectorAll('details').forEach(otherDetail => {
                if (otherDetail !== this) {
                    otherDetail.removeAttribute('open');
                }
            });
        }
    });
});

// Responsive Adjustments
function handleResize() {
    // Reset testimonial position on resize
    showTestimonial(currentTestimonial);
    
    // Adjust partners carousel
    partnerPosition = 0;
    partnersTrack.style.transform = 'translateX(0)';
    
    // Handle FAQ accordions on mobile
    document.querySelectorAll('details').forEach((detail, index) => {
        if (window.innerWidth < 768 && index !== 0) {
            detail.removeAttribute('open');
        } else if (window.innerWidth >= 768) {
            detail.setAttribute('open', '');
        }
    });
}

window.addEventListener('resize', handleResize);

// Initialize
showTestimonial(0);
handleResize();