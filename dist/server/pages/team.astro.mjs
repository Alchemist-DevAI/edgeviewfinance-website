/* empty css                                 */
import { b as createAstro, c as createComponent, m as maybeRenderHead, e as addAttribute, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_BL0ualZl.mjs';
import 'kleur/colors';
import { a as getEntry, $ as $$Layout } from '../chunks/Layout_B2kHwL0p.mjs';
import '../chunks/index_BS0v8091.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_C4tS8mBi.mjs';
import { $ as $$Button } from '../chunks/Button_BwHZM1FZ.mjs';
import { $ as $$Heading } from '../chunks/Heading_-HOAyfPE.mjs';
import { $ as $$BreadCumb } from '../chunks/BreadCumb_CKVOUZJi.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://www.edgeviewfinance.com.au");
const $$Team$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Team$1;
  const TeamData = await getEntry({ collection: "aboutPage", id: "team" });
  const { header, members, description, button, points } = TeamData?.data;
  const { hideHeader } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="section-team"> <div class="section-space-bottom"> <div class="container-default"> <div${addAttribute(`${!hideHeader && "grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.75fr_minmax(0,_1fr)] xl:gap-20 xxl:gap-[134px]"}`, "class")}> ${!hideHeader && renderTemplate`<div class="jos" data-jos_animation="fade-right"> <div> <div class="mb-5"> <h2 class="font-InstrumentSans text-display-md font-bold leading-[1.14] text-[#121212] lg:text-left"> ${header} </h2> </div> </div> <p class="mb-5">${description}</p> <ul class="flex flex-col gap-5 font-semibold"> ${points?.map((point) => renderTemplate`<li class="flex leading-none items-start"> ${renderComponent($$result, "Image", $$Image, { "src": "/assets/img/icons/badge.svg", "height": "20", "width": "20", "alt": "badgeIcon", "class": "w-5 mr-2" })} ${point} </li>`)} </ul> <div class="mt-8 lg:mt-[50px]"> <a${addAttribute(button?.link, "href")} class="btn is-lime is-large btn-animation group inline-block rounded-[3px]"> <span>${button?.text}</span> </a> </div> </div>`} <div class="jos" data-jos_animation="fade-left"> <div class="grid grid-cols-1 gap-x-6 gap-y-[30px] sm:grid-cols-2 md:grid-cols-3 mt-3"> ${members.slice(0, 6).map(({ name, post, image }) => renderTemplate`<div class="group flex flex-col items-center justify-center text-center"> <div class="mb-6 h-auto max-w-full overflow-hidden rounded-[50%]"> <img${addAttribute(image, "src")} alt="team-img-1" width="196" height="196" class="h-full w-full object-cover"> </div> <div> <div class="mb-[5px] block text-xl font-semibold leading-[1.4] text-ColorDark"> ${name} </div> <span>${post}</span> </div> </div>`)} </div> </div> </div> </div> </div> </section>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/About/Team.astro", void 0);

const $$OtherTeam = createComponent(async ($$result, $$props, $$slots) => {
  const OtherTeamData = await getEntry({ collection: "aboutPage", id: "team" });
  const {
    data: { members, header }
  } = OtherTeamData;
  return renderTemplate`${maybeRenderHead()}<section class="section-team mt-10"> <div class="section-space-bottom"> <div class="container-default"> ${renderComponent($$result, "Heading", $$Heading, { "MaxWidth": "max-w-[636px]", "heading": header })} <div class="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"> ${members.slice(6).map(({ name, post, socialLinks, image }) => renderTemplate`<div class="jos flex flex-col items-center justify-center rounded-[10px] bg-white p-5 text-center shadow-[0_4px_80px_0_rgba(0,0,0,0.08)]" data-jos_animation="flip-left"> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": "team-img-5", "width": "266", "height": "250", "class": "h-auto w-full rounded-[10px] lg:w-auto" })} <div class="mb-4 mt-6"> <div class="mb-1 text-xl font-semibold text-ColorBlack"> ${name} </div> <span class="block text-opacity-80">${post}</span> </div> <div class="flex flex-wrap gap-[10px] xl:gap-4"> ${socialLinks?.slice(0, 4)?.map(({ icon, link }) => renderTemplate`<a${addAttribute(link, "href")} target="_blank" rel="noopener noreferrer" class="flex h-[35px] w-[35px] items-center justify-center rounded-[50%] bg-ColorBlack bg-opacity-5 text-sm text-ColorBlack transition-all duration-300 hover:bg-ColorBlack hover:bg-opacity-100 hover:text-white" aria-label="twitter"> <i${addAttribute(`fa-brands ${icon}`, "class")}></i> </a>`)} </div> </div>`)} </div> <div class="flex justify-center mt-10"> ${renderComponent($$result, "Button", $$Button, { "link": "/contact", "text": "Want to join us?" })} </div> </div> </div> </section>`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/components/Team/OtherTeam.astro", void 0);

const $$Team = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Team" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="main-wrapper relative overflow-hidden"> ${renderComponent($$result2, "BreadCumb", $$BreadCumb, {}, { "default": ($$result3) => renderTemplate` <h1 class="breadcrumb-title">Our Team</h1> <ul class="breadcrumb-nav"> <li><a href="/">Home</a></li> <li>Our Team</li> </ul> ` })} ${renderComponent($$result2, "MainTeam", $$Team$1, { "hideHeader": true })} ${renderComponent($$result2, "OtherTeam", $$OtherTeam, {})} </main> ` })}`;
}, "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/team.astro", void 0);

const $$file = "/mnt/c/GitHub Repos/evfbs-v2-supabase/4-development-infrastructure/evfbs-agency11-pure/src/pages/team.astro";
const $$url = "/team";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Team,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
