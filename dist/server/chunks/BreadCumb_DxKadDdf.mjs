!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="11e49ce4-0043-42c0-88cb-10d87dcf430a",e._sentryDebugIdIdentifier="sentry-dbid-11e49ce4-0043-42c0-88cb-10d87dcf430a");})();}catch(e){}};import { c as createComponent, m as maybeRenderHead, as as renderSlot, r as renderComponent, a as renderTemplate } from './astro/server_Djx-43IL.mjs';
import 'kleur/colors';
import './index_LODGTukX.mjs';
import { $ as $$Image } from './_astro_assets_gzE14wQt.mjs';

const $$BreadCumb = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="section-breadcrumb"> <div class="breadcrumb-wrapper"> <div class="container-default"> <div class="breadcrumb-block"> ${renderSlot($$result, $$slots["default"])} </div> </div> <div class="absolute left-0 md1:top-0 bottom-0 -z-[1]"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/elements/breadcrumb-shape-1.svg", "alt": "hero-shape-1", "width": "291", "height": "380" })} </div> <div class="absolute bottom-0 right-0 -z-[1]"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/elements/breadcrumb-shape-2.svg", "alt": "hero-shape-2", "width": "291", "height": "380" })} </div> </div> </section>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/BreadCumb.astro", void 0);

export { $$BreadCumb as $ };
