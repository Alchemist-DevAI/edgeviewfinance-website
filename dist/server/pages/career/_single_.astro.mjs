/* empty css                                    */
import { b as createAstro, c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import { a as getEntry, $ as $$Layout, g as getCollection } from '../../chunks/Layout_BaAcztus.mjs';
import { slug } from 'github-slugger';
import { $ as $$BreadCumb } from '../../chunks/BreadCumb_CKVOUZJi.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
async function getStaticPaths() {
  const CarrerData = await getCollection("career");
  return CarrerData.map((careerSingle) => {
    return {
      params: { single: slug(careerSingle?.data?.position) },
      props: { careerSingle }
    };
  });
}
const $$single = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$single;
  const {
    data: { web3AccessKey }
  } = await getEntry({ collection: "site", id: "meta" });
  const { careerSingle } = Astro2.props;
  const { position, salaryRange, type, description, location } = careerSingle.data;
  const { Content } = await careerSingle.render();
  const ContactDetail = await getEntry({ collection: "contact", id: "index" });
  const { mail, phone, address } = ContactDetail?.data;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": position }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden"> ${renderComponent($$result2, "BreadCumb", $$BreadCumb, {}, { "default": async ($$result3) => renderTemplate` <h1 class="breadcrumb-title">${position}</h1> <ul class="breadcrumb-nav"> <li><a href="/">Home</a></li> <li><a href="/career">Career</a></li> <li>${position}</li> </ul> ` })} <section class="section-career-details"> <div class="section-space"> <div class="container-default"> <div class="grid items-start gap-10 lg:grid-cols-[1fr_minmax(0,_0.7fr)] xl:gap-[90px]"> <div> <div class="mb-[18px]"> <div class="max-w-[526px]"> <h2>Job Details:</h2> </div> </div> <div class="mb-[60px]"> <p> ${description} </p> <div class="my-5 flex flex-wrap gap-x-6 gap-y-3 text-ColorBlack md:my-[30px]"> <div class="flex gap-1"> <span><i class="fa-solid fa-clock"></i></span> ${type} </div> <div class="flex gap-1"> <span><i class="fa-sharp fa-solid fa-location-dot"></i></span> ${location} </div> <div class="flex gap-1"> <span><i class="fa-solid fa-money-bills-simple"></i></span> ${salaryRange} </div> </div> </div> <article class="grid gap-y-5"> ${renderComponent($$result2, "Content", Content, {})} </article> <ul class="mt-[30px] flex flex-col gap-10"> <li class="flex gap-5"> <span class="inline-flex h-[50px] w-[50px] items-center justify-center rounded-[50%] bg-ColorLime text-xl text-white"> <i class="fa fa-phone"></i> </span> <div class="flex flex-1 flex-col gap-y-[5]"> <span class="text-xl font-semibold text-ColorBlack">Call us</span> <a href="tel:+0881234567890" class="text-ColorBlack/80 hover:text-ColorLime">${phone}</a> </div> </li> <li class="flex gap-5"> <span class="inline-flex h-[50px] w-[50px] items-center justify-center rounded-[50%] bg-ColorLime text-xl text-white"> <i class="fa-regular fa-envelope"></i> </span> <div class="flex flex-1 flex-col gap-y-[5]"> <span class="text-xl font-semibold text-ColorBlack">Email us</span> <a href="mailto:example@gmail.com" class="text-ColorBlack/80 hover:text-ColorLime">${mail}</a> </div> </li> <li class="flex gap-5"> <span class="inline-flex h-[50px] w-[50px] items-center justify-center rounded-[50%] bg-ColorLime text-xl text-white"> <i class="fa fa-location-dot"></i> </span> <div class="flex flex-1 flex-col gap-y-[5]"> <span class="text-xl font-semibold text-ColorBlack">Office address</span> <address class="text-ColorBlack/80"> ${address} </address> </div> </li> </ul> </div> <div class="jos xm:p-10 rounded-[10px] border border-ColorBlack/50 bg-ColorOffWhite p-[30px]"> <div class="mb-5 text-xl font-semibold tracking-tight lg:text-2xl"></div> ${renderComponent($$result2, "ContactForm", null, { "client:only": "react", "header": "Apply for these position", "web3AccessKey": web3AccessKey, "client:component-hydration": "only", "client:component-path": "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/functional/ContactForm", "client:component-export": "default" })} </div> </div> </div> </div> </section> </main> ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/career/[single].astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/career/[single].astro";
const $$url = "/career/[single]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$single,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
