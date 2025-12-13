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

// Carousel and Category Selection for theloai.html
if (document.querySelector('.ao-dai-button, .ao-dai-button-mobile')) {
    document.addEventListener('DOMContentLoaded', function() {
        const buttons = document.querySelectorAll('.ao-dai-button');
        const detailSection = document.querySelector('.flex.flex-col.gap-\\[16px\\].items-center.pb-\\[20px\\]');
        
        // Carousel functionality
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        const carouselSlides = document.querySelectorAll('.carousel-slide');
        const prevButton = document.querySelector('.carousel-prev');
        const nextButton = document.querySelector('.carousel-next');
        const dots = document.querySelectorAll('.carousel-dot');
        
        let currentSlide = 0;
        let autoSlideInterval;
        let touchStartX = 0;
        let touchEndX = 0;
        
        function updateCarousel() {
            carouselWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Re-query dots to get latest ones (in case carousel was rebuilt)
            const currentDots = document.querySelectorAll('.carousel-dot');
            
            // Update dots
            currentDots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-black');
                } else {
                    dot.classList.remove('bg-black');
                    dot.classList.add('bg-gray-300');
                }
            });
        }
        
        function nextSlide() {
            const currentSlides = document.querySelectorAll('.carousel-slide');
            currentSlide = (currentSlide + 1) % currentSlides.length;
            updateCarousel();
        }
        
        function prevSlide() {
            const currentSlides = document.querySelectorAll('.carousel-slide');
            currentSlide = (currentSlide - 1 + currentSlides.length) % currentSlides.length;
            updateCarousel();
        }
        
        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }
        
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, 5000); // Auto chuyển sau 5 giây
        }
        
        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }
        
        // Event listeners for navigation buttons
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                prevSlide();
                startAutoSlide();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                nextSlide();
                startAutoSlide();
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goToSlide(index);
                startAutoSlide();
            });
        });
        
        // Touch/Swipe support
        const carouselContainer = document.querySelector('.carousel-container');
        
        if (carouselContainer) {
            carouselContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoSlide();
            }, { passive: true });
            
            carouselContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoSlide();
            }, { passive: true });
            
            // Mouse drag support for desktop
            let isDragging = false;
            let startX = 0;
            
            carouselContainer.addEventListener('mousedown', function(e) {
                isDragging = true;
                startX = e.pageX;
                stopAutoSlide();
                carouselContainer.style.cursor = 'grabbing';
            });
            
            carouselContainer.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                e.preventDefault();
            });
            
            carouselContainer.addEventListener('mouseup', function(e) {
                if (!isDragging) return;
                isDragging = false;
                const endX = e.pageX;
                const diff = startX - endX;
                
                if (Math.abs(diff) > 50) { // Minimum swipe distance
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
                
                startAutoSlide();
                carouselContainer.style.cursor = 'grab';
            });
            
            carouselContainer.addEventListener('mouseleave', function() {
                if (isDragging) {
                    isDragging = false;
                    carouselContainer.style.cursor = 'grab';
                }
            });
            
            carouselContainer.style.cursor = 'grab';
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
        
        // Pause auto-slide when hovering
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }
        
        // Start auto-slide
        startAutoSlide();
        
        // Dữ liệu cho từng thể loại với carousel slides
        const categories = {
            'ao-dai-cuoi': {
                title: 'Áo Dài Cưới',
                slides: [
                    {
                        type: 'circle',
                        image: 'assets/images/theloai/d211fae38f426284c24be3f55c01210fe30ce61a.png',
                        description: 'Áo dài cưới là phiên bản tinh xảo và sang trọng nhất của áo dài, được thiết kế để biến ngày trọng đại của bạn trở nên trọn vẹn hơn. Với tông đỏ tượng trưng cho may mắn, tông trắng cho sự thuần khiết, hay vàng champagne sang trọng, áo dài cưới được tạo nên từ những chất liệu cao cấp như ren Pháp, lụa Nhật, gấm thêu họa tiết hoàng gia.'
                    },
                    {
                        type: 'double',
                        images: ['assets/images/theloai/59530bd87f5e612186c5b9f24fc782eebd99f170.png', 'assets/images/theloai/54a39660893342567fe11720a40c6db3940ccd4f.png'],
                        description: 'Các nghệ nhân chăm chút từng chi tiết đường chỉ thêu, họa tiết rồng phượng, hoa sen, ánh kim và ngọc trai đính tay tạo nên vẻ đẹp cầu kỳ mà vẫn thanh nhã. Form ôm vừa vặn giúp tôn dáng, tạo hiệu ứng thon gọn, dòng tà dài thướt tha giúp cô dâu trở nên quý phái như một nàng thơ Việt.',
                        description2: 'Đây không chỉ là trang phục cưới mà là một tác phẩm biểu tượng cho hạnh phúc, nơi vẻ đẹp truyền thống và nét sang trọng hiện đại hòa quyện, giúp cô dâu tỏa sáng trong từng ánh nhìn.'
                    }
                ]
            },
            'ao-dai-truyen-thong': {
                title: 'Áo Dài Truyền Thống',
                slides: [
                    {
                        type: 'circle',
                        image: 'assets/images/theloai/ddd81a77c0f4a95945ce23c37d6de6d06610e60b.png',
                        description: 'Áo dài truyền thống là biểu tượng của sự thanh tao và chuẩn mực trong văn hóa Việt, mang dáng vẻ mềm mại nhưng đầy khí chất. Với thiết kế cổ cao, tay dài, phom ôm nhẹ nhàng và hai tà buông thướt tha theo từng nhịp bước, áo dài truyền thống tôn vinh nét đẹp tự nhiên của cơ thể mà không phô diễn. Những đường may thẳng mượt, cách chia tà cân đối và chất liệu lụa, gấm hoặc satin tạo nên hiệu ứng uyển chuyển, giúp người mặc không chỉ đẹp mà còn toát lên sự duyên dáng một cách tự nhiên.'
                    },
                    {
                        type: 'double',
                        images: ['assets/images/theloai/9e8ab84041b1a0fbf83253f7c2598f0fc9821936.png', 'assets/images/theloai/032c366a42479ce062a1624d89b938c99be24592.png'],
                        description: 'Đây là lựa chọn lý tưởng cho những ai tìm kiếm một vẻ đẹp chuẩn mực, tinh khôi và mang đậm chiều sâu văn hóa. Dù là ngày lễ, dịp trọng đại hay sự kiện trang trọng, áo dài truyền thống luôn khiến người mặc trở nên nổi bật theo cách tinh tế nhất. Một khi khoác lên, bạn sẽ cảm nhận được dáng đứng Việt, một vẻ đẹp vượt thời gian không thể trộn lẫn.'
                    }
                ]
            },
            'ao-dai-chup-hinh': {
                title: 'Áo Dài Kỷ Yếu / Chụp Ảnh Concept',
                slides: [
                    {
                        type: 'circle',
                        image: 'assets/images/theloai/d68b1082a8168bccd112d804a059be6ab2286fcb.png',
                        description: 'Áo dài kỷ yếu thường mang sắc trắng tinh khôi, pastel dịu dàng hoặc họa tiết nhẹ nhàng, thể hiện vẻ đẹp thuần khiết của tuổi học trò. Những chất liệu mềm như lụa Hàn, voan cao cấp và satin lụa mang đến cảm giác nhẹ tựa mây, giúp tà áo bắt sáng và trở nên vô cùng ăn ảnh dưới nắng tự nhiên.'
                    },
                    {
                        type: 'double',
                        images: ['assets/images/theloai/9e8ab84041b1a0fbf83253f7c2598f0fc9821936.png', 'assets/images/theloai/032c366a42479ce062a1624d89b938c99be24592.png'],
                        description: 'Đối với áo dài chụp concept, các phiên bản đa dạng hơn từ phong cách cổ điển, Sài Gòn xưa, vintage, đến hiện đại hay nghệ thuật được thiết kế để tạo nên những bộ ảnh độc đáo, giàu cảm xúc. Dù bạn muốn dịu dàng, cá tính, tinh khiết hay đậm chất hoài cổ, chúng tôi đều có mẫu phù hợp cho từng câu chuyện bạn muốn kể.'
                    }
                ]
            },
            'ao-dai-cach-tan': {
                title: 'Áo Dài Cách Tân',
                slides: [
                    {
                        type: 'circle',
                        image: 'assets/images/theloai/b24bc786a6adc90d7b47ed4427ff73f652012319.png',
                        description: 'Áo dài cách tân là lựa chọn hoàn hảo cho những ai yêu vẻ đẹp truyền thống nhưng muốn sự tự do, thoải mái và hiện đại hơn trong đời sống. Thiết kế tà ngắn, cổ cách điệu, kết hợp cùng chân váy xếp ly, quần ống rộng hoặc váy midi mang đến một phong thái trẻ trung, tươi mới. Chất liệu cotton, voan, lụa mềm hay linen giúp áo nhẹ, thoáng và phù hợp cho cả di chuyển ngoài trời lẫn chụp ảnh.'
                    },
                    {
                        type: 'double',
                        images: ['assets/images/theloai/bdcd60680c0996dd1e3f9c7bd35a3727284f11b6.png', 'assets/images/theloai/b66b9c9a2068e15c698e22e75a8b43e96fbe456f.png'],
                        description: 'Các họa tiết hiện đại – từ hoa nhí, pastel đến hoạt hình, hình họa – được thiết kế để tạo nên phong cách vừa truyền thống vừa cá tính. Đây là chiếc áo dài khiến bạn dễ dàng diện trong Tết, du lịch, café cuối tuần, hoặc chụp ảnh phong cách mà không cần lo về sự gò bó.'
                    }
                ]
            }
        };
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                const data = categories[category];
                
                // Xóa class active từ tất cả các button (desktop và mobile)
                buttons.forEach(btn => btn.classList.remove('active-button'));
                mobileButtons.forEach(btn => btn.classList.remove('active-button-mobile'));
                
                // Thêm class active cho button được click
                this.classList.add('active-button');
                
                // Cũng active button tương ứng trên mobile
                const mobileBtn = document.querySelector(`.ao-dai-button-mobile[data-category="${category}"]`);
                if (mobileBtn) mobileBtn.classList.add('active-button-mobile');
                
                if (data && detailSection) {
                    // Scroll đến phần chi tiết
                    detailSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Reset carousel về slide đầu tiên
                    currentSlide = 0;
                    
                    // Cập nhật nội dung
                    setTimeout(() => {
                        const titleElement = document.querySelector('.carousel-title');
                        if (titleElement) titleElement.textContent = data.title.toUpperCase();
                        
                        // Rebuild carousel slides
                        rebuildCarousel(data.slides);
                        updateCarousel();
                        
                        // Thêm hiệu ứng fade
                        detailSection.classList.add('animate-fade-in');
                        setTimeout(() => {
                            detailSection.classList.remove('animate-fade-in');
                        }, 600);
                    }, 500);
                }
            });
        });
        
        // Handle mobile buttons
        const mobileButtons = document.querySelectorAll('.ao-dai-button-mobile');
        mobileButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                const data = categories[category];
                
                // Xóa class active từ tất cả các button
                buttons.forEach(btn => btn.classList.remove('active-button'));
                mobileButtons.forEach(btn => btn.classList.remove('active-button-mobile'));
                
                // Thêm class active cho button được click
                this.classList.add('active-button-mobile');
                
                // Cũng active button tương ứng trên desktop
                const desktopBtn = document.querySelector(`.ao-dai-button[data-category="${category}"]`);
                if (desktopBtn) desktopBtn.classList.add('active-button');
                
                if (data && detailSection) {
                    // Scroll đến phần chi tiết
                    detailSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Reset carousel về slide đầu tiên
                    currentSlide = 0;
                    
                    // Cập nhật nội dung
                    setTimeout(() => {
                        const titleElement = document.querySelector('.carousel-title');
                        if (titleElement) titleElement.textContent = data.title.toUpperCase();
                        
                        // Rebuild carousel slides
                        rebuildCarousel(data.slides);
                        updateCarousel();
                        
                        // Thêm hiệu ứng fade
                        detailSection.classList.add('animate-fade-in');
                        setTimeout(() => {
                            detailSection.classList.remove('animate-fade-in');
                        }, 600);
                    }, 500);
                }
            });
        });
        
        // Function to rebuild carousel with new data
        function rebuildCarousel(slides) {
            if (!carouselWrapper) return;
            
            carouselWrapper.innerHTML = '';
            
            slides.forEach((slide, index) => {
                const slideDiv = document.createElement('div');
                slideDiv.className = 'carousel-slide min-w-full flex flex-col gap-[16px]';
                
                if (slide.type === 'circle') {
                    slideDiv.innerHTML = `
                        <div class="flex flex-col md:flex-row gap-[32px] md:gap-[64px] items-center justify-center w-full px-4">
                            <div class="w-[300px] h-[300px] md:w-[470px] md:h-[470px] rounded-full overflow-hidden shrink-0">
                                <img src="${slide.image}" alt="Áo Dài" class="w-full h-full object-cover">
                            </div>
                            <div class="font-display text-[16px] md:text-[20px] text-black text-justify flex-1 max-w-[600px]">
                                <p class="mb-4">${slide.description}</p>
                            </div>
                        </div>
                    `;
                } else if (slide.type === 'double') {
                    slideDiv.innerHTML = `
                        <div class="flex flex-col md:flex-row gap-[32px] items-center w-full px-4">
                            <div class="font-display text-[16px] md:text-[20px] text-black text-justify flex-1 max-w-[523px]">
                                <p class="mb-4">${slide.description}</p>
                                ${slide.description2 ? `<p>${slide.description2}</p>` : ''}
                            </div>
                            <div class="flex gap-[24px] items-center justify-end flex-1">
                                <div class="h-[350px] md:h-[484px] w-[180px] md:w-[256px] overflow-hidden rounded">
                                    <img src="${slide.images[0]}" alt="Áo Dài Detail 1" class="w-full h-full object-cover">
                                </div>
                                <div class="h-[350px] md:h-[484px] w-[180px] md:w-[256px] overflow-hidden rounded">
                                    <img src="${slide.images[1]}" alt="Áo Dài Detail 2" class="w-full h-full object-cover">
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                carouselWrapper.appendChild(slideDiv);
            });
            
            // Update dots
            const dotsContainer = document.querySelector('.flex.gap-\\[8px\\].items-center.justify-center.mt-\\[16px\\]');
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                slides.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.className = `carousel-dot w-[12px] h-[12px] rounded-full transition-all duration-300 ${index === 0 ? 'bg-black' : 'bg-gray-300'}`;
                    dot.setAttribute('data-slide', index);
                    dot.addEventListener('click', function() {
                        goToSlide(index);
                        startAutoSlide();
                    });
                    dotsContainer.appendChild(dot);
                });
            }
            
            // Re-query carousel elements
            const newSlides = document.querySelectorAll('.carousel-slide');
            const newDots = document.querySelectorAll('.carousel-dot');
        }
    });
}
