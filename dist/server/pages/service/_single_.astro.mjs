!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"f02949dfd07fd5f7d10fa5111d990ccb97d3c979"};}catch(e){}}();;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c498e270-a719-4475-bc99-aff65e6f1c0f",e._sentryDebugIdIdentifier="sentry-dbid-c498e270-a719-4475-bc99-aff65e6f1c0f");})();}catch(e){}};import '../../chunks/sentry.server.config_DYIA7DXn.mjs';
/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DVFDqqUz.mjs';
import 'kleur/colors';
import { $ as $$Layout, g as getCollection } from '../../chunks/Layout_BgM0s9zF.mjs';
import { slug } from 'github-slugger';
import { $ as $$FaqSection } from '../../chunks/FaqSection_CAmSVNIy.mjs';
import { $ as $$BreadCumb } from '../../chunks/BreadCumb_zYjHALgJ.mjs';
import '../../chunks/index_Cuyuqa_n.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_BLqOht8q.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
async function getStaticPaths() {
  var Services = await getCollection("services");
  Services = Services.filter((Service) => Service.slug.startsWith("service-"));
  return Services.map((service) => {
    return {
      params: { single: slug(service?.data?.title) },
      props: { service }
    };
  });
}
const $$single = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$single;
  const { service } = Astro2.props;
  if (!service) {
    return Astro2.redirect("/404");
  }
  const { title, image } = service.data;
  const { Content } = await service.render();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden"> ${renderComponent($$result2, "BreadCumb", $$BreadCumb, {}, { "default": async ($$result3) => renderTemplate` <h1 class="breadcrumb-title">Service Details</h1> <ul class="breadcrumb-nav"> <li><a href="/">Home</a></li> <li><a href="/services">Services</a></li> <li>${title}</li> </ul> ` })} <section class="section-service-details"> <div class="py-12 lg:py-16"> <div class="container-default"> <div class="mx-auto max-w-[1080px]"> ${renderComponent($$result2, "Image", $$Image, { "src": image, "alt": "service-main-img", "height": 1e3, "width": 1e3, "class": "mb-6 h-auto w-full rounded-[10px]" })} <div class="rich-text"> ${renderComponent($$result2, "Content", Content, {})} </div> </div> </div> </div> </section> ${renderComponent($$result2, "FaqSection", $$FaqSection, {})} </main> ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/service/[single].astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/service/[single].astro";
const $$url = "/service/[single]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$single,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
