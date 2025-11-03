import { c as createComponent, m as maybeRenderHead, K as renderSlot, r as renderComponent, a as renderTemplate } from './astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import './index_BS0v8091.mjs';
import { $ as $$Image } from './_astro_assets_C4tS8mBi.mjs';

const $$BreadCumb = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="section-breadcrumb"> <div class="breadcrumb-wrapper"> <div class="container-default"> <div class="breadcrumb-block"> ${renderSlot($$result, $$slots["default"])} </div> </div> <div class="absolute left-0 md1:top-0 bottom-0 -z-[1]"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/elements/breadcrumb-shape-1.svg", "alt": "hero-shape-1", "width": "291", "height": "380" })} </div> <div class="absolute bottom-0 right-0 -z-[1]"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/elements/breadcrumb-shape-2.svg", "alt": "hero-shape-2", "width": "291", "height": "380" })} </div> </div> </section>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/BreadCumb.astro", void 0);

export { $$BreadCumb as $ };
