// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const logoBtn = document.getElementById('logo-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (logoBtn && mobileMenu) {
        // Function to open/close menu
        function toggleMenu(forceClose = false) {
            const isOpen = mobileMenu.classList.contains('max-h-screen');
            if (isOpen || forceClose) {
                mobileMenu.classList.remove('max-h-screen', 'opacity-100');
                mobileMenu.classList.add('max-h-0', 'opacity-0');
            } else {
                mobileMenu.classList.remove('max-h-0', 'opacity-0');
                mobileMenu.classList.add('max-h-screen', 'opacity-100');
            }
        }

        // Logo click handler (only on mobile)
        logoBtn.addEventListener('click', function(e) {
            // Only toggle menu on mobile screens
            if (window.innerWidth < 768) {
                e.preventDefault();
                toggleMenu();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !logoBtn.contains(e.target)) {
                toggleMenu(true);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 76;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('max-h-screen')) {
                        mobileMenu.classList.remove('max-h-screen', 'opacity-100');
                        mobileMenu.classList.add('max-h-0', 'opacity-0');
                        const iconPath = mobileMenuBtn.querySelector('svg path');
                        if (iconPath) iconPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
                    }
                }
            }
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.innerHTML = '<span class="material-icons">arrow_upward</span>';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add animation on scroll
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.content-block, .dress-card, .service-block');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add hover effect to images
    const contentImages = document.querySelectorAll('.content-image, .dress-image, .hero-image');
    contentImages.forEach(img => {
        img.classList.add('image-hover-zoom');
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase().trim();
                if (searchTerm) {
                    performSearch(searchTerm);
                }
            }
        });
    }
    
    function performSearch(term) {
        // Simple search implementation
        const sections = document.querySelectorAll('.content-block, .service-block');
        const header = document.querySelector('header');
        let found = false;
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes(term)) {
                const headerHeight = header ? header.offsetHeight : 76;
                const targetPosition = section.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Highlight the section briefly
                section.style.backgroundColor = 'rgba(220, 20, 60, 0.1)';
                setTimeout(() => {
                    section.style.backgroundColor = '';
                }, 2000);
                
                found = true;
                return;
            }
        });
        
        if (!found) {
            alert(`Không tìm thấy kết quả cho: "${term}"`);
        }
    }
    
    // Button click handlers
    const buttons = document.querySelectorAll('.btn-danger');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            // Create a simple modal for button actions
            showModal(buttonText);
        });
    });
    
    function showModal(action) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">
                    <span class="material-icons">close</span>
                </button>
                <h2 style="margin-bottom: 16px; color: var(--text-dark);">${action}</h2>
                <p style="margin-bottom: 24px; color: var(--text-gray);">
                    Cảm ơn bạn đã quan tâm đến dịch vụ của chúng tôi. 
                    Vui lòng liên hệ qua số điện thoại <strong>0987.675.456</strong> 
                    hoặc email <strong>Aodaiviet345@gmail.com</strong> để được tư vấn chi tiết.
                </p>
                <button class="btn-danger" style="width: 100%;">Đóng</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.modal-close');
        const actionBtn = modal.querySelector('.btn-danger');
        
        closeBtn.addEventListener('click', () => modal.remove());
        actionBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        modal.addEventListener('click', () => {
            document.body.style.overflow = '';
        });
    }
    
    // Lazy loading for images (optional enhancement)
    const images = document.querySelectorAll('img[src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Add active state to navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + (header ? header.offsetHeight : 76) + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active navigation item
        const navLinks = document.querySelectorAll('.nav a, .dropdown-menu a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Dropdown behavior for desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                const menu = this.querySelector('.dropdown-menu');
                const isVisible = menu.style.display === 'block';
                
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(m => {
                    m.style.display = 'none';
                });
                
                // Toggle current dropdown
                menu.style.display = isVisible ? 'none' : 'block';
            }
        });
    });
    
    // Form validation (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Expose utility functions globally
    window.AoDaiViet = {
        showModal,
        performSearch,
        validateEmail
    };
    
    console.log('AoDaiViet website initialized successfully!');
});
