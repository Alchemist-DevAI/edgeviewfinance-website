!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="696520cf-9bf8-4d29-aff4-97a7594f6ed6",e._sentryDebugIdIdentifier="sentry-dbid-696520cf-9bf8-4d29-aff4-97a7594f6ed6");})();}catch(e){}};import '../chunks/sentry.server.config_DYIA7DXn.mjs';
/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DVFDqqUz.mjs';
import 'kleur/colors';
import { g as getCollection, $ as $$Layout } from '../chunks/Layout_BgM0s9zF.mjs';
import { $ as $$BreadCumb } from '../chunks/BreadCumb_zYjHALgJ.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  var portfolio = await getCollection("portfolio");
  portfolio = portfolio.filter(
    (portfolioSingle) => portfolioSingle.slug.startsWith("portfolio-")
  );
  var Categories = [];
  portfolio?.map(({ data: { category } }) => Categories.push(category));
  const uniqueCategories = new Set(Categories);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Portfolio" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden"> ${renderComponent($$result2, "BreadCumb", $$BreadCumb, {}, { "default": async ($$result3) => renderTemplate` <h1 class="breadcrumb-title">Portfolio</h1> <ul class="breadcrumb-nav"> <li><a href="/">Home</a></li> <li>Portfolio</li> </ul> ` })} ${renderComponent($$result2, "PortfolioSection", null, { "client:only": "react", "portfolio": portfolio, "uniqueCategories": uniqueCategories, "client:component-hydration": "only", "client:component-path": "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/functional/PortfolioSection", "client:component-export": "default" })} </main> ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/portfolio/index.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/portfolio/index.astro";
const $$url = "/portfolio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
