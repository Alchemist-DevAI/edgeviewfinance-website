!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d92ccd1b-892f-476f-9937-506b4cf85de6",e._sentryDebugIdIdentifier="sentry-dbid-d92ccd1b-892f-476f-9937-506b4cf85de6");})();}catch(e){}};import '../chunks/sentry.server.config_DYIA7DXn.mjs';
/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as renderScript } from '../chunks/astro/server_DVFDqqUz.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BgM0s9zF.mjs';
export { renderers } from '../renderers.mjs';

const $$TestSentry = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sentry Test - Edgeview Finance" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-16"> <h1 class="text-3xl font-bold mb-8">Sentry Error Tracking Test</h1> <div class="space-y-4"> <p class="text-gray-600">Click the buttons below to test Sentry error tracking:</p> <div class="space-x-4"> <button id="error-button" class="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700">
Throw Test Error
</button> <button id="warning-button" class="bg-yellow-600 text-white px-6 py-3 rounded hover:bg-yellow-700">
Log Warning
</button> <button id="api-error-button" class="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700">
Test API Error
</button> </div> <div id="result" class="mt-4 p-4 rounded hidden"></div> </div> </div> ${renderScript($$result2, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/test-sentry.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/test-sentry.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/test-sentry.astro";
const $$url = "/test-sentry";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TestSentry,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
