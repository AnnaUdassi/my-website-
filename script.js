document.addEventListener('DOMContentLoaded', function() {
    // Get all interest icons and content sections
    const interestIcons = document.querySelectorAll('.interest-icon');
    const contentSections = document.querySelectorAll('.content');
    
    // Add click event listeners to each interest icon
    interestIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Get the interest type from data attribute
            const interest = this.getAttribute('data-interest');
            
            // Remove active class from all icons and content sections
            interestIcons.forEach(i => i.classList.remove('active'));
            contentSections.forEach(section => {
                section.classList.remove('active');
                section.classList.remove('slide-in');
            });
            
            // Add active class to the clicked icon
            this.classList.add('active');
            
            // Add bounce animation to the icon
            this.classList.add('bounce');
            
            // Remove bounce animation after it completes
            setTimeout(() => {
                this.classList.remove('bounce');
            }, 1000);
            
            // Find and activate corresponding content section
            const contentSection = document.getElementById(interest);
            if (contentSection) {
                contentSection.classList.add('active');
                contentSection.classList.add('slide-in');
            }
        });
    });
    
    // Initialize parallax scrolling effect
    const parallaxElements = document.querySelectorAll('.parallax-container');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const offset = element.offsetTop;
            const distance = (scrollTop - offset) * speed;
            
            if (element.querySelector('.parallax-bg')) {
                element.querySelector('.parallax-bg').style.transform = `translateY(${distance}px)`;
            }
        });
    });
    
    // Create parallax background elements
    const contentSection = document.querySelector('.content-section');
    createParallaxBackground(contentSection);
    
    // Apply random subtle animations to content images on scroll
    const contentImages = document.querySelectorAll('.content-img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1.02)';
                entry.target.style.transition = 'transform 0.6s ease-in-out';
                
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1)';
                }, 600);
            }
        });
    }, { threshold: 0.5 });
    
    contentImages.forEach(image => {
        observer.observe(image);
    });
});

// Function to create parallax background elements
function createParallaxBackground(container) {
    // Create background layers for parallax effect
    const bg1 = document.createElement('div');
    bg1.classList.add('parallax-bg', 'parallax-bg-1');
    bg1.style.backgroundImage = 'url("https://via.placeholder.com/1500x800")';
    
    const bg2 = document.createElement('div');
    bg2.classList.add('parallax-bg', 'parallax-bg-2');
    bg2.style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.9))';
    
    // Add background layers to container
    container.prepend(bg2);
    container.prepend(bg1);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to elements
document.querySelectorAll('.interest-icon, .social-links a').forEach(element => {
    element.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    element.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add a simple loader animation
window.addEventListener('load', function() {
    const body = document.body;
    body.classList.add('loaded');
    
    // Add initial animation to the active content section
    const activeContent = document.querySelector('.content.active');
    if (activeContent) {
        activeContent.classList.add('slide-in');
    }
});