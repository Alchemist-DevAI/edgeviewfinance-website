import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate, r as renderComponent, J as Fragment, u as unescapeHTML } from './astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                            */

const $$Astro$3 = createAstro("https://www.edgeviewfinance.com.au");
const $$StatBox = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$StatBox;
  const { number, label, source, change, className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`stat-box ${className}`, "class")} data-astro-cid-ky4l4anh> <div class="stat-number" data-astro-cid-ky4l4anh>${number}</div> <div class="stat-label" data-astro-cid-ky4l4anh>${label}</div> <div class="stat-source" data-astro-cid-ky4l4anh>${source}</div> ${change && renderTemplate`<div class="stat-change" data-astro-cid-ky4l4anh>${change}</div>`} </div> `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/location-pages/StatBox.astro", void 0);

const $$Astro$2 = createAstro("https://www.edgeviewfinance.com.au");
const $$HighlightBox = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$HighlightBox;
  const { number, title, items, className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`highlight-box ${className}`, "class")} data-astro-cid-6f76z6b3> <div class="highlight-number" data-astro-cid-6f76z6b3>${number}</div> <div class="highlight-title" data-astro-cid-6f76z6b3>${title}</div> <ul class="highlight-list" data-astro-cid-6f76z6b3> ${items.map((item) => renderTemplate`<li data-astro-cid-6f76z6b3>${item}</li>`)} </ul> </div> `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/location-pages/HighlightBox.astro", void 0);

const $$Astro$1 = createAstro("https://www.edgeviewfinance.com.au");
const $$StatCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StatCard;
  const { icon, number, unit, label, className = "" } = Astro2.props;
  const icons = {
    BuildingFactory: '<path d="M10 18v-6l2 -1l2 1v6"></path><path d="M3 14h18"></path><path d="M3 21h18"></path><path d="M3 14v-5a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5"></path><path d="M10 11v-2a2 2 0 1 1 4 0v2"></path>',
    Users: '<path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>',
    BuildingStore: '<path d="M3 21l18 0"></path><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"></path><path d="M5 21l0 -10.15"></path><path d="M19 21l0 -10.15"></path><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"></path>'
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`stat-card ${className}`, "class")} data-astro-cid-henfi53m> <div class="stat-card-icon" data-astro-cid-henfi53m> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-henfi53m> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(icons[icon])}` })} </svg> </div> <div class="stat-card-number" data-astro-cid-henfi53m>${number}</div> <div class="stat-card-unit" data-astro-cid-henfi53m>${unit}</div> <div class="stat-card-label" data-astro-cid-henfi53m>${label}</div> </div> `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/location-pages/StatCard.astro", void 0);

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$ServiceCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ServiceCard;
  const { icon, title, descriptions, link, linkText = "Learn More \u2192", className = "" } = Astro2.props;
  const icons = {
    Forklift: '<path d="M5 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path><path d="M14 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path><path d="M7 17l5 0"></path><path d="M3 17v-6h13v6"></path><path d="M5 11v-4h4"></path><path d="M9 11v-6h4l3 6"></path><path d="M22 15h-3v-10"></path><path d="M16 13l3 0"></path>',
    CashBanknote: '<path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path><path d="M3 6m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path><path d="M18 12l.01 0"></path><path d="M6 12l.01 0"></path>',
    Building: '<path d="M3 21l18 0"></path><path d="M9 8l1 0"></path><path d="M9 12l1 0"></path><path d="M9 16l1 0"></path><path d="M14 8l1 0"></path><path d="M14 12l1 0"></path><path d="M14 16l1 0"></path><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"></path>'
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`service-card ${className}`, "class")} data-astro-cid-bq46e3bf> <div class="service-card-icon" data-astro-cid-bq46e3bf> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-bq46e3bf> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(icons[icon])}` })} </svg> </div> <h3 class="service-card-title" data-astro-cid-bq46e3bf>${title}</h3> ${descriptions.map((desc) => renderTemplate`<p class="service-card-description" data-astro-cid-bq46e3bf>${desc}</p>`)} <a${addAttribute(link, "href")} class="service-card-link" data-astro-cid-bq46e3bf>${linkText}</a> </div> `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/location-pages/ServiceCard.astro", void 0);

export { $$StatBox as $, $$HighlightBox as a, $$StatCard as b, $$ServiceCard as c };
