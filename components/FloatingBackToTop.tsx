'use client';

import { useEffect, useState } from 'react';

export default function FloatingBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear previous timeout
      clearTimeout(timeoutId);
      
      // Add small delay to prevent flickering
      timeoutId = setTimeout(() => {
        // Get the category navigation element by ID
        const categoryNav = document.getElementById('category-navigation');
        
        if (categoryNav) {
          const navRect = categoryNav.getBoundingClientRect();
          // Show the button when the category navigation is not visible (scrolled past it)
          setIsVisible(navRect.bottom < 0);
        }
      }, 50);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial state
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <a
        href="#top"
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:-translate-y-1"
      >
        Back to Top
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </a>
    </div>
  );
}
