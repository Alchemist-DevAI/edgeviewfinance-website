/* empty css                                 */
import { c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, d as renderScript, a as renderTemplate } from '../chunks/astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import '../chunks/index_BS0v8091.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_C4tS8mBi.mjs';
import { g as getCollection, a as getEntry, $ as $$Layout } from '../chunks/Layout_BxlbnLjU.mjs';
import { $ as $$BreadCumb } from '../chunks/BreadCumb_CKVOUZJi.mjs';
export { renderers } from '../renderers.mjs';

const $$Price = createComponent(async ($$result, $$props, $$slots) => {
  var PricingData = await getCollection("Pricing");
  PricingData = PricingData.filter((data) => data.slug.startsWith("plan-"));
  const IndexData = await getEntry({ collection: "Pricing", id: "index" });
  const {
    header,
    description,
    label,
    monthlyPrice,
    yearlyPrice,
    planDescription,
    points,
    button
  } = IndexData?.data;
  return renderTemplate`${maybeRenderHead()}<section class="section-pricing"> <div class="relative z-10"> <div class="py-12 lg:py-16"> <div class="container-default"> <div class="jos"> <div class="mx-auto max-w-[636px]"> <div class="mb-4"> <h2 class="text-center font-InstrumentSans text-3xl font-bold leading-[1.14] text-[#1212121] lg:text-4xl xl:text-[48px]"> ${header} </h2> </div> <p class="text-center"> ${description} </p> </div> </div> <div class="jos"> <div class="my-8 flex flex-row items-center justify-center gap-6"> <span class="font-bold">Per Month</span> <label for="toggle" class="flex cursor-pointer items-center"> <span class="relative h-[35px] w-[70px] rounded-[35px] bg-[#121212]"> <input id="toggle" type="checkbox" class="hidden"> <span class="toggle_dot absolute h-[35px] w-[35px] rounded-full bg-[#C1FF00] transition-all duration-300"></span> </span> </label> <span class="font-bold">Per Year</span> </div> <div class="mx-auto max-w-[1076px]"> <div class="flex flex-col items-center rounded-[10px] border border-ColorBlack bg-white p-8 md:flex-row md:divide-x md:px-8 md:py-0 lg:px-12"> <div class="w-full text-center md:w-1/2 md:py-10 md:pr-8 md:text-left lg:pr-16"> <div class="text-lg leading-[1.6] tracking-tighter"> ${label} </div> <div class="month price-month"> <span class="font-InstrumentSans text-[40px] font-bold leading-[1.4] text-[#121212] lg:text-[48px]">${monthlyPrice}</span>/Per Month
</div> <div class="annual hidden price-year"> <span class="font-InstrumentSans text-[40px] font-bold leading-[1.4] text-[#121212] lg:text-[48px]">${yearlyPrice}</span>/Per Year
</div> <p> ${planDescription} </p> </div> <div class="w-full md:w-1/2 md:py-10 md:pl-8 lg:pl-16 xl:pl-24"> <div class="mb-4 text-center font-semibold md:text-left">
That includes:
</div> <ul class="flex flex-col gap-3"> ${points?.map((point) => renderTemplate`<li class="font-semibold flex"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/icons/badge.svg", "height": "20", "width": "20", "alt": "badgeIcon", "class": "w-5 mr-5" })} ${point} </li>`)} </ul> <a${addAttribute(button?.link, "href")} class="btn mt-6 block rounded-[3px] border-none bg-[#C1FF00] py-3 text-ColorBlack hover:bg-[#a6ff00] xl:mt-8">${button?.text}</a> </div> </div> </div> </div> </div> </div> <div class="absolute top-28 -z-10 hidden xl:right-10 xl:inline-block xxl:right-[90px]"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/elements/home-8-dot-shape-4.svg", "alt": "home-8-dot-shape-4", "width": "209", "height": "297" })} </div> </div> </section> <div class="absolute -z-10 hidden xl:left-10 xl:inline-block xxl:left-[90px] xxl:top-[71%]"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/elements/home-8-dot-shape-5.svg", "alt": "home-8-dot-shape-5", "width": "97", "height": "226" })} </div> ${renderScript($$result, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Service/Price.astro?astro&type=script&index=0&lang.ts")}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Service/Price.astro", void 0);

const $$Pricing = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Pricing" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden"> ${renderComponent($$result2, "BreadCumb", $$BreadCumb, {}, { "default": ($$result3) => renderTemplate` <h1 class="breadcrumb-title">Pricing</h1> <ul class="breadcrumb-nav"> <li><a href="/">Home</a></li> <li>Pricing</li> </ul> ` })} ${renderComponent($$result2, "Price", $$Price, {})} </main> ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/pricing.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/pricing.astro";
const $$url = "/pricing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
