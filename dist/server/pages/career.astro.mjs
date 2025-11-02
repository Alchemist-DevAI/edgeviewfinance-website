/* empty css                                 */
import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import { a as getEntry, g as getCollection, $ as $$Layout } from '../chunks/Layout_BaAcztus.mjs';
import { $ as $$Button } from '../chunks/Button_BwHZM1FZ.mjs';
import { $ as $$BreadCumb } from '../chunks/BreadCumb_CKVOUZJi.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$Brand = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Brand;
  const BrandData = await getEntry({ collection: "IndexPage", id: "brand" });
  const { images } = BrandData?.data;
  const { marginBottom } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="jos"> <div${addAttribute(`${marginBottom ? "pb-[60px] md:pb-20 lg:pb-[100px]" : "py-[60px] md:py-20 lg:py-[100px]"}`, "class")}> <div class="container-default"> ${renderComponent($$result, "SwiperComponent", null, { "client:only": "react", "data": images, "client:component-hydration": "only", "client:component-path": "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/functional/Swiper", "client:component-export": "default" })} </div> </div> </div>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Index/Brand.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  var CareerData = await getCollection("career");
  CareerData = CareerData.filter(
    (CareerSingle) => CareerSingle.slug.startsWith("career-")
  );
  var Categories = [];
  CareerData?.map(({ data: { category } }) => Categories.push(category));
  const uniqueCategories = new Set(Categories);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Career" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden"> ${renderComponent($$result2, "BreadCumb", $$BreadCumb, {}, { "default": async ($$result3) => renderTemplate` <h1 class="breadcrumb-title">Careers</h1> <ul class="breadcrumb-nav"> <li><a href="/">Home</a></li> <li>Careers</li> </ul> ` })} <div class="section-careers"> ${renderComponent($$result2, "CarrerSection", null, { "client:only": "react", "CareerData": CareerData, "uniqueCategories": uniqueCategories, "client:component-hydration": "only", "client:component-path": "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/functional/CarrerSection", "client:component-export": "default" })} <div class="flex justify-center"> ${renderComponent($$result2, "Button", $$Button, { "text": "Can't find your role ? Contact Us", "css": "inline-block", "link": "/contact" })} </div> ${renderComponent($$result2, "Brand", $$Brand, {})} </div> </main> ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/career/index.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/career/index.astro";
const $$url = "/career";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
