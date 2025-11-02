/* empty css                                    */
import { b as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate, d as renderScript, e as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import { g as getCollection, $ as $$Layout } from '../../chunks/Layout_BaAcztus.mjs';
import '../../chunks/index_BS0v8091.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_C4tS8mBi.mjs';
/* empty css                                     */
import { $ as $$NewsletterSignup } from '../../chunks/NewsletterSignup_DGyMqSMx.mjs';
import { $ as $$BlogCard } from '../../chunks/BlogCard_C56F3LHD.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://www.edgeviewfinance.com.au");
const $$AuthorBio = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AuthorBio;
  const {
    name = "Dan Peters",
    title = "Finance Specialist",
    bio = "Dan Peters is the founder and director of Edgeview Finance, bringing over 20 years of experience in banking and broking to Queensland businesses. After beginning his career as a business banker with one of Australia's Big 4 banks, Dan saw firsthand how traditional lending often failed good businesses. This inspired him to establish Edgeview Finance, providing access to 40+ specialist lenders and transforming finance from a transactional necessity into a strategic advantage.\n\nDan has since worked with hundreds of Queensland businesses, particularly in the trades and commercial sectors, helping them unlock growth opportunities through smart equipment finance and strategic property investment. His unique combination of banking insider knowledge and broker independence ensures clients get approved faster while securing better terms.",
    image = "/assets/img/dan-peters-headshot-new.jpg",
    showCTA = true
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="author-bio bg-[#F8F9FA] border border-[#E5E7EB] p-8 my-8" data-astro-cid-nb5zzowm> <div class="flex flex-col md:flex-row gap-6 items-start" data-astro-cid-nb5zzowm> <!-- Author Photo --> <div class="flex-shrink-0 mx-auto md:mx-0" data-astro-cid-nb5zzowm> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": `${name} - ${title}`, "width": 100, "height": 100, "class": "author-photo w-20 h-20 object-cover", "data-astro-cid-nb5zzowm": true })} </div> <!-- Author Content --> <div class="author-content flex-1 text-center md:text-left" data-astro-cid-nb5zzowm> <div class="mb-4" data-astro-cid-nb5zzowm> <h3 class="author-name text-xl font-bold text-[#1C2C3B] mb-1" data-astro-cid-nb5zzowm> ${name} </h3> <p class="author-title text-base font-semibold text-[#f97316] mb-3" data-astro-cid-nb5zzowm> ${title} </p> <p class="text-xs font-medium text-[#6B7280] mb-3" data-astro-cid-nb5zzowm>
Australian Credit License 459287
</p> </div> <div class="author-bio-text text-sm leading-relaxed text-[#374151] mb-6" data-astro-cid-nb5zzowm> ${bio.split("\n\n").map((paragraph) => renderTemplate`<p class="mb-4 last:mb-0" data-astro-cid-nb5zzowm>${paragraph}</p>`)} </div> ${showCTA && renderTemplate`<div class="author-cta flex flex-col sm:flex-row gap-3 justify-center md:justify-start" data-astro-cid-nb5zzowm> <a href="/contact" class="btn-primary bg-[#f97316] text-white px-6 py-3 font-semibold text-sm hover:bg-[#ea580c] transition-colors duration-300 inline-block text-center" data-astro-cid-nb5zzowm>
Book Discovery Call
</a> <a href="/contact" class="btn-secondary bg-transparent text-[#f97316] px-6 py-3 font-semibold text-sm border-2 border-[#f97316] hover:bg-[#f97316] hover:text-white transition-all duration-300 inline-block text-center" data-astro-cid-nb5zzowm>
Get Started
</a> </div>`} </div> </div> </section> `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Blog/AuthorBio.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
async function getStaticPaths() {
  const blogEntries = await getCollection("blogs");
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { entry } = Astro2.props;
  if (!entry) {
    return Astro2.redirect("/404");
  }
  const { Content } = await entry.render();
  const allBlogs = await getCollection("blogs");
  const recentBlogs = allBlogs.filter((blog) => blog.slug !== entry.slug).sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()).slice(0, 3);
  const relatedBlogs = allBlogs.filter(
    (blog) => blog.slug !== entry.slug && blog.data.category === entry.data.category
  ).slice(0, 3);
  const pageTitle = entry.data.seoTitle || `${entry.data.title} | Edgeview Finance`;
  const pageDescription = entry.data.seoDescription || entry.data.shortDescription;
  const publishedDate = new Date(entry.data.date).toISOString();
  const modifiedDate = (/* @__PURE__ */ new Date()).toISOString();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": pageDescription, "canonicalURL": `https://edgeviewfinance.com.au/blog/${entry.slug}`, "data-astro-cid-4sn4zg3r": true }, { "default": async ($$result2) => renderTemplate(_a || (_a = __template(['  <script type="application/ld+json">', "<\/script>  ", '<article class="blog-article" data-astro-cid-4sn4zg3r> <!-- Hero Banner with Image --> ', ' <!-- Breadcrumb Navigation --> <nav class="breadcrumb bg-[#F8F9FA] py-3 px-8 border-b border-gray-200" data-astro-cid-4sn4zg3r> <div class="max-w-7xl mx-auto" data-astro-cid-4sn4zg3r> <ol class="flex items-center space-x-2 text-sm text-gray-600" data-astro-cid-4sn4zg3r> <li data-astro-cid-4sn4zg3r> <a href="/" class="text-[#f97316] hover:text-[#e8890e] transition-colors" data-astro-cid-4sn4zg3r>Home</a> </li> <li class="flex items-center" data-astro-cid-4sn4zg3r> <svg class="w-3 h-3 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-4sn4zg3r> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-4sn4zg3r></path> </svg> <a href="/blog" class="text-[#f97316] hover:text-[#e8890e] transition-colors" data-astro-cid-4sn4zg3r>Blog</a> </li> <li class="flex items-center" data-astro-cid-4sn4zg3r> <svg class="w-3 h-3 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-4sn4zg3r> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-astro-cid-4sn4zg3r></path> </svg> <span class="text-gray-900 font-medium truncate max-w-[200px] lg:max-w-none" data-astro-cid-4sn4zg3r>', '</span> </li> </ol> </div> </nav> <!-- Main Content Area with Sidebar --> <div class="bg-white" data-astro-cid-4sn4zg3r> <div class="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12" data-astro-cid-4sn4zg3r> <div class="lg:grid lg:grid-cols-3 lg:gap-12" data-astro-cid-4sn4zg3r> <!-- Article Content --> <main class="lg:col-span-2" data-astro-cid-4sn4zg3r> <!-- Article Meta --> <div class="article-meta flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200" data-astro-cid-4sn4zg3r> <div class="flex items-center gap-2" data-astro-cid-4sn4zg3r> <span class="inline-block bg-[#f97316] text-white px-3 py-1 text-xs font-semibold uppercase" data-astro-cid-4sn4zg3r> ', " </span> </div> ", ' <div class="flex items-center gap-2" data-astro-cid-4sn4zg3r> ', " <span data-astro-cid-4sn4zg3r>By ", '</span> </div> </div> <!-- Article Body --> <div class="prose prose-lg max-w-none prose-headings:text-[#1C2C3B] prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#f97316] prose-a:underline prose-a:hover:text-[#e8890e] prose-strong:text-[#1C2C3B] prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:marker:text-gray-600 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-2" data-astro-cid-4sn4zg3r> ', " </div> <!-- Tags --> ", ' </main> <!-- Sidebar --> <aside class="mt-12 lg:mt-0" data-astro-cid-4sn4zg3r> <!-- Most Recent Articles --> <div class="sticky top-24" data-astro-cid-4sn4zg3r> <h3 class="text-lg font-bold text-[#1C2C3B] mb-6 pb-2 border-b-2 border-[#f97316]" data-astro-cid-4sn4zg3r>\nMost recent articles\n</h3> <div class="space-y-6" data-astro-cid-4sn4zg3r> ', ' </div> <!-- Newsletter CTA --> <div class="mt-8 p-6 bg-gray-50 border border-gray-200" data-astro-cid-4sn4zg3r> <h3 class="font-bold text-lg mb-2 text-[#1C2C3B] text-center" data-astro-cid-4sn4zg3r>Get More Finance Insider Insights</h3> <p class="text-sm mb-4 text-gray-600 text-center" data-astro-cid-4sn4zg3r>Join hundreds of business owners getting weekly finance strategies delivered to their inbox</p> <form class="sidebar-newsletter-form space-y-3" data-astro-cid-4sn4zg3r> <input type="email" placeholder="Enter your email address" class="sidebar-newsletter-input w-full px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#f97316] transition-colors" required data-astro-cid-4sn4zg3r> <button type="submit" class="sidebar-newsletter-button w-full bg-white text-[#f97316] px-4 py-2 text-sm font-semibold border-2 border-[#f97316] hover:bg-[#f97316] hover:text-white transition-colors" data-astro-cid-4sn4zg3r>\nGet Finance Insider Insights\n</button> </form> <div class="mt-4 flex flex-col gap-1 text-xs text-gray-500 text-center" data-astro-cid-4sn4zg3r> <span data-astro-cid-4sn4zg3r>\u2713 No spam, ever</span> <span data-astro-cid-4sn4zg3r>\u2713 Unsubscribe anytime</span> <span data-astro-cid-4sn4zg3r>\u2713 Trades focused</span> </div> </div> </div> </aside> </div> </div> </div> <!-- Social Sharing --> <section class="social-sharing bg-[#F8F9FA] py-8 px-8 border-y border-gray-200" data-astro-cid-4sn4zg3r> <div class="max-w-4xl mx-auto" data-astro-cid-4sn4zg3r> <div class="flex flex-col md:flex-row items-center justify-between gap-6" data-astro-cid-4sn4zg3r> <div class="text-center md:text-left" data-astro-cid-4sn4zg3r> <h3 class="text-lg font-semibold text-[#1C2C3B] mb-2" data-astro-cid-4sn4zg3r>\nFound this helpful?\n</h3> <p class="text-gray-600" data-astro-cid-4sn4zg3r>\nShare this article with other trades business owners who could benefit.\n</p> </div> <div class="flex items-center gap-4" data-astro-cid-4sn4zg3r> <button', ' class="share-btn bg-[#0077B5] text-white px-6 py-3 hover:bg-[#005885] transition-colors duration-300 inline-flex items-center gap-2" aria-label="Share on LinkedIn" data-astro-cid-4sn4zg3r> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-4sn4zg3r> <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" data-astro-cid-4sn4zg3r></path> </svg>\nLinkedIn\n</button> <button', ' class="share-btn bg-[#1C2C3B] text-white px-6 py-3 hover:bg-[#0F1419] transition-colors duration-300 inline-flex items-center gap-2" aria-label="Share article" data-astro-cid-4sn4zg3r> <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-4sn4zg3r> <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" data-astro-cid-4sn4zg3r></path> </svg>\nShare\n</button> </div> </div> </div> </section> <!-- Author Bio --> ', " <!-- Newsletter Signup --> ", " <!-- Related Articles --> ", ' <!-- Back to Blog --> <section class="back-to-blog bg-[#F8F9FA] py-8 px-8" data-astro-cid-4sn4zg3r> <div class="max-w-4xl mx-auto text-center" data-astro-cid-4sn4zg3r> <a href="/blog" class="inline-flex items-center gap-2 bg-transparent text-[#f97316] px-8 py-3 font-semibold border-2 border-[#f97316] hover:bg-[#f97316] hover:text-white transition-all duration-300" data-astro-cid-4sn4zg3r> <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-astro-cid-4sn4zg3r> <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" data-astro-cid-4sn4zg3r></path> </svg>\nBack to All Articles\n</a> </div> </section> </article> '])), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": entry.data.title,
    "description": pageDescription,
    "image": `https://edgeviewfinance.com.au${entry.data.image}`,
    "author": {
      "@type": "Person",
      "name": entry.data.author?.name || "Dan Peters",
      "url": "https://edgeviewfinance.com.au/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Edgeview Finance",
      "logo": {
        "@type": "ImageObject",
        "url": "https://edgeviewfinance.com.au/assets/img/logo.png"
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://edgeviewfinance.com.au/blog/${entry.slug}`
    }
  })), maybeRenderHead(), entry.data.image && renderTemplate`<div class="hero-banner relative w-full h-[400px] lg:h-[500px] bg-gray-900 overflow-hidden" data-astro-cid-4sn4zg3r> ${renderComponent($$result2, "Image", $$Image, { "src": entry.data.image, "alt": entry.data.title, "width": 1920, "height": 500, "class": "w-full h-full object-cover opacity-40", "data-astro-cid-4sn4zg3r": true })} <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" data-astro-cid-4sn4zg3r></div> <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-12" data-astro-cid-4sn4zg3r> <div class="max-w-7xl mx-auto" data-astro-cid-4sn4zg3r> <div data-astro-cid-4sn4zg3r> <time class="text-sm text-white/90" data-astro-cid-4sn4zg3r> ${new Date(entry.data.date).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </time> <h1 class="text-3xl lg:text-5xl font-bold mt-2 mb-4 text-white" data-astro-cid-4sn4zg3r> ${entry.data.title} </h1> </div> </div> </div> </div>`, entry.data.title, entry.data.category, entry.data.readTime && renderTemplate`<div class="flex items-center gap-1" data-astro-cid-4sn4zg3r> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-4sn4zg3r> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-4sn4zg3r></path> </svg> <span data-astro-cid-4sn4zg3r>${entry.data.readTime}</span> </div>`, entry.data.author?.img && renderTemplate`${renderComponent($$result2, "Image", $$Image, { "src": entry.data.author.img, "alt": entry.data.author.name, "width": 24, "height": 24, "class": "w-6 h-6 rounded-full object-cover", "data-astro-cid-4sn4zg3r": true })}`, entry.data.author?.name || "Dan Peters", renderComponent($$result2, "Content", Content, { "data-astro-cid-4sn4zg3r": true }), entry.data.tags && entry.data.tags.length > 0 && renderTemplate`<div class="article-tags mt-8 pt-6 border-t border-gray-200" data-astro-cid-4sn4zg3r> <h3 class="text-sm font-semibold text-gray-900 mb-3" data-astro-cid-4sn4zg3r>Tags:</h3> <div class="flex flex-wrap gap-2" data-astro-cid-4sn4zg3r> ${entry.data.tags.map((tag) => renderTemplate`<span class="inline-block bg-gray-100 text-gray-700 px-3 py-1 text-sm border border-gray-300 hover:bg-gray-50 transition-colors" data-astro-cid-4sn4zg3r> ${tag} </span>`)} </div> </div>`, recentBlogs.map((blog, index) => renderTemplate`<article class="flex gap-4 group" data-astro-cid-4sn4zg3r> <div class="flex-shrink-0 text-2xl font-bold text-gray-300" data-astro-cid-4sn4zg3r> ${index + 1} </div> <div class="flex-1" data-astro-cid-4sn4zg3r> ${blog.data.image && renderTemplate`<a${addAttribute(`/blog/${blog.slug}`, "href")} class="block mb-3 overflow-hidden" data-astro-cid-4sn4zg3r> ${renderComponent($$result2, "Image", $$Image, { "src": blog.data.image, "alt": blog.data.title, "width": 300, "height": 180, "class": "w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300", "data-astro-cid-4sn4zg3r": true })} </a>`} <h4 class="font-semibold text-sm text-[#1C2C3B] mb-2 leading-tight" data-astro-cid-4sn4zg3r> <a${addAttribute(`/blog/${blog.slug}`, "href")} class="hover:text-[#f97316] transition-colors" data-astro-cid-4sn4zg3r> ${blog.data.title} </a> </h4> <p class="text-xs text-gray-600 line-clamp-2" data-astro-cid-4sn4zg3r> ${blog.data.shortDescription} </p> </div> </article>`), addAttribute(`window.open('https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://edgeviewfinance.com.au/blog/${entry.slug}`)}', '_blank', 'width=600,height=400')`, "onclick"), addAttribute(`navigator.share ? navigator.share({title: '${entry.data.title}', url: '${`https://edgeviewfinance.com.au/blog/${entry.slug}`}'}) : alert('Sharing not supported')`, "onclick"), renderComponent($$result2, "AuthorBio", $$AuthorBio, { "showCTA": true, "data-astro-cid-4sn4zg3r": true }), renderComponent($$result2, "NewsletterSignup", $$NewsletterSignup, { "title": "Get More Finance Insider Insights", "subtitle": "Join hundreds of business owners getting weekly finance strategies delivered to their inbox", "variant": "compact", "showBenefits": false, "data-astro-cid-4sn4zg3r": true }), relatedBlogs.length > 0 && renderTemplate`<section class="related-articles bg-white py-16 px-8" data-astro-cid-4sn4zg3r> <div class="max-w-6xl mx-auto" data-astro-cid-4sn4zg3r> <div class="mb-12 text-center" data-astro-cid-4sn4zg3r> <h2 class="text-2xl lg:text-3xl font-bold text-[#1C2C3B] mb-4" data-astro-cid-4sn4zg3r>
Related Articles
</h2> <p class="text-gray-600 text-lg" data-astro-cid-4sn4zg3r>
More insights to help grow your trades business.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-4sn4zg3r> ${relatedBlogs.map((blog) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "post": blog, "data-astro-cid-4sn4zg3r": true })}`)} </div> </div> </section>`) })}  ${renderScript($$result, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/blog/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/blog/[slug].astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
