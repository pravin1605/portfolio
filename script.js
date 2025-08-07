// Helper function to detect WebGL support
function detectWebGLSupport() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return gl ? 'WebGL 1.0' : 'Not Supported';
    } catch (e) {
        return 'Not Supported';
    }
}

// Function to show stats in a modal
function showPortfolioStatsModal(stats) {
    let statsModal = document.getElementById('portfolioStatsModal');
    if (!statsModal) {
        statsModal = document.createElement('div');
        statsModal.id = 'portfolioStatsModal';
        statsModal.className = 'modal';
        statsModal.innerHTML = `
            <div class="modal-content" style="max-width: 800px; max-height: 80vh; overflow-y: auto;">
                <div class="modal-header">
                    <h2 style="color: #64ffda; margin: 0;">
                        <i class="fas fa-chart-line"></i> Portfolio Developer Stats
                    </h2>
                    <span class="close" id="closeStatsModal" style="color: #aaa; float: right; font-size: 28px; cursor: pointer;">&times;</span>
                </div>
                <div class="modal-body" id="statsModalBody">
                    <!-- Stats content will be inserted here -->
                </div>
            </div>
        `;
        document.body.appendChild(statsModal);

        document.getElementById('closeStatsModal').addEventListener('click', () => {
            statsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        statsModal.addEventListener('click', (e) => {
            if (e.target === statsModal) {
                statsModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    let statsHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">';
    Object.entries(stats).forEach(([key, value]) => {
        const displayValue = Array.isArray(value) ? value.join(', ') : value;
        statsHTML += `
            <div style="background: rgba(100, 255, 218, 0.05); padding: 15px; border-radius: 8px; border-left: 3px solid #64ffda;">
                <div style="color: #64ffda; font-weight: bold; margin-bottom: 5px;">${key}</div>
                <div style="color: #8892b0; font-family: 'Fira Code', monospace;">${displayValue}</div>
            </div>
        `;
    });
    statsHTML += '</div>';

    statsHTML += `
        <div style="margin-top: 30px; padding: 20px; background: rgba(255, 215, 0, 0.1); border-radius: 8px; border-left: 3px solid #ffd700;">
            <h3 style="color: #ffd700; margin-top: 0;">🎮 Available Shortcuts:</h3>
            <ul style="color: #8892b0; margin: 0; padding-left: 20px;">
                <li><kbd style="background: #0a192f; padding: 2px 6px; border-radius: 3px; color: #64ffda;">Ctrl + Shift + P</kbd> - Show Portfolio Stats</li>
                <li><kbd style="background: #0a192f; padding: 2px 6px; border-radius: 3px; color: #64ffda;">Cmd + Shift + P</kbd> - Show Portfolio Stats (Mac)</li>
                <li><kbd style="background: #0a192f; padding: 2px 6px; border-radius: 3px; color: #64ffda;">Escape</kbd> - Close any modal</li>
                <li><kbd style="background: #0a192f; padding: 2px 6px; border-radius: 3px; color: #64ffda;">Arrow Keys</kbd> - Navigate horizontal sections</li>
            </ul>
        </div>
    `;

    document.getElementById('statsModalBody').innerHTML = statsHTML;
    statsModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    alert('📊 Portfolio stats opened in modal and logged to console!');
}

// Function to add stats button
function addStatsButton() {
    const statsButton = document.createElement('button');
    statsButton.innerHTML = '📊 Dev Stats';
    statsButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9999;
        background: rgba(100, 255, 218, 0.1);
        border: 1px solid #64ffda;
        color: #64ffda;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12px;
        opacity: 0.3;
        transition: opacity 0.3s ease;
    `;
    statsButton.addEventListener('mouseenter', () => statsButton.style.opacity = '1');
    statsButton.addEventListener('mouseleave', () => statsButton.style.opacity = '0.3');
    statsButton.addEventListener('click', () => {
        const event = new KeyboardEvent('keydown', {
            key: 'P',
            ctrlKey: true,
            shiftKey: true,
            bubbles: true
        });
        document.dispatchEvent(event);
    });
    document.body.appendChild(statsButton);
}

// Keydown event listener for portfolio stats
document.addEventListener('keydown', (e) => {
    console.log('Key pressed:', {
        key: e.key,
        code: e.code,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey
    });

    const isPortfolioStatsShortcut =
        (e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) ||
        (e.metaKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) ||
        (e.ctrlKey && e.altKey && (e.key === 'P' || e.key === 'p'));

    if (isPortfolioStatsShortcut) {
        e.preventDefault();
        let loadTime = 'N/A';
        if (window.performance && window.performance.timing) {
            const perfTiming = window.performance.timing;
            if (perfTiming.loadEventEnd && perfTiming.navigationStart) {
                loadTime = `${perfTiming.loadEventEnd - perfTiming.navigationStart}ms`;
            }
        }

        const stats = {
            '🚀 Portfolio Version': '2.0.0',
            '📅 Build Date': new Date().toLocaleDateString(),
            '💻 Technologies': ['HTML5', 'CSS3', 'JavaScript ES6+', 'Three.js', 'CSS Grid/Flexbox'],
            '📝 Lines of Code': '~2000+',
            '⚡ Page Load Time': loadTime,
            '📱 Screen Resolution': `${window.innerWidth} × ${window.innerHeight}`,
            '🌐 Viewport': `${document.documentElement.clientWidth} × ${document.documentElement.clientHeight}`,
            '🎯 Color Depth': `${screen.colorDepth}-bit`,
            '📊 Pixel Ratio': window.devicePixelRatio || 1,
            '🔧 Browser': navigator.userAgent.split(' ')[0],
            '💾 Local Storage': typeof(Storage) !== "undefined" ? 'Supported' : 'Not Supported',
            '🎮 WebGL Support': detectWebGLSupport(),
            '📍 Language': navigator.language,
            '🕒 Current Time': new Date().toLocaleString(),
            '🎨 Theme': document.body.classList.contains('dark-theme') ? 'Dark' : 'Light'
        };

        console.clear();
        console.log('%c🎯 PORTFOLIO DEVELOPER STATS 🎯', 'color: #64ffda; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
        console.log('%c' + '='.repeat(50), 'color: #64ffda;');
        console.table(stats);

        console.group('%c🔧 Technical Details', 'color: #ffd700; font-weight: bold;');
        console.log('%cMemory Usage:', 'color: #00ff00; font-weight: bold;', performance.memory ? {
            'Used': `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
            'Total': `${(performance.memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
            'Limit': `${(performance.memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
        } : 'Not available');
        console.log('%cConnection:', 'color: #00ff00; font-weight: bold;', navigator.connection ? {
            'Type': navigator.connection.effectiveType,
            'Downlink': `${navigator.connection.downlink} Mbps`,
            'RTT': `${navigator.connection.rtt}ms`
        } : 'Not available');
        console.log('%cFeatures Detected:', 'color: #00ff00; font-weight: bold;', {
            'Service Worker': 'serviceWorker' in navigator,
            'Intersection Observer': 'IntersectionObserver' in window,
            'Fetch API': 'fetch' in window,
            'ES6 Modules': 'noModule' in HTMLScriptElement.prototype,
            'CSS Grid': CSS.supports('display', 'grid'),
            'CSS Variables': CSS.supports('color', 'var(--test)'),
            'Animations': 'animate' in document.createElement('div')
        });
        console.groupEnd();

        showPortfolioStatsModal(stats);
    }
});

// Main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
    // Add stats button
    addStatsButton();

    // Loading Screen
    window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    });

    // Visitor Counter (Simulated)
    const visitorCount = document.getElementById('visitor-count');
    if (visitorCount) {
        const count = Math.floor(Math.random() * 5000) + 1000;
        setTimeout(() => {
            visitorCount.textContent = count.toLocaleString();
        }, 1000);
    }

    // Download CV Functionality
    const downloadCV = document.getElementById('download-cv');
    if (downloadCV) {
        downloadCV.addEventListener('click', (e) => {
            e.preventDefault();
            const cvUrl = 'assest/Pravin_Rokade_Resume.pdf';
            const link = document.createElement('a');
            link.href = cvUrl;
            link.download = 'Pravin_Rokade_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            const originalText = downloadCV.innerHTML;
            downloadCV.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            downloadCV.style.background = 'var(--success-color)';
            downloadCV.style.color = 'white';
            setTimeout(() => {
                downloadCV.innerHTML = originalText;
                downloadCV.style.background = 'transparent';
                downloadCV.style.color = 'var(--accent-color)';
            }, 2000);
        });
    }

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const header = document.getElementById('header');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Header Scroll Effect
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Typing Animation for Hero Section
    const texts = ['Full Stack Developer', 'Mobile App Developer', 'Tech Enthusiast', 'Problem Solver', 'Team Leader'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetween = 2000;
    const typingText = document.querySelector('.typing-text');

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, deletingSpeed);
            }
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, delayBetween);
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }
    if (typingText) type();

    // Scroll Animations
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('skill-category')) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const level = bar.getAttribute('data-level');
                        setTimeout(() => {
                            bar.style.width = level + '%';
                        }, 500);
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    animateOnScroll.forEach(element => observer.observe(element));

    // Skill Filter Functionality
    const skillFilters = document.querySelectorAll('.skill-filter .filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category');
    skillFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-category');
            skillFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            skillCategories.forEach(skillCat => {
                const categories = skillCat.getAttribute('data-category') || 'all';
                if (category === 'all' || categories.includes(category)) {
                    skillCat.style.display = 'block';
                    setTimeout(() => {
                        skillCat.style.opacity = '1';
                        skillCat.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    skillCat.style.opacity = '0';
                    skillCat.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        skillCat.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project Filter Functionality
    const projectFilters = document.querySelectorAll('.project-filter .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-category');
            projectFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
        });
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Modal Functionality
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'translateY(-50px)';
                modalContent.style.opacity = '0';
                setTimeout(() => {
                    modalContent.style.transform = 'translateY(0)';
                    modalContent.style.opacity = '1';
                }, 50);
            }
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'translateY(-50px)';
                modalContent.style.opacity = '0';
            }
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    // Logo Modal
    const logoImg = document.getElementById('logo-img');
    const logoModal = document.getElementById('logoModal');
    const closeLogoModal = document.getElementById('closeLogoModal');
    if (logoImg && logoModal && closeLogoModal) {
        logoImg.addEventListener('click', () => openModal('logoModal'));
        closeLogoModal.addEventListener('click', () => closeModal('logoModal'));
    }

    // Lightbox for Image Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const showcaseImages = document.querySelectorAll('.showcase-image-container');
    showcaseImages.forEach(imgContainer => {
        imgContainer.addEventListener('click', () => {
            const imgSrc = imgContainer.getAttribute('data-lightbox-img');
            if (lightboxImg && lightbox) {
                lightboxImg.src = imgSrc;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    if (lightboxClose && lightbox) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Award Modals
    const awardModalButtons = [
        { btn: 'openModalBtn1', modal: 'awardModal1', close: 'closeBtn1' },
        { btn: 'openModalBtn2', modal: 'awardModal2', close: 'closeBtn2' },
        { btn: 'openModalBtn3', modal: 'awardModal3', close: 'closeBtn3' },
        { btn: 'openModalBtn4', modal: 'awardModal4', close: 'closeBtn4' },
        { btn: 'openModalBtn5', modal: 'awardModal5', close: 'closeBtn5' },
        { btn: 'openModalBtn6', modal: 'awardModal6', close: 'closeBtn6' }
    ];
    awardModalButtons.forEach(({ btn, modal, close }) => {
        const btnElement = document.getElementById(btn);
        const closeElement = document.getElementById(close);
        if (btnElement) btnElement.addEventListener('click', () => openModal(modal));
        if (closeElement) closeElement.addEventListener('click', () => closeModal(modal));
    });

    // Project Modals
    const projectModalButtons = [
        { btn: 'openProjectModal1', modal: 'projectModal1', close: 'closeProjectBtn1' },
        { btn: 'openProjectModal2', modal: 'projectModal2', close: 'closeProjectBtn2' },
        { btn: 'openProjectModal3', modal: 'projectModal3', close: 'closeProjectBtn3' }
    ];
    projectModalButtons.forEach(({ btn, modal, close }) => {
        const btnElement = document.getElementById(btn);
        const closeElement = document.getElementById(close);
        if (btnElement) btnElement.addEventListener('click', () => openModal(modal));
        if (closeElement) closeElement.addEventListener('click', () => closeModal(modal));
    });

    // Certification Modals
    const certModalButtons = [
        { btn: 'openCertModal1', modal: 'certModal1', close: 'closeCertBtn1' },
        { btn: 'openCertModal2', modal: 'certModal2', close: 'closeCertBtn2' },
        { btn: 'openCertModal3', modal: 'certModal3', close: 'closeCertBtn3' },
        { btn: 'openCertModal4', modal: 'certModal4', close: 'closeCertBtn4' }
    ];
    certModalButtons.forEach(({ btn, modal, close }) => {
        const btnElement = document.getElementById(btn);
        const closeElement = document.getElementById(close);
        if (btnElement) btnElement.addEventListener('click', () => openModal(modal));
        if (closeElement) closeElement.addEventListener('click', () => closeModal(modal));
    });

    // Education Modals
    const educationModals = [
        { btn: 'openHscModal', modal: 'hscModal', close: 'closeHscModal' },
        { btn: 'openSscModal', modal: 'sscModal', close: 'closeSscModal' }
    ];
    educationModals.forEach(({ btn, modal, close }) => {
        const btnElement = document.getElementById(btn);
        const closeElement = document.getElementById(close);
        if (btnElement) btnElement.addEventListener('click', () => openModal(modal));
        if (closeElement) closeElement.addEventListener('click', () => closeModal(modal));
    });

    // Experience Modals
    const experienceModals = [
        { btn: 'openExperienceModal', modal: 'experienceModal', close: 'closeExperienceModal' },
        { btn: 'openOfferLetterModal', modal: 'offerLetterModal', close: 'closeOfferLetterModal' },
        { btn: 'openCompletionModal', modal: 'completionModal', close: 'closeCompletionModal' }
    ];
    experienceModals.forEach(({ btn, modal, close }) => {
        const btnElement = document.getElementById(btn);
        const closeElement = document.getElementById(close);
        if (btnElement) btnElement.addEventListener('click', () => openModal(modal));
        if (closeElement) closeElement.addEventListener('click', () => closeModal(modal));
    });

    // About Me Modal
    const aboutMeBtn = document.getElementById('openAboutMeModal');
    const aboutMeClose = document.getElementById('closeAboutMeModal');
    if (aboutMeBtn) aboutMeBtn.addEventListener('click', () => openModal('aboutMeModal'));
    if (aboutMeClose) aboutMeClose.addEventListener('click', () => closeModal('aboutMeModal'));

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });

    // Dynamic Footer Year
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const companyInput = document.getElementById('company');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    function showError(input, errorElement, message) {
        input.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function hideError(input, errorElement) {
        input.classList.remove('error');
        if (errorElement) errorElement.style.display = 'none';
    }

    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            formStatus.style.display = 'block';
            if (type === 'success') {
                setTimeout(() => formStatus.style.display = 'none', 5000);
            }
        }
    }

    function validateName() {
        const value = nameInput.value.trim();
        if (value.length < 2) {
            showError(nameInput, nameError, 'Name must be at least 2 characters long');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
            showError(nameInput, nameError, 'Name should only contain letters and spaces');
            return false;
        } else {
            hideError(nameInput, nameError);
            return true;
        }
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(emailInput, emailError, 'Please enter a valid email address');
            return false;
        } else {
            hideError(emailInput, emailError);
            return true;
        }
    }

    function validatePhone() {
        const value = phoneInput.value.trim();
        if (value && !/^\+?[\d\s\-\(\)]{10,}$/.test(value)) {
            return false;
        }
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (value.length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters long');
            return false;
        } else if (value.length > 1000) {
            showError(messageInput, messageError, 'Message must be less than 1000 characters');
            return false;
        } else {
            hideError(messageInput, messageError);
            return true;
        }
    }

    function validateSubject() {
        return subjectInput.value.trim() !== '';
    }

    if (nameInput) nameInput.addEventListener('input', validateName);
    if (emailInput) emailInput.addEventListener('input', validateEmail);
    if (phoneInput) phoneInput.addEventListener('input', validatePhone);
    if (messageInput) messageInput.addEventListener('input', validateMessage);

    if (messageInput) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = 'text-align: right; font-size: 0.8rem; color: #8892b0; margin-top: 0.5rem;';
        messageInput.parentNode.appendChild(charCounter);

        messageInput.addEventListener('input', () => {
            const currentLength = messageInput.value.length;
            charCounter.textContent = `${currentLength}/1000 characters`;
            charCounter.style.color = currentLength > 950 ? 'var(--error-color)' : currentLength > 900 ? 'var(--warning-color)' : '#8892b0';
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isMessageValid = validateMessage();
            const isSubjectValid = validateSubject();

            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid && isSubjectValid) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                try {
                    const formData = new FormData(contactForm);
                    formData.append('timestamp', new Date().toISOString());
                    formData.append('user_agent', navigator.userAgent);
                    formData.append('referrer', document.referrer || 'Direct');

                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        showFormStatus('🎉 Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                        contactForm.reset();
                        const charCounter = document.querySelector('.char-counter');
                        if (charCounter) charCounter.textContent = '0/1000 characters';
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'form_submit', {
                                event_category: 'Contact',
                                event_label: 'Portfolio Contact Form'
                            });
                        }
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    showFormStatus('❌ There was an error sending your message. Please try again or contact me directly.', 'error');
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            } else {
                showFormStatus('❌ Please fix the errors above and try again.', 'error');
            }
        });
    }

    // Auto-save form data to localStorage
    const formInputs = [nameInput, emailInput, phoneInput, companyInput, messageInput];
    const formKey = 'portfolio_contact_form_backup';

    function saveFormData() {
        const formData = {};
        formInputs.forEach(input => {
            if (input && input.value.trim()) {
                formData[input.name || input.id] = input.value.trim();
            }
        });
        if (Object.keys(formData).length > 0) {
            localStorage.setItem(formKey, JSON.stringify(formData));
        }
    }

    function loadFormData() {
        try {
            const savedData = localStorage.getItem(formKey);
            if (savedData) {
                const formData = JSON.parse(savedData);
                formInputs.forEach(input => {
                    if (input && formData[input.name || input.id]) {
                        input.value = formData[input.name || input.id];
                    }
                });
            }
        } catch (error) {
            console.warn('Could not load saved form data:', error);
        }
    }

    function clearFormData() {
        localStorage.removeItem(formKey);
    }

    loadFormData();
    let saveTimeout;
    formInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(saveFormData, 1000);
            });
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            if (!e.defaultPrevented) {
                setTimeout(clearFormData, 2000);
            }
        });
    }

    // Horizontal Scroll for Awards and Certifications
    function setupHorizontalScroll(containerId, leftBtnId, rightBtnId) {
        const container = document.getElementById(containerId);
        const leftBtn = document.getElementById(leftBtnId);
        const rightBtn = document.getElementById(rightBtnId);

        if (!container || !leftBtn || !rightBtn) return;

        function updateScrollButtons() {
            const isAtStart = container.scrollLeft <= 0;
            const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
            leftBtn.classList.toggle('hidden', isAtStart);
            rightBtn.classList.toggle('hidden', isAtEnd);
        }

        container.addEventListener('scroll', updateScrollButtons);
        leftBtn.addEventListener('click', () => container.scrollBy({ left: -350, behavior: 'smooth' }));
        rightBtn.addEventListener('click', () => container.scrollBy({ left: 350, behavior: 'smooth' }));

        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });

        updateScrollButtons();
        const resizeObserver = new ResizeObserver(updateScrollButtons);
        resizeObserver.observe(container);
    }

    setupHorizontalScroll('awards-grid', 'scroll-left', 'scroll-right');
    setupHorizontalScroll('certifications-grid', 'cert-scroll-left', 'cert-scroll-right');

    // Keyboard navigation for scroll containers
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.awards-grid, .certifications-grid')) {
            const container = e.target.closest('.awards-grid, .certifications-grid');
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                container.scrollBy({ left: -350, behavior: 'smooth' });
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                container.scrollBy({ left: 350, behavior: 'smooth' });
            }
        }
    });

    // Three.js Background Animation
    const canvas = document.getElementById('bg-canvas');
    if (canvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const geometry = new THREE.BufferGeometry();
        const particlesCount = window.innerWidth < 768 ? 2000 : 5000;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * (Math.random() * 200);
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({
            size: 0.005,
            color: 0x64ffda,
            transparent: true,
            opacity: 0.6
        });
        const particlesMesh = new THREE.Points(geometry, material);
        scene.add(particlesMesh);
        camera.position.z = 10;

        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        function animate() {
            requestAnimationFrame(animate);
            particlesMesh.rotation.x += 0.0005 + mouseY * 0.00005;
            particlesMesh.rotation.y += 0.0008 + mouseX * 0.00005;
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                renderer.setAnimationLoop(null);
            } else {
                renderer.setAnimationLoop(animate);
            }
        });
    }

    // Vanilla Tilt for Skills Section
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.skill-category'), {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.3,
            perspective: 1000,
            transition: true
        });
        VanillaTilt.init(document.querySelectorAll('.value-card'), {
            max: 10,
            speed: 300,
            glare: true,
            'max-glare': 0.2
        });
        VanillaTilt.init(document.querySelectorAll('.showcase-card'), {
            max: 8,
            speed: 200,
            glare: false
        });
    }

    // Intersection Observer for counting animations
    const countElements = document.querySelectorAll('.stat-number');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
                if (!isNaN(numericValue)) {
                    animateCounter(target, 0, numericValue, finalValue, 2000);
                }
                countObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    countElements.forEach(el => countObserver.observe(el));

    function animateCounter(element, start, end, originalText, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = originalText;
                clearInterval(timer);
            } else {
                const suffix = originalText.replace(/[0-9.]/g, '');
                element.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    // Progressive loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));

    const style = document.createElement('style');
    style.textContent = `
        img[loading="lazy"] {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        img[loading="lazy"].fade-in {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Service Worker for offline functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered: ', registration))
                .catch(registrationError => console.log('SW registration failed: ', registrationError));
        });
    }

    // Performance monitoring
    if (window.performance) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = window.performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${loadTime}ms`);
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'timing_complete', {
                        name: 'load',
                        value: loadTime
                    });
                }
            }, 0);
        });
    }

    // Easter egg for developers
    console.log(`
    ╔═══════════════════════════════════════╗
    ║                                       ║
    ║      👨‍💻 Welcome to Pravin's Portfolio!     ║
    ║                                       ║
    ║   Thanks for checking the console!    ║
    ║   Interested in the code? Check out   ║
    ║   my GitHub: github.com/pravin1605    ║
    ║                                       ║
    ║   Built with ❤️ and lots of ☕        ║
    ║                                       ║
    ╚═══════════════════════════════════════╝
    `);
});