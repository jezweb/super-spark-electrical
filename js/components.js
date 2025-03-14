/**
 * components.js
 * 
 * This file contains reusable components and functionality for the Super Spark Electrical website.
 * It follows a modular pattern to make components easy to maintain and extend.
 * 
 * Related files:
 * - script.js: Main JavaScript file that uses these components
 * - index.html: The HTML file where these components are used
 */

// Namespace to avoid global scope pollution
const SuperSparkComponents = (function() {
  'use strict';
  
  /**
   * Component: Testimonial Carousel
   * Manages the testimonial slider functionality
   */
  const testimonialCarousel = {
    currentSlide: 0,
    slides: [],
    dots: [],
    
    /**
     * Initialize the testimonial carousel
     */
    init: function() {
      // Get all slides and dots
      this.slides = document.querySelectorAll('.testimonial-slide');
      this.dots = document.querySelectorAll('.testimonial-dot');
      
      if (this.slides.length === 0) return;
      
      // Set up event listeners for controls
      const prevBtn = document.querySelector('.testimonial-prev');
      const nextBtn = document.querySelector('.testimonial-next');
      
      if (prevBtn) {
        prevBtn.addEventListener('click', () => this.prevSlide());
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => this.nextSlide());
      }
      
      // Set up event listeners for dots
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
      });
      
      // Show the first slide
      this.showSlide(0);
      
      // Auto-rotate slides every 5 seconds
      setInterval(() => this.nextSlide(), 5000);
    },
    
    /**
     * Show a specific slide
     * @param {number} index - The index of the slide to show
     */
    showSlide: function(index) {
      // Ensure index is within bounds
      if (index < 0) {
        index = this.slides.length - 1;
      } else if (index >= this.slides.length) {
        index = 0;
      }
      
      // Hide all slides and remove active class from dots
      this.slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      this.dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show the selected slide and activate corresponding dot
      this.slides[index].classList.add('active');
      if (this.dots[index]) {
        this.dots[index].classList.add('active');
      }
      
      this.currentSlide = index;
    },
    
    /**
     * Go to the next slide
     */
    nextSlide: function() {
      this.showSlide(this.currentSlide + 1);
    },
    
    /**
     * Go to the previous slide
     */
    prevSlide: function() {
      this.showSlide(this.currentSlide - 1);
    },
    
    /**
     * Go to a specific slide
     * @param {number} index - The index of the slide to show
     */
    goToSlide: function(index) {
      this.showSlide(index);
    }
  };
  
  /**
   * Component: Service Toggles
   * Handles the expanding/collapsing of service details
   */
  const serviceToggles = {
    /**
     * Initialize service toggles
     */
    init: function() {
      const toggles = document.querySelectorAll('.service-toggle');
      
      toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
          // Toggle active class on the button
          this.classList.toggle('active');
          
          // Find the associated content
          const serviceCard = this.closest('.service-card');
          const moreContent = serviceCard.querySelector('.service-more');
          
          // Toggle the content visibility
          if (moreContent) {
            moreContent.classList.toggle('active');
          }
        });
      });
    }
  };
  
  /**
   * Component: Gallery Lightbox
   * Manages the image gallery lightbox functionality
   */
  const galleryLightbox = {
    lightbox: null,
    lightboxImage: null,
    lightboxCaption: null,
    
    /**
     * Initialize the gallery lightbox
     */
    init: function() {
      // Get lightbox elements
      this.lightbox = document.querySelector('.lightbox');
      this.lightboxImage = document.querySelector('.lightbox-image');
      this.lightboxCaption = document.querySelector('.lightbox-caption');
      
      if (!this.lightbox) return;
      
      // Set up gallery item click events
      const galleryItems = document.querySelectorAll('.gallery-item');
      
      galleryItems.forEach(item => {
        item.addEventListener('click', () => {
          const imgSrc = item.querySelector('img').getAttribute('src');
          const caption = item.querySelector('.gallery-caption').textContent;
          this.openLightbox(imgSrc, caption);
        });
      });
      
      // Set up close button
      const closeBtn = document.querySelector('.lightbox-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.closeLightbox());
      }
      
      // Close lightbox when clicking outside the image
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });
      
      // Close lightbox with Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
          this.closeLightbox();
        }
      });
    },
    
    /**
     * Open the lightbox with the specified image and caption
     * @param {string} imgSrc - The source URL of the image
     * @param {string} caption - The caption for the image
     */
    openLightbox: function(imgSrc, caption) {
      this.lightboxImage.setAttribute('src', imgSrc);
      this.lightboxCaption.textContent = caption;
      this.lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    },
    
    /**
     * Close the lightbox
     */
    closeLightbox: function() {
      this.lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  };
  
  /**
   * Component: Gallery Filters
   * Handles filtering of gallery items by category
   */
  const galleryFilters = {
    /**
     * Initialize gallery filters
     */
    init: function() {
      const filters = document.querySelectorAll('.gallery-filter');
      const galleryItems = document.querySelectorAll('.gallery-item');
      
      if (filters.length === 0) return;
      
      filters.forEach(filter => {
        filter.addEventListener('click', function() {
          // Remove active class from all filters
          filters.forEach(f => f.classList.remove('active'));
          
          // Add active class to clicked filter
          this.classList.add('active');
          
          // Get the filter category
          const category = this.getAttribute('data-filter');
          
          // Show/hide gallery items based on category
          galleryItems.forEach(item => {
            if (category === 'all') {
              item.style.display = 'block';
            } else {
              if (item.getAttribute('data-category') === category) {
                item.style.display = 'block';
              } else {
                item.style.display = 'none';
              }
            }
          });
        });
      });
      
      // Activate the "All" filter by default
      const allFilter = document.querySelector('.gallery-filter[data-filter="all"]');
      if (allFilter) {
        allFilter.classList.add('active');
      }
    }
  };
  
  /**
   * Component: Form Validation
   * Validates the contact form before submission
   */
  const formValidation = {
    form: null,
    
    /**
     * Initialize form validation
     */
    init: function() {
      this.form = document.querySelector('.contact-form');
      
      if (!this.form) return;
      
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (this.validateForm()) {
          // Show success message
          this.showMessage('Your message has been sent successfully!', 'success');
          
          // Reset the form
          this.form.reset();
        }
      });
    },
    
    /**
     * Validate the form fields
     * @returns {boolean} - Whether the form is valid
     */
    validateForm: function() {
      let isValid = true;
      
      // Get form fields
      const name = this.form.querySelector('[name="name"]');
      const email = this.form.querySelector('[name="email"]');
      const phone = this.form.querySelector('[name="phone"]');
      const message = this.form.querySelector('[name="message"]');
      
      // Remove any existing error messages
      const errorElements = this.form.querySelectorAll('.error-message');
      errorElements.forEach(el => el.remove());
      
      // Validate name
      if (!name.value.trim()) {
        this.showError(name, 'Please enter your name');
        isValid = false;
      }
      
      // Validate email
      if (!email.value.trim()) {
        this.showError(email, 'Please enter your email');
        isValid = false;
      } else if (!this.isValidEmail(email.value)) {
        this.showError(email, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate phone (optional but must be valid if provided)
      if (phone.value.trim() && !this.isValidPhone(phone.value)) {
        this.showError(phone, 'Please enter a valid phone number');
        isValid = false;
      }
      
      // Validate message
      if (!message.value.trim()) {
        this.showError(message, 'Please enter your message');
        isValid = false;
      }
      
      return isValid;
    },
    
    /**
     * Show an error message for a form field
     * @param {HTMLElement} field - The form field
     * @param {string} message - The error message
     */
    showError: function(field, message) {
      // Create error message element
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.color = 'red';
      errorDiv.style.fontSize = '0.8rem';
      errorDiv.style.marginTop = '5px';
      errorDiv.textContent = message;
      
      // Insert error message after the field
      field.parentNode.appendChild(errorDiv);
      
      // Highlight the field
      field.style.borderColor = 'red';
      
      // Remove highlight when field is focused
      field.addEventListener('focus', function() {
        this.style.borderColor = '';
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
          errorMsg.remove();
        }
      });
    },
    
    /**
     * Show a form submission message
     * @param {string} message - The message to display
     * @param {string} type - The message type ('success' or 'error')
     */
    showMessage: function(message, type) {
      // Create message element
      const messageDiv = document.createElement('div');
      messageDiv.className = `form-message ${type}`;
      messageDiv.style.padding = '10px';
      messageDiv.style.marginTop = '15px';
      messageDiv.style.borderRadius = '4px';
      
      if (type === 'success') {
        messageDiv.style.backgroundColor = '#d4edda';
        messageDiv.style.color = '#155724';
      } else {
        messageDiv.style.backgroundColor = '#f8d7da';
        messageDiv.style.color = '#721c24';
      }
      
      messageDiv.textContent = message;
      
      // Add message to the form
      this.form.appendChild(messageDiv);
      
      // Remove message after 5 seconds
      setTimeout(() => {
        messageDiv.remove();
      }, 5000);
    },
    
    /**
     * Validate an email address
     * @param {string} email - The email to validate
     * @returns {boolean} - Whether the email is valid
     */
    isValidEmail: function(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
    
    /**
     * Validate a phone number
     * @param {string} phone - The phone number to validate
     * @returns {boolean} - Whether the phone number is valid
     */
    isValidPhone: function(phone) {
      // Allow digits, spaces, parentheses, hyphens, and plus sign
      const regex = /^[0-9\s()+\-]+$/;
      return regex.test(phone);
    }
  };
  
  /**
   * Component: Smooth Scroll
   * Enables smooth scrolling to page sections
   */
  const smoothScroll = {
    /**
     * Initialize smooth scrolling
     */
    init: function() {
      const navLinks = document.querySelectorAll('.nav-link');
      
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          // Get the target section id from the href
          const targetId = this.getAttribute('href');
          
          // Only process if it's an internal link
          if (targetId.startsWith('#')) {
            e.preventDefault();
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
              // Get the height of the fixed header
              const headerHeight = document.querySelector('.header').offsetHeight;
              
              // Calculate the target position
              const targetPosition = targetSection.offsetTop - headerHeight;
              
              // Scroll to the target
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
              
              // Close mobile menu if open
              const navMenu = document.querySelector('.nav-menu');
              const hamburger = document.querySelector('.hamburger');
              
              if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
              }
            }
          }
        });
      });
    }
  };
  
  // Return public methods and properties
  return {
    initTestimonialCarousel: testimonialCarousel.init.bind(testimonialCarousel),
    initServiceToggles: serviceToggles.init.bind(serviceToggles),
    initGalleryLightbox: galleryLightbox.init.bind(galleryLightbox),
    initGalleryFilters: galleryFilters.init.bind(galleryFilters),
    initFormValidation: formValidation.init.bind(formValidation),
    initSmoothScroll: smoothScroll.init.bind(smoothScroll)
  };
})();