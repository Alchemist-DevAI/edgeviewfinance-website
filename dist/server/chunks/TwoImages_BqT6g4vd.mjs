!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7b5f3938-ada8-41c3-9995-8cf880c8d924",e._sentryDebugIdIdentifier="sentry-dbid-7b5f3938-ada8-41c3-9995-8cf880c8d924");})();}catch(e){}};import { c as createComponent, m as maybeRenderHead, r as renderComponent, as as renderSlot, a as renderTemplate, b as createAstro } from './astro/server_Djx-43IL.mjs';
import 'kleur/colors';
import './index_LODGTukX.mjs';
import { $ as $$Image } from './_astro_assets_gzE14wQt.mjs';

const $$ServiceBadge = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mb-4 flex gap-x-3 last:mb-0 items-start"> <span class="text-xl text-ColorLime"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/icons/badge.svg", "height": "20", "width": "20", "alt": "badgeIcon", "class": "w-20 sm:w-7" })} </span> <div class="leading-tight">${renderSlot($$result, $$slots["default"])}</div> </div>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/utils/ServiceBadge.astro", void 0);

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$TwoImages = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TwoImages;
  const { img1, img2 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-5"> ${renderComponent($$result, "Image", $$Image, { "src": img1, "alt": "service-inner-1-img", "width": "532", "height": "355", "class": "w-full h-auto rounded-[10px]" })} ${renderComponent($$result, "Image", $$Image, { "src": img2, "alt": "service-inner-2-img", "width": "532", "height": "355", "class": "w-full h-auto rounded-[10px]" })} </div>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/utils/TwoImages.astro", void 0);

export { $$ServiceBadge as $, $$TwoImages as a };
