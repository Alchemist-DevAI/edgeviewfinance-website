!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="046abaf9-fe3c-4abf-9ed6-f3d26d731842",e._sentryDebugIdIdentifier="sentry-dbid-046abaf9-fe3c-4abf-9ed6-f3d26d731842");})();}catch(e){}};import '../chunks/sentry.server.config_DYIA7DXn.mjs';
/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DVFDqqUz.mjs';
import 'kleur/colors';
import { $ as $$FaqSection } from '../chunks/FaqSection_CAmSVNIy.mjs';
import { $ as $$BreadCumb } from '../chunks/BreadCumb_zYjHALgJ.mjs';
import { $ as $$Layout } from '../chunks/Layout_BgM0s9zF.mjs';
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
