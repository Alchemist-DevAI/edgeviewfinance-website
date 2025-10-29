!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="98f74f4e-f197-4f2e-87a2-9b0de71ab98a",e._sentryDebugIdIdentifier="sentry-dbid-98f74f4e-f197-4f2e-87a2-9b0de71ab98a");})();}catch(e){}};import '../chunks/sentry.server.config_DYIA7DXn.mjs';
/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DVFDqqUz.mjs';
import 'kleur/colors';
import { a as getEntry, $ as $$Layout } from '../chunks/Layout_BgM0s9zF.mjs';
import { $ as $$BreadCumb } from '../chunks/BreadCumb_zYjHALgJ.mjs';
export { renderers } from '../renderers.mjs';

const $$TermsCondition = createComponent(async ($$result, $$props, $$slots) => {
  const TermsConditionBody = await getEntry({ collection: "termsCondition", id: "index" });
  const { Content } = await TermsConditionBody.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Terms & Condition" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden"> ${renderComponent($$result2, "BreadCumb", $$BreadCumb, {}, { "default": async ($$result3) => renderTemplate` <h1 class="breadcrumb-title">Terms And Condition</h1> <ul class="breadcrumb-nav"> <li><a href="/">Home</a></li> <li>Terms And Condition</li> </ul> ` })} <div style="margin: 20px;"> ${renderComponent($$result2, "Content", Content, {})} </div> </main> ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/terms-condition.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/terms-condition.astro";
const $$url = "/terms-condition";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TermsCondition,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
