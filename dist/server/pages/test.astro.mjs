/* empty css                                 */
import { b as createAstro, c as createComponent, O as renderHead, a as renderTemplate } from '../chunks/astro/server_BL0ualZl.mjs';
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
