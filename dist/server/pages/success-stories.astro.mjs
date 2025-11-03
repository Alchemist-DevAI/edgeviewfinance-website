/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CFmvZ5j4.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
/* empty css                                           */
export { renderers } from '../renderers.mjs';

const SuccessStoryModal = ({ stories }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const openModal = (story) => {
    setSelectedStory(story);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
    setTimeout(() => setSelectedStory(null), 300);
  };
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: stories.map((story) => /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => openModal(story),
        className: "story-card bg-white border border-gray-200 p-8 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-[#FF9E10]",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "story-header mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
              /* @__PURE__ */ jsx("span", { className: "story-type-badge inline-block", children: story.type }),
              /* @__PURE__ */ jsx("div", { className: "story-amount", children: story.amount })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "story-title", children: story.title }),
            /* @__PURE__ */ jsx("div", { className: "story-business", children: story.business })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "story-details space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "story-section-heading", children: "Challenge:" }),
              /* @__PURE__ */ jsx("p", { className: "story-section-text line-clamp-3", children: story.challenge })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "story-section-heading", children: "Result:" }),
              /* @__PURE__ */ jsx("p", { className: "story-section-text font-medium line-clamp-3", children: story.result })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "story-read-more", children: [
              "Read Full Case Study",
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 ml-2", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
            ] })
          ] })
        ]
      },
      story.id
    )) }),
    isOpen && /* @__PURE__ */ jsxs(
      "div",
      {
        className: `story-modal fixed inset-0 z-[10000] flex items-center justify-center ${isOpen ? "opacity-100" : "opacity-0"}`,
        style: { transition: "opacity 300ms" },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-black bg-opacity-50",
              onClick: closeModal
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "relative w-full max-w-4xl mx-4 my-8 max-h-[90vh] flex",
              children: /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "relative bg-white w-full shadow-2xl overflow-y-auto",
                  style: { maxHeight: "85vh" },
                  children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: closeModal,
                        className: "sticky top-4 right-4 float-right text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white rounded-full p-2 shadow-lg mr-4 mt-4",
                        children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) })
                      }
                    ),
                    selectedStory && /* @__PURE__ */ jsxs("div", { className: "p-8 lg:p-12 clear-both", children: [
                      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mb-4", children: [
                          /* @__PURE__ */ jsx("span", { className: "modal-type-badge inline-block", children: selectedStory.type }),
                          /* @__PURE__ */ jsx("span", { className: "modal-location-badge inline-block", children: selectedStory.location || "Queensland" }),
                          selectedStory.industry && /* @__PURE__ */ jsx("span", { className: "modal-industry-badge inline-block", children: selectedStory.industry })
                        ] }),
                        /* @__PURE__ */ jsx("h2", { className: "modal-title mb-4", children: selectedStory.title }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                          /* @__PURE__ */ jsx("div", { className: "modal-business", children: selectedStory.business }),
                          /* @__PURE__ */ jsx("div", { className: "modal-amount", children: selectedStory.amount })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
                        /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-[#f97316] pl-6", children: [
                          /* @__PURE__ */ jsx("h3", { className: "modal-section-heading mb-3", children: "The Challenge" }),
                          /* @__PURE__ */ jsx("p", { className: "modal-section-text", children: selectedStory.challenge })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-[#f97316] pl-6", children: [
                          /* @__PURE__ */ jsx("h3", { className: "modal-section-heading mb-3", children: "Our Solution" }),
                          /* @__PURE__ */ jsx("p", { className: "modal-section-text", children: selectedStory.solution }),
                          selectedStory.terms && /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-gray-50 p-4", children: [
                            /* @__PURE__ */ jsx("h4", { className: "modal-terms-heading mb-2", children: "Key Terms:" }),
                            /* @__PURE__ */ jsx("ul", { className: "space-y-1", children: selectedStory.terms.map((term, index) => /* @__PURE__ */ jsxs("li", { className: "modal-terms-text flex items-start", children: [
                              /* @__PURE__ */ jsx("span", { className: "text-[#f97316] mr-2", children: "•" }),
                              term
                            ] }, index)) })
                          ] })
                        ] }),
                        selectedStory.process && /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-[#f97316] pl-6", children: [
                          /* @__PURE__ */ jsx("h3", { className: "modal-section-heading mb-3", children: "The Process" }),
                          /* @__PURE__ */ jsx("p", { className: "modal-section-text", children: selectedStory.process })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-[#f97316] pl-6", children: [
                          /* @__PURE__ */ jsx("h3", { className: "modal-section-heading mb-3", children: "The Results" }),
                          /* @__PURE__ */ jsx("p", { className: "modal-section-text mb-4", children: selectedStory.result }),
                          selectedStory.metrics && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6", children: selectedStory.metrics.map((metric, index) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-4 text-center", children: [
                            /* @__PURE__ */ jsx("div", { className: "modal-metric-value mb-1", children: metric.value }),
                            /* @__PURE__ */ jsx("div", { className: "modal-metric-label", children: metric.label })
                          ] }, index)) })
                        ] }),
                        selectedStory.testimonial && /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-6 border-l-4 border-[#f97316]", children: [
                          /* @__PURE__ */ jsx("svg", { className: "w-8 h-8 text-[#f97316] mb-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" }) }),
                          /* @__PURE__ */ jsxs("p", { className: "modal-testimonial mb-4", children: [
                            '"',
                            selectedStory.testimonial,
                            '"'
                          ] }),
                          /* @__PURE__ */ jsxs("div", { className: "modal-client-name", children: [
                            "— ",
                            selectedStory.clientName || "Business Owner",
                            ", ",
                            selectedStory.business
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "mt-8 pt-8 border-t border-gray-200", children: [
                          /* @__PURE__ */ jsx("h3", { className: "modal-cta-heading mb-4 text-center", children: "Ready to Write Your Success Story?" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
                            /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "/finance-ready-assessment",
                                className: "inline-block bg-[#f97316] text-white font-medium px-8 py-4 text-center transition-colors duration-300 hover:bg-orange-600",
                                children: "Take Finance Ready Assessment"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "a",
                              {
                                href: "tel:1300280895",
                                className: "inline-block border-2 border-[#1C2C3B] text-[#1C2C3B] font-medium px-8 py-4 text-center transition-colors duration-300 hover:bg-[#1C2C3B] hover:text-white",
                                children: "Call 1300 280 895"
                              }
                            )
                          ] })
                        ] })
                      ] })
                    ] })
                  ]
                }
              )
            }
          )
        ]
      }
    )
  ] });
};

const $$SuccessStories = createComponent(($$result, $$props, $$slots) => {
  const title = "Success Stories | Commercial Finance Results | Edgeview Finance";
  const description = "Real success stories from 100+ businesses. See how we've helped secure over $500M+ in commercial finance across equipment, property, and working capital.";
  const keywords = "commercial finance success stories, business funding results, equipment finance case studies, commercial property finance Brisbane";
  const successStories = [
    {
      id: 1,
      title: "Commercial Property Purchase",
      business: "High-Access Property Maintenance Business",
      amount: "$670,000",
      type: "Commercial Property",
      location: "Gold Coast, QLD",
      industry: "Specialised Trade Services",
      challenge: "After three successful years of trading, this specialised high-access property maintenance business had reached a critical growth juncture. Operating from the owner's home had become untenable - equipment and stock storage were overwhelming the domestic space, and the business needed a professional premises to support continued expansion. The business owner faced a strategic decision: commit to ongoing rental payments to a landlord or leverage the equity built in his home to acquire a commercial property.",
      solution: "Edgeview Finance structured a comprehensive $670,000 commercial property purchase facility that addressed both immediate operational needs and long-term strategic objectives. The finance solution utilised multiple security elements including the commercial property being purchased, supporting residential equity, corporate guarantee, and personal guarantees to achieve 100% finance with no cash deposit required while optimising the interest rate.",
      process: "Edgeview Finance's systematic approach ensured smooth execution from initial consultation through to settlement in just 44 calendar days. As an existing residential client, comprehensive client information was already available, minimising documentation requests. The team conducted thorough borrowing capacity analysis, worked directly with the client's accountant, selected a major bank lender that could maximise borrowing capacity, and maintained consistent communication throughout to ensure timely settlement.",
      result: "The commercial property purchase delivered immediate operational transformation by successfully relocating all equipment and stock to professional premises, eliminating space constraints. Monthly loan repayments were structured lower than equivalent rental payments while building equity. The business established a professional presence, maintained $1M+ annual revenue capacity, and created additional income streams by subletting unused factory space to accelerate loan repayment.",
      terms: [
        "100% finance with no deposit required",
        "Competitive commercial lending rate",
        "25-year loan term",
        "Principal and interest repayments"
      ],
      metrics: [
        { value: "100%", label: "Finance with no deposit" },
        { value: "44 days", label: "Settlement timeframe" },
        { value: "$670K", label: "Total facility" }
      ],
      testimonial: "Working with Edgeview Finance made what could have been a complex process surprisingly straightforward. They understood our business needs from day one and structured a solution that not only solved our immediate space problem but positioned us for long-term growth. The fact that our loan repayments are actually lower than what we would have paid in rent, while we're building equity in our own asset, made this decision easy. The team's professionalism and their existing relationship with our accountant meant minimal time requirements from us. We're now generating additional income by subletting part of the space, which is accelerating our loan repayment even further.",
      clientName: "Business Owner",
      keywords: ["commercial property finance", "Gold Coast business loan", "rope access services", "100% commercial finance", "trade business property"],
      category: "Property Purchase",
      featured: true,
      publishDate: "2025-01-03"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "keywords": keywords, "data-astro-cid-to23xn4u": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden" data-astro-cid-to23xn4u> <!-- Hero Section --> <section class="hero-section py-24 bg-white" data-astro-cid-to23xn4u> <div class="container-default max-w-6xl mx-auto px-4" data-astro-cid-to23xn4u> <div class="text-center" data-astro-cid-to23xn4u> <div class="text-lg font-medium text-[#f97316] mb-4" data-astro-cid-to23xn4u>Proven Results</div> <h1 class="font-InstrumentSans text-5xl lg:text-6xl font-bold text-[#1C2C3B] mb-6" data-astro-cid-to23xn4u>
Real Success Stories From Business Clients
</h1> <p class="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8" data-astro-cid-to23xn4u>
See how we've helped businesses like yours secure over $500M+ in commercial & business finance. From equipment loans to property acquisitions, these are their stories.
</p> <div class="flex flex-col items-center" data-astro-cid-to23xn4u> <div class="flex flex-col sm:flex-row gap-4 justify-center mb-3" data-astro-cid-to23xn4u> <a href="/finance-ready-assessment" class="inline-block bg-[#f97316] text-white font-medium px-8 py-4 text-center transition-colors duration-300 hover:bg-orange-600" data-astro-cid-to23xn4u>
Take Finance Ready Assessment
</a> <a href="#stories" class="inline-block border-2 border-[#1C2C3B] text-[#1C2C3B] font-medium px-8 py-4 text-center transition-colors duration-300 hover:bg-[#1C2C3B] hover:text-white" data-astro-cid-to23xn4u>
Browse Success Stories
</a> </div> <div class="text-sm text-gray-500 text-center" data-astro-cid-to23xn4u>
(Complete the Finance Readiness Assessment in 30 secs. No Personal Details Required.)
</div> </div> </div> </div> </section> <!-- Results Overview --> <section class="results-overview py-16 bg-gray-50" data-astro-cid-to23xn4u> <div class="container-default max-w-6xl mx-auto px-4" data-astro-cid-to23xn4u> <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center" data-astro-cid-to23xn4u> <div data-astro-cid-to23xn4u> <div class="text-3xl lg:text-4xl font-bold text-[#1C2C3B] mb-2" data-astro-cid-to23xn4u>100+</div> <div class="text-gray-600" data-astro-cid-to23xn4u>Businesses Funded</div> </div> <div data-astro-cid-to23xn4u> <div class="text-3xl lg:text-4xl font-bold text-[#1C2C3B] mb-2" data-astro-cid-to23xn4u>$500M+</div> <div class="text-gray-600" data-astro-cid-to23xn4u>Total Finance Arranged</div> </div> <div data-astro-cid-to23xn4u> <div class="text-3xl lg:text-4xl font-bold text-[#1C2C3B] mb-2" data-astro-cid-to23xn4u>98%</div> <div class="text-gray-600" data-astro-cid-to23xn4u>Client Satisfaction Rate</div> </div> <div data-astro-cid-to23xn4u> <div class="text-3xl lg:text-4xl font-bold text-[#1C2C3B] mb-2" data-astro-cid-to23xn4u>20+</div> <div class="text-gray-600" data-astro-cid-to23xn4u>Years Experience</div> </div> </div> </div> </section> <!-- Success Stories Grid --> <section id="stories" class="success-stories py-16 bg-white" data-astro-cid-to23xn4u> <div class="container-default max-w-6xl mx-auto px-4" data-astro-cid-to23xn4u> <h2 class="font-InstrumentSans text-4xl font-bold text-[#1C2C3B] mb-12 text-center" data-astro-cid-to23xn4u>
Recent Success Stories
</h2> ${renderComponent($$result2, "SuccessStoryModal", SuccessStoryModal, { "stories": successStories, "client:load": true, "client:component-hydration": "load", "client:component-path": "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/functional/SuccessStoryModal.jsx", "client:component-export": "default", "data-astro-cid-to23xn4u": true })} <div class="text-center mt-12" data-astro-cid-to23xn4u> <p class="text-gray-600 mb-6" data-astro-cid-to23xn4u>
Ready to write your own success story?
</p> <a href="/finance-ready-assessment" class="inline-block bg-[#f97316] text-white font-medium px-8 py-4 transition-colors duration-300 hover:bg-orange-600" data-astro-cid-to23xn4u>
Take Finance Ready Assessment
</a> </div> </div> </section> </main> ` })} `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/success-stories.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/success-stories.astro";
const $$url = "/success-stories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SuccessStories,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
