!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e554ed5d-ad5a-43b9-9b94-812cbfc5a1ad",e._sentryDebugIdIdentifier="sentry-dbid-e554ed5d-ad5a-43b9-9b94-812cbfc5a1ad");})();}catch(e){}};import '../chunks/sentry.server.config_vT0q66wt.mjs';
/* empty css                                 */
import { b as createAstro, c as createComponent, at as renderHead, a as renderTemplate } from '../chunks/astro/server_Djx-43IL.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$Test = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Test;
  const title = "Test Page";
  return renderTemplate`<html> <head><title>${title}</title>${renderHead()}</head> <body> <h1>Test Page</h1> <p>This is a simple test page to verify Astro is working.</p> <div> <h2>Checkbox Test</h2> <input type="checkbox" id="test1"> <label for="test1">Test Checkbox 1</label> <br> <input type="checkbox" id="test2"> <label for="test2">Test Checkbox 2</label> </div> </body></html>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/test.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Test,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
