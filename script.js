document.addEventListener('DOMContentLoaded', function () {
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const header = document.getElementById('header');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Typing Animation for Hero Section
  
  const texts = [
  'Full Stack Developer',
  'Mobile App Developer',
  'Web Developer',
  'Frontend Developer',
  'SQL Database Designer',
  'Tech Enthusiast',
  'UI/UX Explorer',
  'Software Tester',
  'Problem Solver',
  'Data-Driven Thinker'
];

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
            }
        });
    }, { threshold: 0.1 });

    animateOnScroll.forEach(element => observer.observe(element));

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Modal Functionality
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Logo Modal
    const logoImg = document.getElementById('logo-img');
    const logoModal = document.getElementById('logoModal');
    const closeLogoModal = document.getElementById('closeLogoModal');

    logoImg.addEventListener('click', () => openModal('logoModal'));
    closeLogoModal.addEventListener('click', () => closeModal('logoModal'));

    // Lightbox for Image Gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const showcaseImages = document.querySelectorAll('.showcase-image-container');

    showcaseImages.forEach(imgContainer => {
        imgContainer.addEventListener('click', () => {
            const imgSrc = imgContainer.getAttribute('data-lightbox-img');
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

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
        document.getElementById(btn).addEventListener('click', () => openModal(modal));
        document.getElementById(close).addEventListener('click', () => closeModal(modal));
    });

    // Project Modals
    const projectModalButtons = [
        { btn: 'openProjectModal1', modal: 'projectModal1', close: 'closeProjectBtn1' },
        { btn: 'openProjectModal2', modal: 'projectModal2', close: 'closeProjectBtn2' },
        { btn: 'openProjectModal3', modal: 'projectModal3', close: 'closeProjectBtn3' }
    ];

    projectModalButtons.forEach(({ btn, modal, close }) => {
        document.getElementById(btn).addEventListener('click', () => openModal(modal));
        document.getElementById(close).addEventListener('click', () => closeModal(modal));
    });

    // Certification Modals
    const certModalButtons = [
        { btn: 'openCertModal1', modal: 'certModal1', close: 'closeCertBtn1' },
        { btn: 'openCertModal2', modal: 'certModal2', close: 'closeCertBtn2' },
        { btn: 'openCertModal3', modal: 'certModal3', close: 'closeCertBtn3' },
        { btn: 'openCertModal4', modal: 'certModal4', close: 'closeCertBtn4' }
    ];

    certModalButtons.forEach(({ btn, modal, close }) => {
        document.getElementById(btn).addEventListener('click', () => openModal(modal));
        document.getElementById(close).addEventListener('click', () => closeModal(modal));
    });

    // Education Modals
    document.getElementById('openHscModal').addEventListener('click', () => openModal('hscModal'));
    document.getElementById('closeHscModal').addEventListener('click', () => closeModal('hscModal'));

    document.getElementById('openSscModal').addEventListener('click', () => openModal('sscModal'));
    document.getElementById('closeSscModal').addEventListener('click', () => closeModal('sscModal'));

    // Experience Modals
    document.getElementById('openExperienceModal').addEventListener('click', () => openModal('experienceModal'));
    document.getElementById('closeExperienceModal').addEventListener('click', () => closeModal('experienceModal'));

    document.getElementById('openOfferLetterModal').addEventListener('click', () => openModal('offerLetterModal'));
    document.getElementById('closeOfferLetterModal').addEventListener('click', () => closeModal('offerLetterModal'));

    document.getElementById('openCompletionModal').addEventListener('click', () => openModal('completionModal'));
    document.getElementById('closeCompletionModal').addEventListener('click', () => closeModal('completionModal'));

    // About Me Modal
    document.getElementById('openAboutMeModal').addEventListener('click', () => openModal('aboutMeModal'));
    document.getElementById('closeAboutMeModal').addEventListener('click', () => closeModal('aboutMeModal'));

    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Dynamic Footer Year
    const footerYear = document.getElementById('footer-year');
    footerYear.textContent = new Date().getFullYear();

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    function validateName() {
        const value = nameInput.value.trim();
        if (value.length < 2) {
            nameInput.classList.add('error');
            nameError.textContent = 'Name must be at least 2 characters long';
            nameError.style.display = 'block';
            return false;
        } else {
            nameInput.classList.remove('error');
            nameError.style.display = 'none';
            return true;
        }
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            emailInput.classList.add('error');
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return false;
        } else {
            emailInput.classList.remove('error');
            emailError.style.display = 'none';
            return true;
        }
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (value.length < 10) {
            messageInput.classList.add('error');
            messageError.textContent = 'Message must be at least 10 characters long';
            messageError.style.display = 'block';
            return false;
        } else {
            messageInput.classList.remove('error');
            messageError.style.display = 'none';
            return true;
        }
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('There was an error sending your message. Please try again.');
                }
            } catch (error) {
                alert('An error occurred. Please check your connection and try again.');
            }
        }
    });

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    // Horizontal Scroll for Awards and Certifications
    function setupHorizontalScroll(containerId, leftBtnId, rightBtnId) {
        const container = document.getElementById(containerId);
        const leftBtn = document.getElementById(leftBtnId);
        const rightBtn = document.getElementById(rightBtnId);

        function updateScrollButtons() {
            leftBtn.classList.toggle('hidden', container.scrollLeft <= 0);
            rightBtn.classList.toggle('hidden', container.scrollLeft + container.clientWidth >= container.scrollWidth - 1);
        }

        container.addEventListener('scroll', updateScrollButtons);
        leftBtn.addEventListener('click', () => {
            container.scrollBy({ left: -350, behavior: 'smooth' });
        });
        rightBtn.addEventListener('click', () => {
            container.scrollBy({ left: 350, behavior: 'smooth' });
        });

        updateScrollButtons();
        new ResizeObserver(updateScrollButtons).observe(container);
    }

    setupHorizontalScroll('awards-grid', 'scroll-left', 'scroll-right');
    setupHorizontalScroll('certifications-grid', 'cert-scroll-left', 'cert-scroll-right');

    // Three.js Background Animation
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * (Math.random() * 200);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const material = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x64ffda,
        transparent: true,
        opacity: 0.5
    });
    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);
    camera.position.z = 10;

    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0001;
        particlesMesh.rotation.y += 0.0002;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Vanilla Tilt for Skills Section
    VanillaTilt.init(document.querySelectorAll('.skill-category'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.5
    });
}); 