document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Pause auto-rotation on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }, 5000);
    });
    
    // Booking Modal
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    const closeSuccessModal = document.querySelector('.close-success-modal');
    const successModal = document.getElementById('successModal');
    
    bookNowBtn.addEventListener('click', function() {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', function() {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    closeSuccessModal.addEventListener('click', function() {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form Submissions
    const bookingForm = document.getElementById('bookingForm');
    const quickBookingForm = document.getElementById('quickBookingForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would send this data to your backend
        console.log('Booking form submitted:', {
            name: this.name.value,
            email: this.email.value,
            phone: this.phone.value,
            service: this.service.value,
            therapist: this.therapist.value,
            date: this.date.value,
            time: this.time.value,
            notes: this.notes.value
        });
        
        this.reset();
        bookingModal.classList.remove('active');
        successModal.classList.add('active');
    });
    
    quickBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would send this data to your backend
        console.log('Quick booking form submitted:', {
            name: this.quickName.value,
            phone: this.quickPhone.value,
            date: this.quickDate.value
        });
        
        this.reset();
        bookingModal.classList.remove('active');
        successModal.classList.add('active');
    });
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        // In a real app, you would send this data to your backend
        console.log('Newsletter subscription:', emailInput.value);
        
        // Show a simple alert (in a real app, you might show a nicer notification)
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    });
    
    // Set minimum date for booking to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    document.getElementById('quickDate').min = today;
    
    // Sticky Header on Scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    // Initialize first testimonial
    showTestimonial(0);
});
