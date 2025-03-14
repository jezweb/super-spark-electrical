/**
 * script.js
 * 
 * Main JavaScript file for Super Spark Electrical website
 * This file initializes all components and handles the main functionality of the website.
 * 
 * Related files:
 * - components.js: Contains reusable components and functionality
 * - index.html: The HTML file where this script is used
 */

// Main application namespace
const SuperSparkApp = (function() {
  'use strict';
  
  /**
   * Initialize the application
   */
  function init() {
    // Initialize all components
    initComponents();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize back to top button
    initBackToTop();
  }
  
  /**
   * Initialize all components from components.js
   */
  function initComponents() {
    // Check if SuperSparkComponents is available
    if (typeof SuperSparkComponents !== 'undefined') {
      // Initialize testimonial carousel
      SuperSparkComponents.initTestimonialCarousel();
      
      // Initialize service toggles
      SuperSparkComponents.initServiceToggles();
      
      // Initialize gallery lightbox
      SuperSparkComponents.initGalleryLightbox();
      
      // Initialize gallery filters
      SuperSparkComponents.initGalleryFilters();
      
      // Initialize form validation
      SuperSparkComponents.initFormValidation();
      
      // Initialize smooth scroll
      SuperSparkComponents.initSmoothScroll();
    } else {
      console.error('SuperSparkComponents not found. Make sure components.js is loaded before script.js.');
    }
  }
  
  /**
   * Set up global event listeners
   */
  function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
    
    // Set active nav link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize on load
    window.addEventListener('load', function() {
      // Update active nav link on page load
      updateActiveNavLink();
      
      // Hide page loader if exists
      const loader = document.querySelector('.page-loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(function() {
          loader.style.display = 'none';
        }, 500);
      }
    });
  }
  
  /**
   * Initialize lazy loading for images
   */
  function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            
            // Remove data-src attribute once loaded
            img.addEventListener('load', function() {
              img.removeAttribute('data-src');
            });
            
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      function lazyLoad() {
        lazyImages.forEach(function(img) {
          if (isInViewport(img)) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
        });
      }
      
      // Initial check
      lazyLoad();
      
      // Check on scroll
      window.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
    }
  }
  
  /**
   * Initialize header scroll effect
   */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  /**
   * Initialize back to top button
   */
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  /**
   * Update active nav link based on scroll position
   */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    // Get current scroll position
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    // Find the current section
    sections.forEach(section => {
      const sectionTop = section.offsetTop - document.querySelector('.header').offsetHeight;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding link
        const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
  }
  
  /**
   * Check if an element is in the viewport
   * @param {HTMLElement} element - The element to check
   * @returns {boolean} - Whether the element is in the viewport
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  /**
   * Add animation effects to elements when they come into view
   */
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            animationObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      animatedElements.forEach(function(element) {
        animationObserver.observe(element);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      function checkAnimations() {
        animatedElements.forEach(function(element) {
          if (isInViewport(element)) {
            element.classList.add('animated');
          }
        });
      }
      
      // Initial check
      checkAnimations();
      
      // Check on scroll
      window.addEventListener('scroll', checkAnimations);
    }
  }
  
  // Return public methods
  return {
    init: init,
    initScrollAnimations: initScrollAnimations
  };
})();

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  SuperSparkApp.init();
  SuperSparkApp.initScrollAnimations();
});