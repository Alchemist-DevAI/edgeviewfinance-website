!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"584b4cb146101603c97c3a9f561e6b23da616306"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ced04b3a-ab30-48cf-989d-0adb2706b0a8",e._sentryDebugIdIdentifier="sentry-dbid-ced04b3a-ab30-48cf-989d-0adb2706b0a8");})();}catch(e){}};import '../chunks/sentry.server.config_vT0q66wt.mjs';
/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Djx-43IL.mjs';
import 'kleur/colors';
import { a as getEntryBySlug, $ as $$Layout, b as $$Logo } from '../chunks/Layout_z-9nn0E4.mjs';
export { renderers } from '../renderers.mjs';

const $$ComingSoon = createComponent(async ($$result, $$props, $$slots) => {
  const ComingSoonData = await getEntryBySlug("comingSoon", "index");
  const { title, form, description } = ComingSoonData.data;
  const {
    data: { web3AccessKey }
  } = await getEntryBySlug("site", "meta");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Coming Soon" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-wrapper relative z-[1] bg-ColorOffWhite"> <main class="main-wrapper relative overflow-hidden"> <section class="section-signin"> <div class="section-space"> <div class="container-default"> <div class="mx-auto max-w-[856px]"> <div class="flex flex-col items-center justify-center text-center"> ${renderComponent($$result2, "Logo", $$Logo, { "link": "/", "css": "mb-[60px] lg:mb-20 xl:mb-[100px]" })} <div class="jos mb-10 grid grid-cols-2 gap-10 text-center text-[62px] font-bold leading-none text-ColorLime sm:flex sm:flex-row sm:gap-20 md:gap-x-[100px] lg:mb-[60px]"> <div class="relative flex flex-col gap-y-[5px] after:absolute after:left-[calc(100%+_30px)] after:top-0 after:content-none last:after:content-none sm:after:content-['_:'] md:after:left-[calc(100%+_40px)]"> <div class="days"></div> <span class="text-xl font-medium capitalize">Days</span> </div> <div class="relative flex flex-col gap-y-[5px] after:absolute after:left-[calc(100%+_30px)] after:top-0 after:content-none last:after:content-none sm:after:content-['_:'] md:after:left-[calc(100%+_40px)]"> <div class="hours"></div> <span class="text-xl font-medium capitalize">Hours</span> </div> <div class="relative flex flex-col gap-y-[5px] after:absolute after:left-[calc(100%+_30px)] after:top-0 after:content-none last:after:content-none sm:after:content-['_:'] md:after:left-[calc(100%+_40px)]"> <div class="minutes"></div> <span class="text-xl font-medium capitalize">Minutes</span> </div> <div class="relative flex flex-col gap-y-[5px] after:absolute after:left-[calc(100%+_30px)] after:top-0 after:content-none last:after:content-none sm:after:content-['_:'] md:after:left-[calc(100%+_40px)]"> <div class="seconds"></div> <span class="text-xl font-medium capitalize">Seconds</span> </div> </div> <div> <div> <h2 class="mb-10"> ${title} </h2> </div> </div> <div class="jos"> ${renderComponent($$result2, "ComingSoonForm", null, { "client:only": "react", "formData": form, "web3AccessKey": web3AccessKey, "client:component-hydration": "only", "client:component-path": "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/functional/ComingSoonForm", "client:component-export": "default" })} <p class="mt-3"> ${description} </p> </div> </div> </div> </div> </div> </section> </main> </div> ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/coming-soon.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/coming-soon.astro";
const $$url = "/coming-soon";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ComingSoon,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
