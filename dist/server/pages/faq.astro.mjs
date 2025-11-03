/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import { $ as $$FaqSection } from '../chunks/FaqSection_DTmX6LKa.mjs';
import { $ as $$BreadCumb } from '../chunks/BreadCumb_CKVOUZJi.mjs';
import { $ as $$Layout } from '../chunks/Layout_B2kHwL0p.mjs';
export { renderers } from '../renderers.mjs';

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "FAQ's" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden"> ${renderComponent($$result2, "BreadCumb", $$BreadCumb, {}, { "default": ($$result3) => renderTemplate` <h1 class="breadcrumb-title">FAQs</h1> <ul class="breadcrumb-nav"> <li><a href="/">Home</a></li> <li>FAQ</li> </ul> ` })} ${renderComponent($$result2, "FaqSection", $$FaqSection, {})} </main> ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/faq.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/faq.astro";
const $$url = "/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faq,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
