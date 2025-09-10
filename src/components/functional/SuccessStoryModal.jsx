import React, { useState, useEffect } from 'react';
import '../../css/success-stories.css';

const SuccessStoryModal = ({ stories }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const openModal = (story) => {
    setSelectedStory(story);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelectedStory(null), 300);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <>
      {/* Success Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => openModal(story)}
            className="story-card bg-white border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-[#FF9E10]"
          >
            <div className="story-header mb-4">
              <div className="flex justify-between items-start mb-3">
                <span className="story-type-badge inline-block">
                  {story.type}
                </span>
                <div className="story-amount">
                  {story.amount}
                </div>
              </div>
              <h3 className="story-title">
                {story.title}
              </h3>
              <div className="story-business">
                {story.business}
              </div>
            </div>

            <div className="story-details space-y-3">
              <div>
                <h4 className="story-section-heading">Challenge:</h4>
                <p className="story-section-text line-clamp-3">{story.challenge}</p>
              </div>
              <div>
                <h4 className="story-section-heading">Result:</h4>
                <p className="story-section-text font-medium line-clamp-3">{story.result}</p>
              </div>
              <div className="story-read-more">
                Read Full Case Study
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div 
          className={`story-modal fixed inset-0 z-[10000] flex items-center justify-center ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: 'opacity 300ms' }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeModal}
          />
          
          {/* Modal Container */}
          <div 
            className="relative w-full max-w-4xl mx-4 my-8 max-h-[90vh] flex"
          >
            {/* Modal Content */}
            <div 
              className="relative bg-white w-full shadow-2xl overflow-y-auto"
              style={{ maxHeight: '85vh' }}
            >
            {/* Close Button - Sticky at top */}
            <button
              onClick={closeModal}
              className="sticky top-4 right-4 float-right text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white rounded-full p-2 shadow-lg mr-4 mt-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {selectedStory && (
              <div className="p-8 lg:p-12 clear-both">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="modal-type-badge inline-block">
                      {selectedStory.type}
                    </span>
                    <span className="modal-location-badge inline-block">
                      {selectedStory.location || 'Queensland'}
                    </span>
                    {selectedStory.industry && (
                      <span className="modal-industry-badge inline-block">
                        {selectedStory.industry}
                      </span>
                    )}
                  </div>
                  <h2 className="modal-title mb-4">
                    {selectedStory.title}
                  </h2>
                  <div className="flex items-center justify-between">
                    <div className="modal-business">
                      {selectedStory.business}
                    </div>
                    <div className="modal-amount">
                      {selectedStory.amount}
                    </div>
                  </div>
                </div>

                {/* Story Content */}
                <div className="space-y-6">
                  {/* Challenge Section */}
                  <div className="border-l-4 border-[#f97316] pl-6">
                    <h3 className="modal-section-heading mb-3">
                      The Challenge
                    </h3>
                    <p className="modal-section-text">
                      {selectedStory.challenge}
                    </p>
                  </div>

                  {/* Solution Section */}
                  <div className="border-l-4 border-[#f97316] pl-6">
                    <h3 className="modal-section-heading mb-3">
                      Our Solution
                    </h3>
                    <p className="modal-section-text">
                      {selectedStory.solution}
                    </p>
                    {selectedStory.terms && (
                      <div className="mt-4 bg-gray-50 p-4">
                        <h4 className="modal-terms-heading mb-2">Key Terms:</h4>
                        <ul className="space-y-1">
                          {selectedStory.terms.map((term, index) => (
                            <li key={index} className="modal-terms-text flex items-start">
                              <span className="text-[#f97316] mr-2">•</span>
                              {term}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Process Section */}
                  {selectedStory.process && (
                    <div className="border-l-4 border-[#f97316] pl-6">
                      <h3 className="modal-section-heading mb-3">
                        The Process
                      </h3>
                      <p className="modal-section-text">
                        {selectedStory.process}
                      </p>
                    </div>
                  )}

                  {/* Results Section */}
                  <div className="border-l-4 border-[#f97316] pl-6">
                    <h3 className="modal-section-heading mb-3">
                      The Results
                    </h3>
                    <p className="modal-section-text mb-4">
                      {selectedStory.result}
                    </p>
                    {selectedStory.metrics && (
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {selectedStory.metrics.map((metric, index) => (
                          <div key={index} className="bg-gray-50 p-4 text-center">
                            <div className="modal-metric-value mb-1">
                              {metric.value}
                            </div>
                            <div className="modal-metric-label">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Testimonial */}
                  {selectedStory.testimonial && (
                    <div className="bg-gray-50 p-6 border-l-4 border-[#f97316]">
                      <svg className="w-8 h-8 text-[#f97316] mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="modal-testimonial mb-4">
                        "{selectedStory.testimonial}"
                      </p>
                      <div className="modal-client-name">
                        — {selectedStory.clientName || 'Business Owner'}, {selectedStory.business}
                      </div>
                    </div>
                  )}

                  {/* CTA Section */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="modal-cta-heading mb-4 text-center">
                      Ready to Write Your Success Story?
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="/finance-ready-assessment"
                        className="inline-block bg-[#f97316] text-white font-medium px-8 py-4 text-center transition-colors duration-300 hover:bg-orange-600"
                      >
                        Take Finance Ready Assessment
                      </a>
                      <a
                        href="tel:1300280895"
                        className="inline-block border-2 border-[#1C2C3B] text-[#1C2C3B] font-medium px-8 py-4 text-center transition-colors duration-300 hover:bg-[#1C2C3B] hover:text-white"
                      >
                        Call 1300 280 895
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessStoryModal;