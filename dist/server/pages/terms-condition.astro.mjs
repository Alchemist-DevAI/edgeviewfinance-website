!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ba04b94c-791b-478f-9241-ceb73ce436ef",e._sentryDebugIdIdentifier="sentry-dbid-ba04b94c-791b-478f-9241-ceb73ce436ef");})();}catch(e){}};import '../chunks/sentry.server.config_vT0q66wt.mjs';
/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Djx-43IL.mjs';
import 'kleur/colors';
import { a as getEntryBySlug, $ as $$Layout } from '../chunks/Layout_z-9nn0E4.mjs';
import { $ as $$BreadCumb } from '../chunks/BreadCumb_DxKadDdf.mjs';
export { renderers } from '../renderers.mjs';

const $$TermsCondition = createComponent(async ($$result, $$props, $$slots) => {
  const TermsConditionBody = await getEntryBySlug("termsCondition", "index");
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
