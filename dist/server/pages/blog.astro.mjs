/* empty css                                 */
import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate, d as renderScript, r as renderComponent } from '../chunks/astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import { g as getCollection, $ as $$Layout } from '../chunks/Layout_D_HeogzB.mjs';
import { $ as $$BlogCard } from '../chunks/BlogCard_C56F3LHD.mjs';
import 'clsx';
/* empty css                                */
import { $ as $$NewsLetter } from '../chunks/NewsLetter_DLHpuT10.mjs';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://www.edgeviewfinance.com.au");
const $$BlogCategories = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BlogCategories;
  const { categories, activeCategory = "all" } = Astro2.props;
  const defaultCategories = [
    { name: "All Articles", slug: "all" },
    { name: "Equipment Finance", slug: "equipment-finance" },
    { name: "Commercial Property", slug: "commercial-property" },
    { name: "Working Capital", slug: "working-capital" },
    { name: "Business Growth", slug: "business-growth" },
    { name: "Finance Applications", slug: "finance-applications" }
  ];
  const displayCategories = categories.length > 0 ? categories : defaultCategories;
  return renderTemplate`${maybeRenderHead()}<div class="w-full overflow-x-auto" data-astro-cid-j73ptyau> <div class="flex flex-wrap justify-center lg:justify-end items-center gap-2 min-w-min" data-astro-cid-j73ptyau> <span class="text-ColorBlack font-InstrumentSans font-semibold text-sm mr-2 whitespace-nowrap" data-astro-cid-j73ptyau>Filter by Topic:</span> ${displayCategories.map(({ name, slug, count }) => renderTemplate`<button${addAttribute(slug, "data-category")}${addAttribute(`category-btn px-4 py-2 text-sm font-bold font-InstrumentSans whitespace-nowrap transition-all duration-300 border-2 ${activeCategory === slug ? "bg-[#f97316] text-white border-[#f97316] shadow-md" : "bg-white text-ColorBlack border-gray-300 hover:bg-[#f97316] hover:text-white hover:border-[#f97316]"}`, "class")} data-astro-cid-j73ptyau> ${name} ${count !== void 0 && renderTemplate`<span class="ml-2 text-xs opacity-75" data-astro-cid-j73ptyau>(${count})</span>`} </button>`)} </div> </div> `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Blog/BlogCategories.astro", void 0);

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$BlogSearch = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogSearch;
  const { placeholder = "Search finance insights..." } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="search-container relative w-full" data-astro-cid-wewzq2wr> <div class="relative" data-astro-cid-wewzq2wr> <input type="search" id="blog-search" class="search-input w-full px-4 py-3 pr-12 text-base border-2 border-gray-300 bg-white text-ColorBlack placeholder-gray-500 focus:border-ColorBlue focus:outline-none transition-colors duration-300 font-InstrumentSans"${addAttribute(placeholder, "placeholder")} aria-label="Search finance articles" style="min-width: 280px;" data-astro-cid-wewzq2wr> <button type="button" class="search-icon absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" data-astro-cid-wewzq2wr> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-wewzq2wr> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-wewzq2wr></path> </svg> </button> </div> <!-- Search Results Dropdown (hidden by default, shown via JavaScript) --> <div id="search-results" class="search-results absolute top-full left-0 right-0 bg-white border-2 border-ColorBlue shadow-xl max-h-96 overflow-y-auto z-50 hidden" data-astro-cid-wewzq2wr> <div class="p-4 text-center text-gray-600" data-astro-cid-wewzq2wr> <svg class="w-8 h-8 mb-2 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-wewzq2wr> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-wewzq2wr></path> </svg> <p class="text-sm font-InstrumentSans" data-astro-cid-wewzq2wr>Start typing to search finance articles...</p> </div> </div> </div> <!-- Search Results Template (hidden, used by JavaScript) --> <template id="search-result-template" data-astro-cid-wewzq2wr> <div class="search-result-item p-4 border-b border-gray-200 cursor-pointer hover:bg-ColorOffWhite transition-colors duration-200" data-astro-cid-wewzq2wr> <h4 class="search-result-title font-bold text-ColorBlack mb-1 text-sm font-InstrumentSans" data-astro-cid-wewzq2wr></h4> <p class="search-result-excerpt text-xs text-gray-600 mb-2 font-InstrumentSans" data-astro-cid-wewzq2wr></p> <div class="search-result-meta flex items-center gap-3 text-xs text-gray-500 font-InstrumentSans" data-astro-cid-wewzq2wr> <span class="category" data-astro-cid-wewzq2wr></span> <span class="read-time" data-astro-cid-wewzq2wr></span> </div> </div> </template> ${renderScript($$result, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Blog/BlogSearch.astro?astro&type=script&index=0&lang.ts")} `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Blog/BlogSearch.astro", void 0);

const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const allBlogs = await getCollection("blogs");
  const sortedBlogs = allBlogs.sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);
    return dateB.getTime() - dateA.getTime();
  });
  const featuredBlogs = sortedBlogs.filter((blog) => blog.data.featured);
  const regularBlogs = sortedBlogs.filter((blog) => !blog.data.featured);
  const uniqueCategories = [...new Set(allBlogs.map((blog) => blog.data.category))];
  const allCategories = [
    { name: "All Articles", slug: "all" },
    ...uniqueCategories.map((cat) => ({
      name: cat,
      slug: cat.toLowerCase().replace(/\s+/g, "-"),
      count: allBlogs.filter((blog) => blog.data.category === cat).length
    }))
  ];
  const pageTitle = "Finance Insights Blog | Expert Business Finance Insights | Edgeview Finance";
  const pageDescription = "Get insider finance knowledge from Queensland's specialist broker. 20+ years banking experience, proven strategies for businesses.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": pageDescription, "canonicalURL": "https://edgeviewfinance.com.au/blog", "data-astro-cid-ijnerlr2": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden" data-astro-cid-ijnerlr2> <!-- Blog Hero Section - White Background Like Homepage --> <section class="section-hero" data-astro-cid-ijnerlr2> <div class="relative z-10 overflow-hidden" data-astro-cid-ijnerlr2> <div class="pt-[10px] sm:pt-[15px] lg:pt-[20px] pb-8 lg:pb-12" data-astro-cid-ijnerlr2> <div class="container-default relative z-10" data-astro-cid-ijnerlr2> <div class="text-center" data-astro-cid-ijnerlr2> <!-- Main Headline from approved copy --> <h1 class="mb-6 font-InstrumentSans text-3xl sm:text-4xl lg:text-[48px] font-bold leading-[1.2] text-ColorBlack" data-astro-cid-ijnerlr2>
How Are Australian Businesses Really Getting Approved for Finance?
</h1> <!-- Subheadline from approved copy --> <h2 class="mb-6 text-xl lg:text-2xl font-semibold text-gray-700 font-InstrumentSans" data-astro-cid-ijnerlr2>
Get the insider knowledge that helps Australian businesses make smarter finance decisions
</h2> <!-- Value Proposition from approved copy --> <p class="mb-6 text-lg text-gray-600 font-InstrumentSans leading-relaxed max-w-4xl mx-auto" data-astro-cid-ijnerlr2>
20+ years of banking experience reveals what really works for businesses in finance applications. 
              No generic advice. No sales pressure. Just proven strategies from 100+ successful deals.
</p> <!-- Trust Indicator from approved copy --> <div class="mb-8 flex justify-center" data-astro-cid-ijnerlr2> <div class="inline-flex items-center gap-2 bg-[#f97316] bg-opacity-10 px-4 py-2" data-astro-cid-ijnerlr2> <svg class="w-5 h-5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-ijnerlr2></path> </svg> <span class="text-sm font-semibold text-[#1C2C3B] font-InstrumentSans" data-astro-cid-ijnerlr2>
20+ Years Banking Experience • 100+ Businesses Funded • Residential & Commercial Finance
</span> </div> </div> <!-- Primary CTA from approved copy --> <div class="flex flex-col items-center" data-astro-cid-ijnerlr2> <button id="newsletter-toggle-btn" class="bg-[#FF9E10] text-white px-8 py-4 font-bold transition-all duration-300 inline-block hover:bg-[#E68900] hover:shadow-lg mb-3 cursor-pointer" data-astro-cid-ijnerlr2>
Sign Up To Our Newsletter
</button> </div> <!-- Hidden Newsletter Form --> <div id="newsletter-form-section" class="hidden mt-8 max-w-xl mx-auto" data-astro-cid-ijnerlr2> <div class="p-8 bg-gray-50 border border-gray-200" data-astro-cid-ijnerlr2> <h3 class="font-bold text-2xl mb-3 text-[#1C2C3B] text-center font-InstrumentSans" data-astro-cid-ijnerlr2>
Get More Finance Insider Insights
</h3> <p class="text-base mb-6 text-gray-600 text-center font-InstrumentSans" data-astro-cid-ijnerlr2>
Join hundreds of business owners getting weekly finance strategies delivered to their inbox
</p> <form class="space-y-4" data-astro-cid-ijnerlr2> <input type="email" placeholder="Enter your email address" class="w-full px-4 py-3 border border-gray-300 text-base focus:outline-none focus:border-[#f97316] transition-colors font-InstrumentSans" required data-astro-cid-ijnerlr2> <button type="submit" class="w-full bg-white text-[#f97316] px-6 py-3 text-base font-semibold border-2 border-[#f97316] hover:bg-[#f97316] hover:text-white transition-colors font-InstrumentSans" data-astro-cid-ijnerlr2>
Get Finance Insider Insights
</button> </form> <div class="mt-6 flex justify-center gap-6 text-sm text-gray-500 font-InstrumentSans" data-astro-cid-ijnerlr2> <span class="flex items-center gap-1" data-astro-cid-ijnerlr2> <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-ijnerlr2></path> </svg>
No spam, ever
</span> <span class="flex items-center gap-1" data-astro-cid-ijnerlr2> <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-ijnerlr2></path> </svg>
Unsubscribe anytime
</span> <span class="flex items-center gap-1" data-astro-cid-ijnerlr2> <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-astro-cid-ijnerlr2></path> </svg>
Trades focused
</span> </div> </div> </div> </div> </div> </div> </div> </section> <!-- Search and Filter Section --> <section class="py-12 bg-white border-b border-gray-200" data-astro-cid-ijnerlr2> <div class="container-default" data-astro-cid-ijnerlr2> <div class="flex flex-col lg:flex-row gap-6 items-center justify-between" data-astro-cid-ijnerlr2> <!-- Search Component --> <div class="w-full lg:min-w-[400px] lg:flex-1 lg:max-w-lg" data-astro-cid-ijnerlr2> ${renderComponent($$result2, "BlogSearch", $$BlogSearch, { "data-astro-cid-ijnerlr2": true })} </div> <!-- Categories Filter --> <div class="w-full lg:w-auto flex-shrink-0" data-astro-cid-ijnerlr2> ${renderComponent($$result2, "BlogCategories", $$BlogCategories, { "categories": allCategories, "data-astro-cid-ijnerlr2": true })} </div> </div> </div> </section> <!-- Featured Articles Section --> ${featuredBlogs.length > 0 && renderTemplate`<section class="py-12 bg-ColorOffWhite" data-astro-cid-ijnerlr2> <div class="container-default" data-astro-cid-ijnerlr2> <div class="mb-16 text-center" data-astro-cid-ijnerlr2> <h2 class="mb-6 font-InstrumentSans text-3xl lg:text-4xl font-bold leading-[1.2] text-ColorBlack" data-astro-cid-ijnerlr2>
Latest Finance Insights
</h2> <p class="text-gray-600 text-lg lg:text-xl font-InstrumentSans leading-relaxed max-w-3xl mx-auto" data-astro-cid-ijnerlr2>
Banking insider knowledge that's helping businesses get approved faster, secure better terms and understanding the banking and finance landscape.
</p> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-astro-cid-ijnerlr2> ${featuredBlogs.slice(0, 2).map((blog) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "post": blog, "variant": "featured", "data-astro-cid-ijnerlr2": true })}`)} </div> </div> </section>`} <!-- All Articles Section --> <section class="py-12 bg-white" data-astro-cid-ijnerlr2> <div class="container-default" data-astro-cid-ijnerlr2> <div class="mb-16 text-center" data-astro-cid-ijnerlr2> <h2 class="all-articles-heading mb-6 font-InstrumentSans text-3xl lg:text-4xl font-bold leading-[1.2] text-ColorBlack" data-astro-cid-ijnerlr2>
All Articles
</h2> <p class="all-articles-subheading text-gray-600 text-lg lg:text-xl font-InstrumentSans leading-relaxed max-w-3xl mx-auto" data-astro-cid-ijnerlr2>
Weekly insights on business finance, equipment purchases, property investment, and cash flow optimisation.
</p> </div> <!-- Articles Grid --> <div id="articles-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-astro-cid-ijnerlr2> ${regularBlogs.map((blog) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "post": blog, "data-astro-cid-ijnerlr2": true })}`)}  ${featuredBlogs.slice(2).map((blog) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "post": blog, "data-astro-cid-ijnerlr2": true })}`)} </div> <!-- Load More Button (for future pagination) --> <div class="text-center mt-16" data-astro-cid-ijnerlr2> <button id="load-more-btn" class="bg-[#FF9E10] text-white px-8 py-4 font-bold font-InstrumentSans transition-all duration-300 hover:bg-[#e8890e] hover:shadow-lg hidden" data-astro-cid-ijnerlr2>
Load More Articles
</button> </div> </div> </section> <!-- Trust Section --> <section class="py-16 bg-ColorOffWhite" data-astro-cid-ijnerlr2> <div class="container-default text-center" data-astro-cid-ijnerlr2> <h3 class="text-2xl font-bold font-InstrumentSans mb-6 text-ColorBlack" data-astro-cid-ijnerlr2>
Trusted by Queensland Businesses
</h3> <div class="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600" data-astro-cid-ijnerlr2> <div class="flex items-center gap-2" data-astro-cid-ijnerlr2> <svg class="w-5 h-5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-astro-cid-ijnerlr2></path> </svg> <span class="font-InstrumentSans" data-astro-cid-ijnerlr2>Australian Credit License 459287</span> </div> <div class="flex items-center gap-2" data-astro-cid-ijnerlr2> <svg class="w-5 h-5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-ijnerlr2></path> </svg> <span class="font-InstrumentSans" data-astro-cid-ijnerlr2>20+ Years Banking Experience</span> </div> <div class="flex items-center gap-2" data-astro-cid-ijnerlr2> <svg class="w-5 h-5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" data-astro-cid-ijnerlr2></path> </svg> <span class="font-InstrumentSans" data-astro-cid-ijnerlr2>100+ Businesses Helped</span> </div> <div class="flex items-center gap-2" data-astro-cid-ijnerlr2> <svg class="w-5 h-5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-ijnerlr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-astro-cid-ijnerlr2></path> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-astro-cid-ijnerlr2></path> </svg> <span class="font-InstrumentSans" data-astro-cid-ijnerlr2>Queensland Based</span> </div> </div> </div> </section> </main>  ${renderComponent($$result2, "NewsLetter", $$NewsLetter, { "data-astro-cid-ijnerlr2": true })} ` })} ${renderScript($$result, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/blog.astro?astro&type=script&index=0&lang.ts")} `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/blog.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
