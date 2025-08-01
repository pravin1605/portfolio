document.addEventListener('DOMContentLoaded', () => {
    // --- Typing Animation ---
    const typingText = document.querySelector('.typing-text');
    const roles = ["Full-Stack Developer", "Mobile App Developer", "Computer Engineering Student"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typingText) return; // Exit if element not found
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(type, isDeleting ? 100 : 200);
    }
    type();

    // --- Dynamic Header & Back to Top Button ---
    const header = document.getElementById('header');
    const backToTopButton = document.getElementById('back-to-top');

    window.onscroll = () => {
        // Header style change
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    // --- Hamburger Menu Logic ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- Accurate Smooth Scrolling ---
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                if (navLinks?.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }

                const headerHeight = header?.offsetHeight || 0;
                const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
                const scrollToPosition = elementTop - headerHeight;

                window.scrollTo({
                    top: scrollToPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Animate Sections and Cards on Scroll ---
    const animateElements = document.querySelectorAll('.animate-on-scroll, section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
            // Remove 'visible' class when element scrolls out of view, for re-animation
            else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // --- Reusable Modal Logic ---
    function setupModal(modalId, openBtnId, closeBtnId) {
        const modal = document.getElementById(modalId);
        const openBtn = document.getElementById(openBtnId);
        const closeBtn = document.getElementById(closeBtnId);

        if (modal && openBtn && closeBtn) {
            openBtn.onclick = () => modal.style.display = 'block';
            closeBtn.onclick = () => modal.style.display = 'none';
            window.addEventListener('click', (event) => {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    // Setup ALL Modals
    setupModal('aboutMeModal', 'openAboutMeModal', 'closeAboutMeModal'); // About Me Modal
    setupModal('awardModal1', 'openModalBtn1', 'closeBtn1');
    setupModal('awardModal2', 'openModalBtn2', 'closeBtn2');
    setupModal('awardModal3', 'openModalBtn3', 'closeBtn3');
    setupModal('awardModal4', 'openModalBtn4', 'closeBtn4');
    setupModal('awardModal5', 'openModalBtn5', 'closeBtn5');
    setupModal('awardModal6', 'openModalBtn6', 'closeBtn6');
    setupModal('projectModal1', 'openProjectModal1', 'closeProjectBtn1');
    setupModal('projectModal2', 'openProjectModal2', 'closeProjectBtn2');
    setupModal('projectModal3', 'openProjectModal3', 'closeProjectBtn3');
    setupModal('hscModal', 'openHscModal', 'closeHscModal'); // UPDATED: Now opens PDF
    setupModal('sscModal', 'openSscModal', 'closeSscModal'); // UPDATED: Now opens PDF
    setupModal('experienceModal', 'openExperienceModal', 'closeExperienceModal');
    setupModal('offerLetterModal', 'openOfferLetterModal', 'closeOfferLetterModal');
    setupModal('completionModal', 'openCompletionModal', 'closeCompletionModal');
    setupModal('certModal1', 'openCertModal1', 'closeCertBtn1');
    setupModal('certModal2', 'openCertModal2', 'closeCertBtn2');
    setupModal('certModal3', 'openCertModal3', 'closeCertBtn3');
    setupModal('certModal4', 'openCertModal4', 'closeCertBtn4');
    setupModal('logoModal', 'logo-img', 'closeLogoModal');


    // --- Awards & Certifications Carousel / Scrolling ---
    const awardsGrid = document.getElementById('awards-grid');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    const certificationsGrid = document.getElementById('certifications-grid');
    const certScrollLeftBtn = document.getElementById('cert-scroll-left');
    const certScrollRightBtn = document.getElementById('cert-scroll-right');

    const scrollAmount = 380; // Approximate width of one card + gap

    function setupCarousel(grid, leftBtn, rightBtn) {
        if (!grid || !leftBtn || !rightBtn) return;

        // Function to check and update button visibility
        const updateScrollButtons = () => {
            leftBtn.classList.toggle('hidden', grid.scrollLeft <= 0);
            rightBtn.classList.toggle('hidden', grid.scrollLeft + grid.clientWidth >= grid.scrollWidth);
        };

        // Initial check
        updateScrollButtons();

        // Event listeners for scrolling
        leftBtn.addEventListener('click', () => {
            grid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        rightBtn.addEventListener('click', () => {
            grid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update buttons on scroll
        grid.addEventListener('scroll', updateScrollButtons);

        // Update buttons on window resize (in case grid width changes)
        window.addEventListener('resize', updateScrollButtons);
    }

    setupCarousel(awardsGrid, scrollLeftBtn, scrollRightBtn);
    setupCarousel(certificationsGrid, certScrollLeftBtn, certScrollRightBtn);


    // --- 3D Tilt Effect for Skills ---
    VanillaTilt.init(document.querySelectorAll(".skill-category"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });
});