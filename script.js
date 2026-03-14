/**
 * Premium Portfolio Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Navigation Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between menu and close
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if(mobileToggle) {
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
    });

    // --- 2. Sticky Navbar & Active Link Update on Scroll ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-link');
    const scrollBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Sticky Navbar Toggle
        if (navbar && window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (scrollBtn) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.pointerEvents = 'auto';
            }
        } else if (navbar) {
            navbar.classList.remove('scrolled');
            if (scrollBtn) {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.pointerEvents = 'none';
            }
        }

        // Active Link Update
        if(sections.length > 0 && navItems.length > 0) {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `index.html#${current}` || item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        }
    });

    // --- 3. Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    if (revealElements.length > 0) {
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // --- 4. Scroll to Top Button ---
    if (scrollBtn) {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.pointerEvents = 'none';
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 5. Image Modal Viewer Logic ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const modalClose = document.querySelector(".modal-close-btn");
    const viewButtons = document.querySelectorAll(".view-project-btn");
    
    if (modal && modalImg && viewButtons.length > 0) {
        // Open Modal when "View Project" is clicked
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = btn.getAttribute('data-imgsrc');
                if (imgSrc) {
                    modal.style.display = "block";
                    modalImg.src = imgSrc;
                    // Disable background scrolling when modal is open
                    document.body.style.overflow = "hidden";
                    // Scroll modal body to top automatically for a fresh view
                    const modalBody = document.querySelector(".modal-body");
                    if(modalBody) modalBody.scrollTop = 0;
                }
            });
        });

        // Close Modal
        const closeModal = () => {
            modal.style.display = "none";
            // Re-enable background scrolling
            document.body.style.overflow = "auto";
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        // Close when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains("modal-content-wrapper")) {
                closeModal();
            }
        });

        // Close on ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.style.display === "block") {
                closeModal();
            }
        });
    }

    // --- 6. Contact Form Mailto Logic ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Only strictly override if we want to manually construct mailto via JS
            // By default `action="mailto:"` works in HTML, but customizing it via JS allows formatting the body text beautifully.
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const bodyContent = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            const mailtoUrl = `mailto:contact@muzammilali.site?subject=${encodeURIComponent(subject)}&body=${bodyContent}`;
            
            // Trigger mail client
            window.location.href = mailtoUrl;

            // UI Feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = `Opening Mail Client <i class="ph ph-check-circle"></i>`;
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.add('btn-primary');
                btn.classList.remove('btn-secondary');
                contactForm.reset();
            }, 3500);
        });
    }

    // --- 7. Disable Right Click & Drag (Especially on Images) ---
    document.addEventListener('contextmenu', (e) => {
        // Prevent right click on all images, or optionally on the whole document
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // To be extra strict and disable on the whole page as requested:
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Disable Dragging of Images
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

});
