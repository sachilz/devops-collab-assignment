AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });

        // Mouse Move Effects (Parallax & Spotlight)
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Parallax for Hero Blobs
            const blobs = document.querySelectorAll('.parallax-blob');
            blobs.forEach(blob => {
                const speed = blob.getAttribute('data-speed') || 1;
                const x = (window.innerWidth - mouseX * speed) / 100;
                const y = (window.innerHeight - mouseY * speed) / 100;
                blob.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });

            // Spotlight for Cards
            const cards = document.querySelectorAll('.liquid-glass');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            // Tilt Effect for Images
            const tiltCards = document.querySelectorAll('.tilt-card');
            tiltCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * 5; // Max rotation deg
                const rotateY = ((x - centerX) / centerX) * -5;

                // Only apply if mouse is over or near the card to save performance/avoid weird jumps
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                     card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                } else {
                     card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
                }
            });
        });

        // Filter Logic
        function filterPackages(category, btnElement) {
            const buttons = document.querySelectorAll('.filter-btn');
            const inactiveClasses = ['bg-slate-800', 'text-slate-300', 'hover:bg-slate-700', 'hover:text-white', 'border', 'border-slate-700', 'font-medium'];
            const activeClasses = ['bg-primary', 'text-slate-900', 'shadow-lg', 'shadow-primary/20', 'font-bold'];

            buttons.forEach(btn => {
                btn.classList.add(...inactiveClasses);
                btn.classList.remove(...activeClasses);
            });

            if(btnElement) {
                btnElement.classList.remove(...inactiveClasses);
                btnElement.classList.add(...activeClasses);
            }

            const cards = document.querySelectorAll('.package-card');
            cards.forEach(card => {
                card.classList.remove('aos-animate');
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('aos-animate'), 50);
                } else {
                    card.style.display = 'none';
                }
            });
            setTimeout(() => { AOS.refresh(); }, 100);
        }

        // Navigation Logic
        function navigateTo(page, sectionId = null) {
            const pages = ['landing-page', 'packages-page', 'about-page', 'blog-page', 'contact-page', 'faq-page', 'team-page'];
            const targetPage = page === 'home' ? 'landing-page' : page + '-page';
            pages.forEach(p => { const el = document.getElementById(p); if(el) el.classList.add('hidden'); });
            const targetEl = document.getElementById(targetPage);
            if(targetEl) {
                targetEl.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => AOS.refresh(), 100);
            }
            document.getElementById('mobile-menu').classList.add('hidden');
            if (page === 'home' && sectionId) {
                setTimeout(() => {
                    const section = document.getElementById(sectionId);
                    if(section) section.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }

        // Accordion Logic
        function toggleAccordion(button) {
            const item = button.parentElement;
            const content = button.nextElementSibling;
            const allItems = document.querySelectorAll('.accordion-item');
            allItems.forEach(i => { if(i !== item) { i.classList.remove('active'); } });
            item.classList.toggle('active');
        }

        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        btn.addEventListener('click', () => { menu.classList.toggle('hidden'); });

        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 20) {
                navbar.classList.add('shadow-lg', 'bg-slate-900/90');
                navbar.classList.remove('liquid-glass', 'border-b-0');
            } else {
                navbar.classList.remove('shadow-lg', 'bg-slate-900/90');
                navbar.classList.add('liquid-glass', 'border-b-0');
            }
        });

        function openBookingPage(destination = '') {
            const page = document.getElementById('booking-page');
            const destInput = document.getElementById('modal-destination');
            if(destination) destInput.value = destination;
            document.body.classList.add('modal-open');
            page.classList.remove('translate-y-full');
        }

        function closeBookingPage() {
            const page = document.getElementById('booking-page');
            page.classList.add('translate-y-full');
            setTimeout(() => { document.body.classList.remove('modal-open'); }, 600);
        }

        function handleSearch(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
            setTimeout(() => {
                btn.innerHTML = originalIcon;
                showToast('Searching available tours...');
                navigateTo('packages');
            }, 1000);
        }

        function handleSubscribe(e) {
            e.preventDefault();
            const input = e.target.querySelector('input');
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Subscribing...';
            setTimeout(() => {
                input.value = '';
                btn.innerText = originalText;
                showToast('Thank you for subscribing!');
            }, 1000);
        }

        function handleBooking(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Processing...';
            setTimeout(() => {
                closeBookingPage();
                btn.innerHTML = originalText;
                setTimeout(() => { showToast('Booking request sent successfully!'); }, 600);
                e.target.reset();
            }, 1500);
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-message').innerText = message;
            toast.classList.remove('translate-x-full', 'opacity-0');
            setTimeout(() => { toast.classList.add('translate-x-full', 'opacity-0'); }, 4000);
        }
