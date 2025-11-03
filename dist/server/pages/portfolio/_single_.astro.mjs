/* empty css                                    */
import { b as createAstro, c as createComponent, m as maybeRenderHead, r as renderComponent, J as Fragment, a as renderTemplate, e as addAttribute } from '../../chunks/astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import { g as getCollection, a as getEntry, $ as $$Layout } from '../../chunks/Layout_CFmvZ5j4.mjs';
import { slug } from 'github-slugger';
/* empty css                                       */
import '../../chunks/index_BS0v8091.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_C4tS8mBi.mjs';
import { $ as $$BreadCumb } from '../../chunks/BreadCumb_CKVOUZJi.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$3 = createAstro("https://www.edgeviewfinance.com.au");
const $$PortfolioSlider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PortfolioSlider;
  const { sliderText } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="overflow-hidden bg-[#1C2C3B] py-6 text-2xl font-semibold uppercase leading-[1.4] tracking-wide text-white" data-astro-cid-e6pidcnj> <div class="horizontal-slide-from-right-to-left flex gap-x-8 items-center" data-astro-cid-e6pidcnj> ${sliderText.map((text) => {
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-e6pidcnj": true }, { "default": ($$result2) => renderTemplate` <span class="inline-block min-w-[600px] font-['Instrument_Sans']" data-astro-cid-e6pidcnj>${text}</span> <div class="flex-shrink-0 w-8 h-8 bg-[#f97316] flex items-center justify-center" data-astro-cid-e6pidcnj> <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-e6pidcnj> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" data-astro-cid-e6pidcnj></path> </svg> </div> ` })}`;
  })} </div> </div> `;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Portfolio/PortfolioSlider.astro", void 0);

const $$Astro$2 = createAstro("https://www.edgeviewfinance.com.au");
const $$PortfolioCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PortfolioCard;
  const { image, title, type, category } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="jos" data-jos_delay="0"> <div class="group"> <div class="overflow-hidden rounded-[10px]"> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": "portfolio-img-1", "width": "617", "height": "450", "class": "h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105" })} </div> <div class="mt-6"> <div class="mb-5 flex flex-wrap justify-between gap-5 text-ColorBlack lg:flex-nowrap xl:mb-7"> <a${addAttribute(`/portfolio/${slug(title)}`, "href")} class="text-xl font-semibold leading-[1.33] -tracking-[0.5px] group-hover:text-ColorLime xl:text-2xl"> ${type} — ${title} </a> <a${addAttribute(`/portfolio/${slug(title)}`, "href")} class="hover:text-ColorLime"> ${category} </a> </div> <a${addAttribute(`/portfolio/${slug(title)}`, "href")} class="text-base font-bold capitalize leading-[1.5] group-hover:text-ColorLime">
View work
<span class="inline-block transition-all duration-150 group-hover:translate-x-2"> <i class="fa-solid fa-arrow-right"></i> </span> </a> </div> </div> </div>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/ui/PortfolioCard.astro", void 0);

const $$Astro$1 = createAstro("https://www.edgeviewfinance.com.au");
const $$RelatedPortfolio = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RelatedPortfolio;
  const { Relatedportfolios, relatedProjectsText } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="related-portfolio-section"> <div class="section-space"> <div class="container-default"> <div class="mx-auto max-w-[1076px]"> <div class="jos flex flex-wrap items-center justify-between gap-8"> <div class="mb-5"> <h2>Related Project:</h2> </div> </div> <p class="jos max-w-[856px]"> ${relatedProjectsText} </p> <div class="grid gap-8 sm:grid-cols-2"> ${Relatedportfolios[0] && renderTemplate`${renderComponent($$result, "PortfolioCard", $$PortfolioCard, { "image": Relatedportfolios[0]?.data.image, "title": Relatedportfolios[0]?.data.title, "type": Relatedportfolios[0]?.data.type, "category": Relatedportfolios[0]?.data.category })}`} ${Relatedportfolios[1] && renderTemplate`${renderComponent($$result, "PortfolioCard", $$PortfolioCard, { "image": Relatedportfolios[1]?.data.image, "title": Relatedportfolios[1]?.data.title, "type": Relatedportfolios[1]?.data.type, "category": Relatedportfolios[1]?.data.category })}`} </div> </div> </div> </div> </section>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Portfolio/RelatedPortfolio.astro", void 0);

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
async function getStaticPaths() {
  var portfolio = await getCollection("portfolio");
  portfolio = portfolio.filter(
    (portfolioSingle) => portfolioSingle.slug.startsWith("portfolio-")
  );
  return portfolio.map((portfolioData) => {
    return {
      params: { single: slug(portfolioData?.data?.title) },
      props: { portfolioData }
    };
  });
}
const $$single = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$single;
  var portfolio = await getCollection("portfolio");
  portfolio = portfolio.filter(
    (portfolioSingle) => portfolioSingle.slug.startsWith("portfolio-")
  );
  const { portfolioData } = Astro2.props;
  const { title, image, category, client, duration, websiteLink } = portfolioData?.data;
  const { Content } = await portfolioData?.render();
  const {
    data: { sliderText, relatedProjectsText }
  } = await getEntry({ collection: "portfolio", id: "index" });
  const Relatedportfolio = portfolio.filter(
    (portfolioFilter) => portfolioFilter.slug !== "index" && portfolioFilter.data.category === portfolioData.data.category
  ).slice(0, 2);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden"> ${renderComponent($$result2, "BreadCumb", $$BreadCumb, {}, { "default": async ($$result3) => renderTemplate` <h1 class="breadcrumb-title">Applications</h1> <ul class="breadcrumb-nav"> <li><a href="/">Home</a></li> <li><a href="/portfolio">Portfolio</a></li> <li>${title}</li> </ul> ` })} <section class="section-portfolio"> <div class="section-space"> <div class="container-default"> <div class="mx-auto max-w-[1076px]"> ${renderComponent($$result2, "Image", $$Image, { "src": image, "alt": "portfolio-main-img", "width": "1076", "height": "600", "class": "h-auto w-full rounded-[10px]" })} <ul class="mb-[60px] mt-[30px] flex flex-wrap justify-between gap-8"> <li> <span class="mb-[5px] block text-xl font-bold leading-[1.4] text-ColorBlack">Client:</span> <span class="text-ColorBlack/80">${client}</span> </li> <li> <span class="mb-[5px] block text-xl font-bold leading-[1.4] text-ColorBlack">Category:</span> <span class="text-ColorBlack/80">${category}</span> </li> <li> <span class="mb-[5px] block text-xl font-bold leading-[1.4] text-ColorBlack">Duration:</span> <span class="text-ColorBlack/80">${duration}</span> </li> <li> <span class="mb-[5px] block text-xl font-bold leading-[1.4]">Website Link:</span> <span class="text-ColorBlack/80">${websiteLink}</span> </li> </ul> <div class="rich-text"> ${renderComponent($$result2, "Content", Content, {})} </div> </div> </div> </div> </section> ${renderComponent($$result2, "PortfolioSlider", $$PortfolioSlider, { "sliderText": sliderText })} ${renderComponent($$result2, "RelatedPortfolio", $$RelatedPortfolio, { "Relatedportfolios": Relatedportfolio, "relatedProjectsText": relatedProjectsText })} </main> ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/portfolio/[single].astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/portfolio/[single].astro";
const $$url = "/portfolio/[single]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$single,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
